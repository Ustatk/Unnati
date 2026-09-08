import json
import os
from typing import List, Dict, Any, Optional

from adapters.normalizer import normalize_scheme
from adapters.csv_adapter import load_csv_schemes
from adapters.apisetu_adapter import get_apisetu_schemes

_ALL_SCHEMES_CACHE: List[Dict[str, Any]] = []
_SCHEMES_BY_ID_CACHE: Dict[str, Dict[str, Any]] = {}


def load_all_schemes(force_reload: bool = False) -> List[Dict[str, Any]]:
    """
    Aggregates schemes across all data sources:
    1. Kaggle CSV dataset (updated_data.csv)
    2. Curated local JSON (schemes.json)
    3. Future Government API Setu
    """
    global _ALL_SCHEMES_CACHE, _SCHEMES_BY_ID_CACHE

    if _ALL_SCHEMES_CACHE and not force_reload:
        return _ALL_SCHEMES_CACHE

    all_schemes: List[Dict[str, Any]] = []
    seen_ids = set()

    # 1. Load curated schemes.json
    local_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "schemes.json")
    if os.path.exists(local_path):
        try:
            with open(local_path, "r", encoding="utf-8") as file:
                local_schemes = json.load(file)
                for item in local_schemes:
                    norm = normalize_scheme(
                        scheme_id=item.get("id", ""),
                        name=item.get("name", ""),
                        slug=item.get("id", "").lower(),
                        description=item.get("description", ""),
                        benefits=item.get("benefits", []),
                        eligibility=item.get("eligibility", {}),
                        application=item.get("application", []),
                        documents=item.get("documents", []),
                        level=item.get("level", "Central"),
                        category=item.get("category", ""),
                        tags=item.get("tags", []),
                        source=item.get("source", "Curated Schemes"),
                        source_url=item.get("source_url", "")
                    )
                    if norm["id"] not in seen_ids:
                        all_schemes.append(norm)
                        seen_ids.add(norm["id"])
        except Exception as e:
            print("Could not load local schemes.json:", e)

    # 2. Load Kaggle CSV dataset
    csv_schemes = load_csv_schemes(force_reload=force_reload)
    for scheme in csv_schemes:
        s_id = scheme["id"]
        if s_id not in seen_ids:
            all_schemes.append(scheme)
            seen_ids.add(s_id)

    # 3. Load API Setu (if configured)
    apisetu_schemes = get_apisetu_schemes()
    for scheme in apisetu_schemes:
        s_id = scheme["id"]
        if s_id not in seen_ids:
            all_schemes.append(scheme)
            seen_ids.add(s_id)

    _ALL_SCHEMES_CACHE = all_schemes
    _SCHEMES_BY_ID_CACHE = {
        s["id"]: s for s in all_schemes
    }
    # Also index by slug
    for s in all_schemes:
        if s.get("slug"):
            _SCHEMES_BY_ID_CACHE[s["slug"]] = s

    print(f"Total aggregated schemes loaded: {len(all_schemes)}")
    return _ALL_SCHEMES_CACHE


def get_scheme_by_id(scheme_id_or_slug: str) -> Optional[Dict[str, Any]]:
    """
    Look up a scheme by ID or slug.
    """
    if not _SCHEMES_BY_ID_CACHE:
        load_all_schemes()
    return _SCHEMES_BY_ID_CACHE.get(scheme_id_or_slug)


def reload_all_schemes() -> List[Dict[str, Any]]:
    """
    Force reloads all schemes across all sources and clears internal lookup caches.
    """
    global _ALL_SCHEMES_CACHE, _SCHEMES_BY_ID_CACHE
    _ALL_SCHEMES_CACHE = []
    _SCHEMES_BY_ID_CACHE = {}
    return load_all_schemes(force_reload=True)