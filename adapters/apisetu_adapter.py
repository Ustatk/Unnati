import os
from typing import List, Dict, Any
from adapters.normalizer import normalize_scheme

# API Setu configuration (from environment variables)
API_SETU_ENABLED = os.getenv("API_SETU_ENABLED", "false").lower() == "true"
API_SETU_MOCK = os.getenv("API_SETU_MOCK", "false").lower() == "true"
API_SETU_CLIENT_ID = os.getenv("API_SETU_CLIENT_ID", "")
API_SETU_API_KEY = os.getenv("API_SETU_API_KEY", "")
API_SETU_BASE_URL = os.getenv("API_SETU_BASE_URL", "https://apisetu.gov.in/api/v1")


def get_mock_apisetu_schemes() -> List[Dict[str, Any]]:
    """
    Returns simulated Government API Setu scheme payload for testing
    future API Setu interoperability before production credentials arrive.
    """
    mock_items = [
        {
            "id": "APISETU_SCHEME_001",
            "title": "PM Kisan Samman Nidhi (API Setu Gateway)",
            "slug": "pm-kisan-apisetu",
            "summary": "Income support of ₹6,000 per year in three equal installments to all land-holding farmer families across India via Direct Benefit Transfer.",
            "benefits": ["₹6,000 per year paid in three equal 4-monthly installments of ₹2,000 directly into Aadhaar-linked bank accounts."],
            "eligibility_criteria": {
                "occupation": ["farmer"],
                "income_max": 250000,
                "text": "Small and marginal landholder farmer families with cultivable landholding up to 2 hectares, residing in India."
            },
            "workflow_steps": [
                "Step 1: Visit PM-KISAN portal (pmkisan.gov.in) or Farmer Service Center (CSC).",
                "Step 2: Enter Aadhaar Number and authenticate via OTP or biometric.",
                "Step 3: Upload land record (Khata/Khasra) and Aadhaar-seeded bank passbook details.",
                "Step 4: State Nodal Officer verifies land ownership.",
                "Step 5: Installment disbursed directly via DBT PFMS gateway."
            ],
            "required_documents": [
                "Aadhaar Card",
                "Land Ownership Record (Khasra/Khatauni)",
                "Aadhaar-seeded Bank Account Passbook",
                "Citizenship / Domicile Certificate"
            ],
            "governance_level": "Central",
            "domain": "Agriculture & Rural Development",
            "tags": ["Agriculture", "Farmer", "Financial Assistance", "Direct Benefit Transfer"],
            "portal_url": "https://pmkisan.gov.in"
        }
    ]
    return [
        normalize_scheme(
            scheme_id=item["id"],
            name=item["title"],
            slug=item["slug"],
            description=item["summary"],
            benefits=item["benefits"],
            eligibility=item["eligibility_criteria"],
            application=item["workflow_steps"],
            documents=item["required_documents"],
            level=item["governance_level"],
            category=item["domain"],
            tags=item["tags"],
            source="API Setu (Govt of India)",
            source_url=item["portal_url"]
        )
        for item in mock_items
    ]


def get_apisetu_schemes() -> List[Dict[str, Any]]:
    """
    Adapter for Government API Setu scheme endpoints.
    When API_SETU_ENABLED is True and credentials are provided, queries the API Setu gateway.
    When API_SETU_MOCK is True, loads verified mock API Setu schemes.
    Otherwise, returns empty list while awaiting government clearance.
    """
    if API_SETU_MOCK:
        return get_mock_apisetu_schemes()

    if not API_SETU_ENABLED or not API_SETU_API_KEY:
        # Currently disabled waiting for government access approval
        return []

    try:
        import requests
        headers = {
            "X-API-KEY": API_SETU_API_KEY,
            "X-CLIENT-ID": API_SETU_CLIENT_ID,
            "Accept": "application/json"
        }
        response = requests.get(f"{API_SETU_BASE_URL}/schemes", headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            normalized = []
            for item in data.get("data", []):
                norm = normalize_scheme(
                    scheme_id=item.get("id", ""),
                    name=item.get("title", ""),
                    slug=item.get("slug", ""),
                    description=item.get("summary", ""),
                    benefits=item.get("benefits", []),
                    eligibility=item.get("eligibility_criteria", {}),
                    application=item.get("workflow_steps", []),
                    documents=item.get("required_documents", []),
                    level=item.get("governance_level", "Central"),
                    category=item.get("domain", ""),
                    tags=item.get("tags", []),
                    source="API Setu (Govt of India)",
                    source_url=item.get("portal_url", "https://apisetu.gov.in/")
                )
                normalized.append(norm)
            return normalized
        else:
            print(f"API Setu request returned status {response.status_code}")
            return []
    except Exception as e:
        print(f"API Setu integration error: {e}")
        return []
