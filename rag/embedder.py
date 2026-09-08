import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

EMBEDDING_MODEL = "gemini-embedding-2"
EMBEDDING_DIMENSION = 768


def create_embeddings(texts):
    """
    Create one embedding per text.
    """

    contents = [
        types.Content(
            parts=[
                types.Part.from_text(text=text)
            ]
        )
        for text in texts
    ]

    response = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=contents,
        config=types.EmbedContentConfig(
            output_dimensionality=EMBEDDING_DIMENSION
        )
    )

    return [
        embedding.values
        for embedding in response.embeddings
    ]


def create_query_embedding(query):
    """
    Create an embedding for a user's search query.
    """

    query_text = f"task: search result | query: {query}"

    response = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=query_text,
        config=types.EmbedContentConfig(
            output_dimensionality=EMBEDDING_DIMENSION
        )
    )

    return response.embeddings[0].values


def scheme_to_text(row):
    """
    Convert one CSV row into the searchable document
    used by semantic RAG.
    """

    return f"""
title: {row.get('scheme_name', '')}

text:
Scheme details:
{row.get('details', '')}

Benefits:
{row.get('benefits', '')}

Eligibility:
{row.get('eligibility', '')}

Application:
{row.get('application', '')}

Documents:
{row.get('documents', '')}

Category:
{row.get('schemeCategory', '')}

Level:
{row.get('level', '')}

Tags:
{row.get('tags', '')}
""".strip()