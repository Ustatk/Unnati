import os
import json
import re
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv
from google import genai
from google.genai import types

from rag.retriever import search_schemes
from recommendation import get_recommendations
from adapters.source_manager import get_scheme_by_id

load_dotenv()

GEMINI_MODEL = "gemini-3.6-flash"


CITY_TO_STATE = {
    "mumbai": "Maharashtra",
    "pune": "Maharashtra",
    "nagpur": "Maharashtra",
    "nashik": "Maharashtra",
    "bengaluru": "Karnataka",
    "bangalore": "Karnataka",
    "mysuru": "Karnataka",
    "hyderabad": "Telangana",
    "chennai": "Tamil Nadu",
    "coimbatore": "Tamil Nadu",
    "kolkata": "West Bengal",
    "ahmedabad": "Gujarat",
    "surat": "Gujarat",
    "vadodara": "Gujarat",
    "jaipur": "Rajasthan",
    "jodhpur": "Rajasthan",
    "lucknow": "Uttar Pradesh",
    "kanpur": "Uttar Pradesh",
    "varanasi": "Uttar Pradesh",
    "noida": "Uttar Pradesh",
    "patna": "Bihar",
    "bhopal": "Madhya Pradesh",
    "indore": "Madhya Pradesh",
    "chandigarh": "Chandigarh",
    "delhi": "Delhi",
    "new delhi": "Delhi"
}


class ChatbotService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        self.client = None
        if api_key:
            try:
                self.client = genai.Client(api_key=api_key)
            except Exception as e:
                print(f"Failed to initialize Gemini Client: {e}")

    def extract_profile_from_text(self, message: str, existing_profile: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Extracts demographic, educational, and financial attributes from natural language.
        Merges with any already-provided profile fields without overwriting explicit values.
        """
        profile = dict(existing_profile or {})
        msg_lower = message.lower()

        # 1. Gender
        if not profile.get("gender"):
            if re.search(r"\b(?:female|girl|woman|daughter|mother|widow|sister)\b", msg_lower):
                profile["gender"] = "female"
            elif re.search(r"\b(?:male|boy|man|son|father|brother)\b", msg_lower):
                profile["gender"] = "male"

        # 2. Age
        if not profile.get("age"):
            age_m = re.search(r"\b(?:i\s*am|aged?|age\s*(?:is|:)?)\s*(\d{1,2})\b", msg_lower)
            if not age_m:
                age_m = re.search(r"\b(\d{1,2})\s*(?:years?\s*old|yrs?\s*old|yo)\b", msg_lower)
            if age_m:
                try:
                    val = int(age_m.group(1))
                    if 1 <= val <= 100:
                        profile["age"] = val
                except ValueError:
                    pass

        # 3. Income
        if not profile.get("income"):
            # Lakhs: e.g. "1.5 lakh", "2 lakhs", "3 lac"
            lakh_m = re.search(r"(\d+(?:\.\d+)?)\s*(?:lakh|lac|lpa)s?", msg_lower)
            if lakh_m:
                try:
                    profile["income"] = float(lakh_m.group(1)) * 100000.0
                except ValueError:
                    pass
            else:
                # Monthly earnings: e.g. "earning 15,000 per month"
                monthly_m = re.search(r"(?:earning|salary|income|makes?)[^\d₹]{1,20}?(?:₹|rs\.?)?\s*([\d,]{4,7})\s*(?:per\s+month|\/month|monthly|a\s+month)", msg_lower)
                if monthly_m:
                    cleaned_num = monthly_m.group(1).replace(",", "")
                    try:
                        profile["income"] = float(cleaned_num) * 12.0
                    except ValueError:
                        pass
                else:
                    # Annual rupee number: e.g. "income 80000", "annual salary of 120000"
                    num_m = re.search(r"(?:annual\s+income|family\s+income|earning|salary|income)[^\d₹]{1,25}?(?:₹|rs\.?)?\s*([\d,]{5,8})", msg_lower)
                    if num_m:
                        cleaned_num = num_m.group(1).replace(",", "")
                        try:
                            profile["income"] = float(cleaned_num)
                        except ValueError:
                            pass

        # 4. Indian States & Cities
        if not profile.get("state"):
            from eligibility import INDIAN_STATES
            # Check direct states with word boundaries
            for state in INDIAN_STATES:
                pattern = r"\b" + re.escape(state.lower()) + r"\b"
                if re.search(pattern, msg_lower):
                    profile["state"] = state
                    break

            # If no state matched, check known metropolitan cities
            if not profile.get("state"):
                for city, state in CITY_TO_STATE.items():
                    pattern = r"\b" + re.escape(city) + r"\b"
                    if re.search(pattern, msg_lower):
                        profile["state"] = state
                        break

        # 5. Student Status & Education
        if not profile.get("student_status"):
            if re.search(r"\b(?:student|studying|scholarship|college|university|school|degree|graduation|undergraduate|ug|btech|be|bsc|bcom|ba|postgraduate|pg|mtech|msc|mba|phd)\b", msg_lower):
                profile["student_status"] = "student"
                if not profile.get("occupation"):
                    profile["occupation"] = "student"

        # 6. Occupation
        if not profile.get("occupation") or profile.get("occupation") == "student":
            if re.search(r"\b(?:farmers?|kisan|agriculture|cultivator)\b", msg_lower):
                profile["occupation"] = "farmer"
            elif re.search(r"\b(?:entrepreneur|business|startup|shopkeeper|self[- ]employed)\b", msg_lower):
                profile["occupation"] = "entrepreneur"
            elif re.search(r"\b(?:construction\s+workers?|labourers?|laborers?|daily\s+wage|artisan|weaver)\b", msg_lower):
                profile["occupation"] = "worker"
            elif re.search(r"\b(?:unemployed|looking\s+for\s+(?:a\s+)?job)\b", msg_lower):
                profile["occupation"] = "unemployed"

        # 7. Social Category (strict word boundary matching)
        if not profile.get("social_category"):
            if re.search(r"\b(?:scheduled\s+caste|sc)\b", msg_lower):
                profile["social_category"] = "SC"
            elif re.search(r"\b(?:scheduled\s+tribe|st)\b", msg_lower):
                profile["social_category"] = "ST"
            elif re.search(r"\b(?:other\s+backward\s+class(?:es)?|obc)\b", msg_lower):
                profile["social_category"] = "OBC"
            elif re.search(r"\b(?:economically\s+weaker\s+sections?|ews)\b", msg_lower):
                profile["social_category"] = "EWS"
            elif re.search(r"\b(?:general|open|unreserved)\b", msg_lower):
                profile["social_category"] = "General"

        # 8. Disability
        if profile.get("disability") is None:
            if re.search(r"\b(?:physically\s+handicapped|pwd|disabled|disability|divyang)\b", msg_lower):
                profile["disability"] = True

        # 9. Single Girl Child
        if profile.get("single_girl_child") is None:
            if re.search(r"\b(?:single\s+girl\s+child|only\s+daughter|only\s+child\s+girl)\b", msg_lower):
                profile["single_girl_child"] = True

        return profile

    def build_search_query(self, message: str, profile: Dict[str, Any]) -> str:
        """
        Synthesizes an enriched query for high-recall RAG retrieval.
        """
        parts = [message]
        if profile.get("occupation") and profile.get("occupation") != "student":
            parts.append(str(profile["occupation"]))
        if profile.get("student_status") == "student":
            parts.append("scholarship education financial assistance student")
        if profile.get("gender") == "female":
            parts.append("women girl child")
        if profile.get("social_category"):
            parts.append(str(profile["social_category"]))
        if profile.get("disability"):
            parts.append("disability divyang")
        return " ".join(parts)

    def generate_response(
        self,
        message: str,
        history: Optional[List[Dict[str, str]]] = None,
        profile: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Full Chatbot workflow:
        1. Accumulate and extract profile across conversation history + current message
        2. RAG retrieve candidates from 3,400+ government schemes
        3. Evaluate eligibility and rank recommendations
        4. Synthesize personalized application workflow & document checklist via Gemini
        """
        # 1. Multi-turn profile accumulation
        accumulated_profile = dict(profile or {})
        if history:
            for item in history:
                if isinstance(item, dict) and item.get("role") in ["user", "human"]:
                    accumulated_profile = self.extract_profile_from_text(item.get("content", ""), accumulated_profile)

        extracted_profile = self.extract_profile_from_text(message, accumulated_profile)
        search_query = self.build_search_query(message, extracted_profile)
        user_state = extracted_profile.get("state")

        # 2. Retrieve candidates via RAG
        candidates = search_schemes(
            query=search_query,
            top_k=15,
            state_filter=user_state
        )

        # 3. Filter & Rank via Recommendation Engine
        recommendations = get_recommendations(
            user=extracted_profile,
            schemes=candidates,
            include_ineligible=False
        )

        # Fallback if strict filter yields no result
        if not recommendations and candidates:
            recommendations = get_recommendations(
                user=extracted_profile,
                schemes=candidates,
                include_ineligible=True
            )

        top_schemes = recommendations[:4]

        # 4. Synthesize response using Gemini API
        reply = self._synthesize_with_gemini(
            user_message=message,
            profile=extracted_profile,
            top_schemes=top_schemes,
            history=history
        )

        return {
            "reply": reply,
            "recommended_schemes": top_schemes,
            "extracted_profile": extracted_profile,
            "total_found": len(recommendations)
        }

    def _synthesize_with_gemini(
        self,
        user_message: str,
        profile: Dict[str, Any],
        top_schemes: List[Dict[str, Any]],
        history: Optional[List[Dict[str, str]]] = None
    ) -> str:
        """
        Uses gemini-3.6-flash to produce an empathetic, expert citizen response
        with exact application steps and required documents.
        """
        if not self.client:
            return self._build_template_response(profile, top_schemes)

        # Construct context about schemes
        schemes_context = []
        for i, s in enumerate(top_schemes, 1):
            name = s.get("name", "Unknown Scheme")
            level = s.get("level", "Central")
            state = s.get("state", "National")
            benefits = ", ".join(s.get("benefits", [])) if isinstance(s.get("benefits"), list) else s.get("benefits", "")
            
            app_steps = s.get("application", [])
            if isinstance(app_steps, list):
                app_steps_str = "\n  ".join([f"- {step}" for step in app_steps])
            else:
                app_steps_str = str(app_steps)

            docs = ", ".join(s.get("documents", [])) if isinstance(s.get("documents"), list) else str(s.get("documents", ""))
            reasons = "; ".join(s.get("reasons", []))
            failed = "; ".join(s.get("failedCriteria", []))
            missing = ", ".join(s.get("missingInformation", []))
            status = s.get("status", "")

            schemes_context.append(f"""
Scheme #{i}: {name}
Level: {level} (State: {state})
Eligibility Status: {status.upper()}
Matched Eligibility Reasons: {reasons if reasons else "General criteria met"}
Failed Criteria (if any): {failed if failed else "None"}
Missing Information Needed: {missing if missing else "None"}
Benefits Offered: {benefits}
Application Workflow:
  {app_steps_str}
Required Documents:
  {docs}
Official Portal / Source: {s.get('source_url', 'https://www.myscheme.gov.in/')} ({s.get('source', 'Official Portal')})
""")

        schemes_str = "\n".join(schemes_context)

        system_instruction = """
You are UNNATI AI, an expert, encouraging, and empathetic government welfare scheme advisor for Indian citizens.
Your mission is to help citizens discover government benefits they qualify for, and provide them with clear, concrete, step-by-step application workflows and document checklists so they can successfully apply.

Formatting and Structure Guidelines:
1. **Overview & Eligibility Assessment**:
   - Welcome the citizen warmly.
   - Summarize what benefits they are eligible for based on their demographic profile (age, state, income, category, occupation).
2. **Top Recommended Schemes**:
   - Highlight the 1 to 3 best schemes with tangible benefits (e.g. monetary grant in ₹, subsidies, coaching, insurance).
3. **Step-by-Step Application Workflow**:
   - Give clear sequential steps: official website URL/portal, registration process, form submission, and tracking.
4. **Mandatory Document Checklist**:
   - Bulleted checklist of required identity proofs, income certificates, caste certificates, marksheet, or bank account details.
5. **Next Steps & Clarifications**:
   - If any profile fields are missing (e.g. annual income, caste category, exact college year), politely ask the citizen to confirm so we can unlock even more schemes.

Keep the response cleanly formatted in GitHub-flavored Markdown. Always format amounts with the ₹ symbol.
"""

        prompt = f"""
Citizen Inquiry: "{user_message}"

Inferred Citizen Profile:
{json.dumps(profile, indent=2)}

Retrieved Government Schemes from Database:
{schemes_str if schemes_str.strip() else "No matching government schemes found."}

Please synthesize a comprehensive, empowering, citizen-centric response with exact application workflows and document checklist.
"""

        try:
            response = self.client.models.generate_content(
                model=GEMINI_MODEL,
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    temperature=0.2
                )
            )
            if response and response.text:
                return response.text.strip()
        except Exception as e:
            print(f"Gemini API error during synthesis: {e}")

        # Fallback to template if Gemini API fails
        return self._build_template_response(profile, top_schemes)


    def _build_template_response(self, profile: Dict[str, Any], top_schemes: List[Dict[str, Any]]) -> str:
        """
        Fallback response generator if API is unavailable or offline.
        """
        if not top_schemes:
            return (
                "### No Directly Matching Schemes Found\n\n"
                "We couldn't locate an exact scheme matching your current query. "
                "Please provide more details (such as your state, age, occupation, or annual income) "
                "so we can find relevant opportunities for you."
            )

        primary = top_schemes[0]
        name = primary.get("name", "Government Scheme")
        benefits = primary.get("benefits", [])
        benefits_str = "\n".join([f"- {b}" for b in benefits]) if isinstance(benefits, list) else str(benefits)
        
        apps = primary.get("application", [])
        apps_str = "\n".join([f"{idx+1}. {step}" for idx, step in enumerate(apps)]) if isinstance(apps, list) else str(apps)

        docs = primary.get("documents", [])
        docs_str = "\n".join([f"- {d}" for d in docs]) if isinstance(docs, list) else str(docs)

        return f"""### Recommended Scheme: {name}

Based on your profile, you are eligible for **{name}**.

#### Key Benefits
{benefits_str or "- Financial / institutional support as per government guidelines."}

#### Step-by-Step Application Workflow
{apps_str or "1. Visit the official government portal.\n2. Complete the online registration.\n3. Submit required documentation."}

#### Required Documents Checklist
{docs_str or "- Aadhaar Card\n- Income Certificate\n- Residence Proof\n- Bank Account Details"}

#### Source & Official Portal
[{primary.get('source', 'Official Portal')}]({primary.get('source_url', 'https://www.myscheme.gov.in/')})
"""


# Global singleton instance
_chatbot_service = None

def get_chatbot_service() -> ChatbotService:
    global _chatbot_service
    if _chatbot_service is None:
        _chatbot_service = ChatbotService()
    return _chatbot_service
