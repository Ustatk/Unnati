import re
from typing import Any, Dict, List, Optional, Union

INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh"
]

STATE_ABBREVIATIONS = {
    "JKBOCWWB": "Jammu and Kashmir",
    "MPBOCWWB": "Madhya Pradesh",
    "KSCB": "Kerala",
    "APBW": "Andhra Pradesh",
    "TNBOCW": "Tamil Nadu",
    "WBPCB": "West Bengal",
    "CBOCWWB": "Chhattisgarh",
    "MSSDS": "Maharashtra"
}


def clean_text(val: Any) -> str:
    if val is None:
        return ""
    # Remove BOM and zero-width spaces
    text = str(val).replace("\ufeff", "").replace("\u200b", "").strip()
    return text


def parse_tags(val: Any) -> List[str]:
    """
    Parses comma-separated or list tags.
    """
    if not val:
        return []
    if isinstance(val, list):
        return [clean_text(item) for item in val if clean_text(item)]

    text = clean_text(val)
    if not text:
        return []

    raw_tags = re.split(r"[,;]+", text)
    tags = [t.strip().strip('"\'') for t in raw_tags if t.strip()]
    return tags


def parse_benefits(val: Any) -> List[str]:
    """
    Parses benefits text into clean bullet points/items without
    splitting inside currency numbers (e.g. ₹ 1,00,000) or decimal values.
    """
    if not val:
        return []
    if isinstance(val, list):
        return [clean_text(item) for item in val if clean_text(item)]

    text = clean_text(val)
    if not text:
        return []

    # If newlines exist, split by newlines
    if "\n" in text:
        lines = [line.strip("-•* \t") for line in text.split("\n")]
        filtered = [l for l in lines if l]
        if filtered:
            return filtered

    # Check for bullet symbols: •, *, -
    if any(b in text for b in ["•", "▪", "▫", "\u2022"]):
        parts = re.split(r"[•▪▫\u2022]+", text)
        filtered = [p.strip() for p in parts if p.strip()]
        if filtered:
            return filtered

    # Check for numbered points like "1.", "2." or "(1)", "(2)"
    if re.search(r"(?:^|\s)(?:\d+\.|\(\d+\))\s+", text):
        parts = re.split(r"(?:^|\s)(?:\d+\.|\(\d+\))\s+", text)
        filtered = [p.strip() for p in parts if p.strip()]
        if len(filtered) > 1:
            return filtered

    # Sentence splitting avoiding decimals and comma breaks
    sentences = re.split(r"(?<=[a-zA-Z0-9\)])\.\s+(?=[A-Z₹])", text)
    if len(sentences) > 1:
        return [s.strip() for s in sentences if s.strip()]

    return [text]


def parse_application_steps(val: Any) -> List[str]:
    """
    Parses application procedures into structured, sequential steps.
    """
    if not val:
        return []
    if isinstance(val, list):
        return [clean_text(s) for s in val if clean_text(s)]

    text = clean_text(val)
    if not text:
        return []

    # Check for "Step 1:", "Step 01:", "Step-1:", etc.
    if re.search(r"\bStep\s*[-–—]?\s*\d+[:\-\.]", text, re.IGNORECASE):
        steps = re.split(r"(?=\bStep\s*[-–—]?\s*\d+[:\-\.])", text, flags=re.IGNORECASE)
        cleaned = [s.strip() for s in steps if s.strip()]
        if cleaned:
            return cleaned

    # Check for sections
    section_split = re.split(r"(?=(?:Registration|Apply|Post-Registration|Online Application|Offline Application)[:\s])", text, flags=re.IGNORECASE)
    if len(section_split) > 1:
        cleaned = [s.strip() for s in section_split if s.strip()]
        return cleaned

    # Check for numbered steps: "1.", "2."
    numbered = re.split(r"(?=(?:^|\n|\s+)\d+\.\s+)", text)
    if len(numbered) > 1:
        cleaned = [s.strip() for s in numbered if s.strip()]
        if len(cleaned) > 1:
            return cleaned

    # Check for newlines
    if "\n" in text:
        lines = [line.strip("-•* \t") for line in text.split("\n")]
        cleaned = [l for l in lines if l]
        if cleaned:
            return cleaned

    # Split by period followed by space and capital letter
    sentences = re.split(r"(?<=\.)\s+(?=[A-Z])", text)
    if len(sentences) > 1:
        return [s.strip() for s in sentences if s.strip()]

    return [text]


def parse_documents(val: Any) -> List[str]:
    """
    Parses required document lists without fragmenting document names.
    """
    if not val:
        return []
    if isinstance(val, list):
        return [clean_text(item) for item in val if clean_text(item)]

    text = clean_text(val)
    if not text:
        return []

    # If newlines exist, split by newlines
    if "\n" in text:
        lines = [line.strip("-•* \t") for line in text.split("\n")]
        cleaned = [l for l in lines if l]
        if cleaned:
            return cleaned

    # Check for bullets
    if any(b in text for b in ["•", "▪", "▫", "\u2022"]):
        parts = re.split(r"[•▪▫\u2022]+", text)
        cleaned = [p.strip() for p in parts if p.strip()]
        if cleaned:
            return cleaned

    # Split on periods followed by space and capital letter
    parts = re.split(r"(?<=[a-zA-Z0-9\)])\.\s+(?=[A-Z])", text)
    if len(parts) > 1:
        return [p.strip().rstrip(".") for p in parts if p.strip()]

    return [text]


def detect_state(
    name: str = "",
    description: str = "",
    eligibility_text: str = "",
    level: str = "Central",
    explicit_state: Optional[str] = None
) -> Optional[str]:
    """
    Detects the state for a scheme.
    Central schemes are marked as 'National' unless explicitly state-bound.
    State schemes resolve to the specific Indian state.
    """
    if explicit_state and explicit_state.strip():
        return clean_text(explicit_state)

    clean_lvl = clean_text(level).lower()

    # Search for known board abbreviations first (e.g. JKBOCWWB, MPBOCWWB)
    combined_raw = f"{name} {description} {eligibility_text}"
    for abbr, st in STATE_ABBREVIATIONS.items():
        if abbr in combined_raw:
            return st

    combined_text = combined_raw.lower()

    # Search for state names using word boundaries
    for st in INDIAN_STATES:
        pattern = r"\b" + re.escape(st.lower()) + r"\b"
        if re.search(pattern, combined_text):
            return st

    if clean_lvl == "central":
        return "National"

    return None


def normalize_scheme(
    scheme_id: str = "",
    name: str = "",
    slug: str = "",
    description: str = "",
    benefits: Union[List[str], str] = "",
    eligibility: Union[Dict[str, Any], str] = "",
    application: Union[List[str], str] = "",
    documents: Union[List[str], str] = "",
    level: str = "",
    state: Optional[str] = None,
    category: str = "",
    tags: Union[List[str], str] = "",
    source: str = "myScheme",
    source_url: str = "",
    **extra_fields
) -> Dict[str, Any]:
    """
    Standardizes a government scheme into a unified representation
    compatible with RAG retrieval, eligibility engines, and chatbot workflows.
    """
    clean_id = clean_text(scheme_id or slug)
    clean_name = clean_text(name)
    clean_slug = clean_text(slug or scheme_id)
    clean_desc = clean_text(description)
    clean_level = clean_text(level) or "Central"
    clean_category = clean_text(category)

    # Format benefits
    formatted_benefits = parse_benefits(benefits)

    # Format application steps
    formatted_application = parse_application_steps(application)

    # Format documents
    formatted_docs = parse_documents(documents)

    # Format tags
    formatted_tags = parse_tags(tags)

    # Handle eligibility format
    eligibility_data: Dict[str, Any]
    if isinstance(eligibility, dict):
        eligibility_data = eligibility
    else:
        eligibility_data = {
            "text": clean_text(eligibility)
        }

    elig_text = eligibility_data.get("text", "") if isinstance(eligibility_data, dict) else str(eligibility_data)
    resolved_state = detect_state(
        name=clean_name,
        description=clean_desc,
        eligibility_text=elig_text,
        level=clean_level,
        explicit_state=state
    )

    return {
        "id": clean_id,
        "name": clean_name,
        "slug": clean_slug,
        "description": clean_desc,
        "benefits": formatted_benefits,
        "eligibility": eligibility_data,
        "application": formatted_application,
        "documents": formatted_docs,
        "level": clean_level,
        "state": resolved_state or ("National" if clean_level.lower() == "central" else None),
        "category": clean_category,
        "tags": formatted_tags,
        "source": clean_text(source),
        "source_url": clean_text(source_url)
    }