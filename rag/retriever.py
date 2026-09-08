import os
from typing import List, Dict, Any, Optional
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from adapters.source_manager import load_all_schemes


class SchemeRetriever:
    _instance = None

    def __init__(self):
        self.schemes: List[Dict[str, Any]] = []
        self.vectorizer: Optional[TfidfVectorizer] = None
        self.tfidf_matrix = None
        self._initialize_index()

    def _initialize_index(self):
        self.schemes = load_all_schemes()
        if not self.schemes:
            print("Warning: No schemes loaded for indexing.")
            return

        corpus = []
        for s in self.schemes:
            # Build rich searchable document representation
            name = s.get("name", "")
            desc = s.get("description", "")
            benefits = " ".join(s.get("benefits", [])) if isinstance(s.get("benefits"), list) else str(s.get("benefits", ""))
            category = s.get("category", "")
            tags = " ".join(s.get("tags", [])) if isinstance(s.get("tags"), list) else str(s.get("tags", ""))
            state = s.get("state") or ""
            level = s.get("level") or ""
            
            elig = s.get("eligibility", {})
            elig_text = elig.get("text", "") if isinstance(elig, dict) else str(elig)

            # Name repeated to give higher term weighting to scheme titles
            doc = f"{name} {name} {name} {category} {tags} {state} {level} {desc} {benefits} {elig_text}"
            corpus.append(doc.lower())

        self.vectorizer = TfidfVectorizer(
            max_features=20000,
            stop_words="english",
            ngram_range=(1, 2),
            sublinear_tf=True
        )
        self.tfidf_matrix = self.vectorizer.fit_transform(corpus)
        print(f"RAG Index built successfully with {len(self.schemes)} schemes.")

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = SchemeRetriever()
        return cls._instance

    def search(
        self,
        query: str,
        top_k: int = 5,
        state_filter: Optional[str] = None,
        category_filter: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        if not self.schemes or self.vectorizer is None or self.tfidf_matrix is None:
            self._initialize_index()
            if not self.schemes or self.vectorizer is None:
                return []

        clean_query = query.strip().lower()
        if not clean_query:
            return []

        query_vec = self.vectorizer.transform([clean_query])
        scores = cosine_similarity(query_vec, self.tfidf_matrix)[0]

        # Get top matching indices
        ranked_indices = np.argsort(scores)[::-1]

        results = []
        for idx in ranked_indices:
            score = float(scores[idx])
            if score <= 0.005:
                break

            scheme = self.schemes[idx]

            # Apply state filter if provided
            if state_filter and state_filter.lower() not in ["all", "any", "national"]:
                scheme_lvl = (scheme.get("level") or "").strip().lower()
                scheme_st = (scheme.get("state") or "").strip().lower()
                # If it is a state-specific scheme and does not match the user's state, skip
                if scheme_lvl == "state" and scheme_st and scheme_st != "national":
                    if state_filter.lower() != scheme_st:
                        continue

            # Apply category filter if provided
            if category_filter and category_filter.lower() not in ["all", "any"]:
                if category_filter.lower() not in scheme.get("category", "").lower():
                    continue

            results.append({
                "scheme": scheme,
                "retrieval_score": round(score, 4)
            })

            if len(results) >= top_k:
                break

        return results



def search_schemes(
    query: str,
    top_k: int = 5,
    state_filter: Optional[str] = None,
    category_filter: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    Search across all normalized schemes using TF-IDF RAG.
    """
    retriever = SchemeRetriever.get_instance()
    return retriever.search(
        query=query,
        top_k=top_k,
        state_filter=state_filter,
        category_filter=category_filter
    )


if __name__ == "__main__":
    query = "scholarship for girl student"
    results = search_schemes(query, top_k=3)
    print(f"Results for '{query}':")
    for r in results:
        print(f"[{r['retrieval_score']}] {r['scheme']['name']}")