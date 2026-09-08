from typing import List, Dict, Any
from eligibility import check_eligibility


def get_recommendations(
    user: Dict[str, Any],
    schemes: List[Dict[str, Any]],
    include_ineligible: bool = False
) -> List[Dict[str, Any]]:
    """
    Ranks schemes based on user eligibility, reason matches, and semantic relevance.
    """
    results = []

    for item in schemes:
        # Scheme could be wrapped with retrieval_score or raw
        if "scheme" in item and "retrieval_score" in item:
            scheme = item["scheme"]
            retrieval_score = item["retrieval_score"]
        else:
            scheme = item
            retrieval_score = item.get("retrieval_score", 0.0)

        result = check_eligibility(user, scheme)

        if result["status"] == "not_eligible" and not include_ineligible:
            continue

        # Calculate composite recommendation score
        base_score = 0
        if result["status"] == "eligible":
            base_score = 60
        elif result["status"] == "needs_information":
            base_score = 30
        else:
            base_score = 5

        reasons_score = len(result["reasons"]) * 10
        relevance_score = retrieval_score * 40
        
        # State-level direct match bonus
        state_bonus = 0
        user_state = (user.get("state") or "").strip().lower()
        scheme_state = (scheme.get("state") or "").strip().lower()
        if user_state and scheme_state and user_state == scheme_state:
            state_bonus = 10

        total_score = round(base_score + reasons_score + relevance_score + state_bonus, 2)

        results.append({
            "scheme_id": scheme.get("id", scheme.get("slug", "")),
            "name": scheme.get("name", ""),
            "slug": scheme.get("slug", ""),
            "description": scheme.get("description", ""),
            "benefits": scheme.get("benefits", []),
            "score": total_score,
            "status": result["status"],
            "eligible": result["eligible"],
            "reasons": result["reasons"],
            "failedCriteria": result["failedCriteria"],
            "missingInformation": result["missingInformation"],
            "application": scheme.get("application", []),
            "documents": scheme.get("documents", []),
            "level": scheme.get("level", ""),
            "state": scheme.get("state", "National"),
            "category": scheme.get("category", ""),
            "tags": scheme.get("tags", []),
            "source": scheme.get("source", ""),
            "source_url": scheme.get("source_url", "")
        })

    # Sort in descending order of score
    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results