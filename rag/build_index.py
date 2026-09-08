import json
import time

import numpy as np
import pandas as pd

from rag.embedder import create_embeddings, scheme_to_text


CSV_FILE = "updated_data.csv"

INDEX_FILE = "rag/scheme_embeddings.npz"
METADATA_FILE = "rag/scheme_metadata.json"

BATCH_SIZE = 8


def clean_value(value):
    """
    Convert NaN / missing CSV values into empty strings.
    """

    if pd.isna(value):
        return ""

    return str(value).strip()


def main():

    print("Loading CSV...")

    df = pd.read_csv(
        CSV_FILE,
        encoding="utf-8"
    )

    print(f"Loaded {len(df)} schemes.")

    # Clean missing values
    df = df.fillna("")

    texts = []
    metadata = []

    for index, row in df.iterrows():

        row_dict = {
            column: clean_value(row[column])
            for column in df.columns
        }

        text = scheme_to_text(row_dict)

        texts.append(text)

        metadata.append({
            "index": index,
            "scheme_name": row_dict.get("scheme_name", ""),
            "schemeCategory": row_dict.get("schemeCategory", ""),
            "level": row_dict.get("level", ""),
            "tags": row_dict.get("tags", ""),
            "raw_data": row_dict
        })

    all_embeddings = []

    total = len(texts)

    print("Creating embeddings...")
    print(f"Total schemes: {total}")

    for start in range(0, total, BATCH_SIZE):

        end = min(
            start + BATCH_SIZE,
            total
        )

        batch = texts[start:end]

        print(
            f"Embedding schemes "
            f"{start + 1}-{end} / {total}"
        )

        embeddings = create_embeddings(batch)

        all_embeddings.extend(embeddings)

        # Small pause to reduce rate-limit pressure
        time.sleep(0.5)

    embeddings_array = np.array(
        all_embeddings,
        dtype=np.float32
    )

    print(
        "Embedding matrix shape:",
        embeddings_array.shape
    )

    np.savez_compressed(
        INDEX_FILE,
        embeddings=embeddings_array
    )

    with open(
        METADATA_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            metadata,
            file,
            ensure_ascii=False,
            indent=2
        )

    print()
    print("===================================")
    print("RAG INDEX CREATED SUCCESSFULLY")
    print("===================================")
    print(f"Embeddings: {INDEX_FILE}")
    print(f"Metadata:   {METADATA_FILE}")


if __name__ == "__main__":
    main()