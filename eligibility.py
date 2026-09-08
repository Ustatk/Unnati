import re
from typing import Dict, Any, List, Optional

INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh"
]


def parse_numeric(val: str) -> float:
    cleaned = val.replace(",", "").replace("₹", "").replace("/-", "").strip()
    try:
        return float(cleaned)
    except ValueError:
        return 0.0


def parse_income_text(text: str) -> Optional[float]:
    """
    Extracts numerical income ceiling in INR from natural language text.
    Handles 'lakhs', 'per annum', and standard currency formats.
    """
    text_lower = text.lower()

    # Pattern for lakhs: e.g. "income up to 2.5 lakh", "less than 2 lakhs"
    lakh_match = re.search(r"(?:income|earning)[^\d₹]{1,30}?(?:up\s+to|less\s+than|below|not\s+exceeding|within|maximum\s+of)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lac)s?", text_lower)
    if lakh_match:
        try:
            return float(lakh_match.group(1)) * 100000.0
        except ValueError:
            pass

    # Pattern for exact rupee figure: e.g. "income should not exceed ₹ 2,00,000", "annual family income less than Rs. 150000"
    num_match = re.search(r"(?:annual\s+income|family\s+income|income)[^\d₹]{1,35}?(?:up\s+to|less\s+than|below|not\s+exceeding|within|maximum\s+of|exceed)?\s*(?:₹|rs\.?|inr)?\s*([\d,]{5,10})", text_lower)
    if num_match:
        val = parse_numeric(num_match.group(1))
        if val >= 10000:
            return val

    return None


def check_structured_rules(user: Dict[str, Any], rules: Dict[str, Any], reasons: List[str], failed: List[str], missing: List[str]):
    # Gender
    if "gender" in rules:
        allowed_genders = [g.lower() for g in rules["gender"]]
        user_gender = (user.get("gender") or "").lower()
        if not user_gender:
            missing.append("gender")
        elif user_gender in allowed_genders:
            reasons.append("Gender requirement satisfied")
        else:
            failed.append(f"Gender requirement not satisfied (Scheme allows: {', '.join(rules['gender'])})")

    # Age
    user_age = user.get("age")
    if user_age is None:
        if "age_min" in rules or "age_max" in rules:
            missing.append("age")
    else:
        if "age_min" in rules and user_age < rules["age_min"]:
            failed.append(f"Minimum age is {rules['age_min']} (User is {user_age})")
        elif "age_max" in rules and user_age > rules["age_max"]:
            failed.append(f"Maximum age is {rules['age_max']} (User is {user_age})")
        elif "age_min" in rules or "age_max" in rules:
            reasons.append(f"Age requirement satisfied ({user_age} years)")

    # Income
    if "income_max" in rules:
        user_income = user.get("income")
        if user_income is None:
            missing.append("income")
        elif user_income <= rules["income_max"]:
            reasons.append(f"Income requirement satisfied (₹{user_income:,.0f} <= ₹{rules['income_max']:,.0f})")
        else:
            failed.append(f"Income must be <= ₹{rules['income_max']:,.0f} (User income: ₹{user_income:,.0f})")

    # State / Geography
    if "states" in rules:
        user_state = user.get("state")
        allowed_states = [s.lower() for s in rules["states"]]
        if not user_state:
            missing.append("state")
        elif user_state.lower() in allowed_states:
            reasons.append(f"State residence requirement satisfied ({user_state})")
        else:
            failed.append(f"Requires residence in: {', '.join(rules['states'])}")

    # Occupation
    if "occupation" in rules:
        user_occ = (user.get("occupation") or "").lower()
        allowed_occs = [o.lower() for o in rules["occupation"]]
        if not user_occ:
            missing.append("occupation")
        elif any(user_occ == o or o in user_occ for o in allowed_occs):
            reasons.append(f"Occupation requirement satisfied ({user.get('occupation')})")
        else:
            failed.append(f"Occupation must be one of: {', '.join(rules['occupation'])}")

    # Student status
    if "student_status" in rules:
        user_student = (user.get("student_status") or "").lower()
        allowed_statuses = [s.lower() for s in rules["student_status"]]
        if not user_student:
            missing.append("student_status")
        elif any(user_student == s or s in user_student for s in allowed_statuses):
            reasons.append("Student status requirement satisfied")
        else:
            failed.append(f"Student requirement not satisfied (Scheme allows: {', '.join(rules['student_status'])})")

    # Social category
    if "social_category" in rules:
        user_cat = (user.get("social_category") or "").upper()
        allowed_cats = [c.upper() for c in rules["social_category"]]
        if not user_cat:
            missing.append("social_category")
        elif user_cat in allowed_cats:
            reasons.append(f"Social category requirement satisfied ({user_cat})")
        else:
            failed.append(f"Social category must be one of {', '.join(rules['social_category'])}")

    # Single girl child
    if "single_girl_child" in rules:
        user_sgc = user.get("single_girl_child")
        if user_sgc is None:
            missing.append("single_girl_child")
        elif user_sgc == rules["single_girl_child"]:
            reasons.append("Single girl child requirement satisfied")
        else:
            failed.append("Single girl child requirement not satisfied")

    # Disability
    if "disability" in rules:
        user_dis = user.get("disability")
        if user_dis is None:
            missing.append("disability")
        elif user_dis == rules["disability"]:
            reasons.append("Disability criterion satisfied")
        else:
            failed.append("Disability status not matching requirement")


def check_text_heuristics(
    user: Dict[str, Any],
    text: str,
    scheme: Dict[str, Any],
    reasons: List[str],
    failed: List[str],
    missing: List[str]
):
    text_lower = text.lower()
    scheme_level = (scheme.get("level") or "Central").strip().lower()
    scheme_state = scheme.get("state")

    # 1. State / Region check
    user_state = (user.get("state") or "").strip()

    if scheme_level == "state" and scheme_state and scheme_state.lower() != "national":
        if not user_state:
            missing.append("state")
        else:
            if user_state.lower() == scheme_state.lower():
                reasons.append(f"State requirement satisfied ({scheme_state})")
            else:
                failed.append(f"Scheme is restricted to residents of {scheme_state}")
    elif scheme_level == "central":
        # Check if text contains explicit regional restrictions (e.g. North-Eastern states only)
        if re.search(r"\bonly\s+(?:for\s+)?residents?\s+of\b", text_lower):
            explicit_states = [s for s in INDIAN_STATES if re.search(r"\b" + re.escape(s.lower()) + r"\b", text_lower)]
            if explicit_states:
                if not user_state:
                    missing.append("state")
                elif any(user_state.lower() == s.lower() for s in explicit_states):
                    reasons.append(f"Regional requirement satisfied ({user_state})")
                else:
                    failed.append(f"Scheme is restricted to: {', '.join(explicit_states)}")
        else:
            if user_state:
                reasons.append(f"Central scheme (Available nationwide to residents of {user_state})")

    # 2. Gender check
    user_gender = (user.get("gender") or "").lower()
    is_women_only = bool(re.search(r"\b(?:girls?\s+only|women\s+only|female\s+only|widow|maternity|pregnant\s+women|lactating\s+mothers?)\b", text_lower))
    is_girls_scheme = bool(re.search(r"\b(?:girl\s+child|adolescent\s+girls?|daughter)\b", text_lower)) and not bool(re.search(r"\b(?:boys?\s+and\s+girls?|male\s+and\s+female|all\s+children)\b", text_lower))

    if is_women_only or is_girls_scheme:
        if not user_gender:
            missing.append("gender")
        elif user_gender in ["female", "girl", "woman"]:
            reasons.append("Gender criterion satisfied (Targeted for female beneficiaries)")
        else:
            failed.append("Scheme is reserved for women / female applicants")
    elif re.search(r"\b(?:boys?\s+only|male\s+only)\b", text_lower):
        if not user_gender:
            missing.append("gender")
        elif user_gender in ["male", "boy", "man"]:
            reasons.append("Gender criterion satisfied (Targeted for male beneficiaries)")
        else:
            failed.append("Scheme is reserved for male applicants")

    # 3. Age check (Regex matching)
    user_age = user.get("age")
    age_range_match = re.search(r"\b(?:between|aged?)\s+(\d{1,2})\s+(?:and|to|-)\s+(\d{1,2})\s*years?\b", text_lower)
    min_age_match = re.search(r"\b(?:minimum\s+age(?:\s+of)?|at\s+least|above)\s+(\d{1,2})\s*years?\b", text_lower)
    max_age_match = re.search(r"\b(?:maximum\s+age(?:\s+of)?|up\s+to|not\s+exceeding|below)\s+(\d{1,2})\s*years?\b", text_lower)

    if age_range_match:
        min_age, max_age = int(age_range_match.group(1)), int(age_range_match.group(2))
        if user_age is None:
            missing.append("age")
        elif user_age < min_age or user_age > max_age:
            failed.append(f"Age must be between {min_age} and {max_age} (Applicant is {user_age})")
        else:
            reasons.append(f"Age requirement satisfied ({user_age} is within {min_age}-{max_age} years)")
    else:
        if min_age_match:
            min_age = int(min_age_match.group(1))
            if user_age is None:
                missing.append("age")
            elif user_age < min_age:
                failed.append(f"Minimum age required is {min_age} (Applicant is {user_age})")
            else:
                reasons.append(f"Age requirement satisfied (>= {min_age})")
        if max_age_match:
            max_age = int(max_age_match.group(1))
            if user_age is None:
                missing.append("age")
            elif user_age > max_age:
                failed.append(f"Maximum age allowed is {max_age} (Applicant is {user_age})")
            else:
                reasons.append(f"Age requirement satisfied (<= {max_age})")

    # 4. Income check
    user_income = user.get("income")
    parsed_limit = parse_income_text(text)
    if parsed_limit:
        if user_income is None:
            missing.append("income")
        elif user_income > parsed_limit:
            failed.append(f"Annual income exceeds ceiling of ₹{parsed_limit:,.0f} (Applicant income: ₹{user_income:,.0f})")
        else:
            reasons.append(f"Income requirement satisfied (₹{user_income:,.0f} <= ₹{parsed_limit:,.0f})")

    # 5. Social Category (SC / ST / OBC / EWS) with strict word boundaries
    user_cat = (user.get("social_category") or "").upper()
    is_sc_st_scheme = bool(re.search(r"\b(?:sc\s*/\s*st|scheduled\s+castes?(?:\s+and|\s*,|\s*/)?\s*scheduled\s+tribes?)\b", text_lower))
    is_st_only = bool(re.search(r"\b(?:scheduled\s+tribes?|st\s+community)\b", text_lower)) and not is_sc_st_scheme
    is_sc_only = bool(re.search(r"\b(?:scheduled\s+castes?|sc\s+community)\b", text_lower)) and not is_sc_st_scheme
    is_obc_scheme = bool(re.search(r"\b(?:other\s+backward\s+classes?|backward\s+class(?:es)?|obc)\b", text_lower))
    is_bpl_scheme = bool(re.search(r"\b(?:below\s+poverty\s+line|bpl|economically\s+weaker\s+sections?|ews)\b", text_lower))

    if is_sc_st_scheme:
        if not user_cat:
            missing.append("social_category")
        elif user_cat in ["SC", "ST"]:
            reasons.append("Target category satisfied (SC/ST beneficiary)")
        elif user_cat in ["GENERAL"]:
            failed.append("Scheme is reserved for SC/ST beneficiaries")
    elif is_st_only:
        if not user_cat:
            missing.append("social_category")
        elif user_cat == "ST":
            reasons.append("Target category satisfied (Scheduled Tribe)")
        elif user_cat in ["GENERAL", "OBC"]:
            failed.append("Scheme is reserved for Scheduled Tribe (ST) applicants")
    elif is_sc_only:
        if not user_cat:
            missing.append("social_category")
        elif user_cat == "SC":
            reasons.append("Target category satisfied (Scheduled Caste)")
        elif user_cat in ["GENERAL", "OBC"]:
            failed.append("Scheme is reserved for Scheduled Caste (SC) applicants")
    elif is_obc_scheme:
        if not user_cat:
            missing.append("social_category")
        elif user_cat == "OBC":
            reasons.append("Target category satisfied (OBC beneficiary)")

    # 6. Occupation / Sector matching
    user_occ = (user.get("occupation") or "").lower()
    if re.search(r"\b(?:farmers?|kisan|agriculture|cultivator)\b", text_lower):
        if user_occ == "farmer":
            reasons.append("Occupation criterion satisfied (Farmer / Agriculture)")
    if re.search(r"\b(?:construction\s+workers?|labourers?|unorganized\s+workers?)\b", text_lower):
        if user_occ in ["worker", "construction worker", "laborer", "labourer"]:
            reasons.append("Occupation criterion satisfied (Worker / Laborer)")

    # 7. Student status matching
    user_student = (user.get("student_status") or "").lower()
    if re.search(r"\b(?:students?|scholarships?|higher\s+education|pre-matric|post-matric|college|university)\b", text_lower):
        if user_student == "student" or user_occ == "student":
            reasons.append("Student status criterion satisfied")

    # 8. Disability matching
    user_dis = user.get("disability")
    if re.search(r"\b(?:persons?\s+with\s+disabilit(?:y|ies)|handicapped|divyang|disability)\b", text_lower):
        if user_dis is True:
            reasons.append("Disability criterion satisfied (Divyangjan)")
        elif user_dis is False and re.search(r"\b(?:only\s+for\s+(?:the\s+)?disabled|reserved\s+for\s+divyang)\b", text_lower):
            failed.append("Scheme is exclusively reserved for persons with disabilities (Divyangjan)")


def check_eligibility(user: Dict[str, Any], scheme: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluates whether a user qualifies for a given scheme.
    Supports both structured rule dictionaries and unstructured text criteria.
    Returns:
      status: 'eligible', 'needs_information', or 'not_eligible'
      eligible: boolean
      reasons: list of satisfied conditions
      failedCriteria: list of failed rules
      missingInformation: list of missing fields needed to confirm eligibility
    """
    raw_eligibility = scheme.get("eligibility", {})

    reasons: List[str] = []
    failed: List[str] = []
    missing: List[str] = []

    if isinstance(raw_eligibility, dict):
        # 1. Evaluate explicit structured rule keys if defined
        has_structured = any(k in raw_eligibility for k in [
            "gender", "age_min", "age_max", "income_max", "states",
            "occupation", "student_status", "social_category", "disability", "single_girl_child"
        ])
        if has_structured:
            check_structured_rules(user, raw_eligibility, reasons, failed, missing)

        # 2. Evaluate free-form natural language text
        text_content = raw_eligibility.get("text", "")
        if text_content:
            check_text_heuristics(user, text_content, scheme, reasons, failed, missing)
    elif isinstance(raw_eligibility, str) and raw_eligibility.strip():
        check_text_heuristics(user, raw_eligibility, scheme, reasons, failed, missing)

    # If scheme text was completely blank, fallback to scheme description
    if not reasons and not failed and not missing:
        desc = scheme.get("description", "")
        if desc:
            check_text_heuristics(user, desc, scheme, reasons, failed, missing)

    # Determine final eligibility status
    if failed:
        status = "not_eligible"
    elif missing:
        status = "needs_information"
    else:
        status = "eligible"

    return {
        "status": status,
        "eligible": status == "eligible",
        "reasons": list(dict.fromkeys(reasons)),
        "failedCriteria": list(dict.fromkeys(failed)),
        "missingInformation": list(set(missing))
    }