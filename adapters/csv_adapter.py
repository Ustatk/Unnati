import os
import csv
from typing import List, Dict, Any
from adapters.normalizer import normalize_scheme

CSV_FILE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "updated_data.csv")

_CACHED_SCHEMES: List[Dict[str, Any]] = []


def load_csv_schemes(filepath: str = CSV_FILE_PATH, force_reload: bool = False) -> List[Dict[str, Any]]:
    """
    Loads government schemes from the Kaggle dataset CSV,
    normalizing each row into the standard UNNATI schema.
    """
    global _CACHED_SCHEMES
    if _CACHED_SCHEMES and not force_reload:
        return _CACHED_SCHEMES

    if not os.path.exists(filepath):
        print(f"Warning: CSV file not found at {filepath}")
        return []

    schemes = []
    try:
        with open(filepath, mode="r", encoding="utf-8", errors="replace") as f:
            reader = csv.DictReader(f)
            for idx, row in enumerate(reader):
                slug = row.get("slug", "").strip() or f"scheme-{idx+1}"
                name = row.get("scheme_name", "").strip()
                if not name:
                    continue

                normalized = normalize_scheme(
                    scheme_id=slug,
                    name=name,
                    slug=slug,
                    description=row.get("details", ""),
                    benefits=row.get("benefits", ""),
                    eligibility=row.get("eligibility", ""),
                    application=row.get("application", ""),
                    documents=row.get("documents", ""),
                    level=row.get("level", "Central"),
                    category=row.get("schemeCategory", ""),
                    tags=row.get("tags", ""),
                    source="Kaggle / myScheme Dataset",
                    source_url=f"https://www.myscheme.gov.in/schemes/{slug}" if slug else "https://www.myscheme.gov.in/"
                )
                schemes.append(normalized)

        _CACHED_SCHEMES = schemes
        print(f"Successfully loaded and normalized {len(schemes)} schemes from CSV.")
    except Exception as e:
        print(f"Error loading CSV schemes: {e}")

    return _CACHED_SCHEMES
