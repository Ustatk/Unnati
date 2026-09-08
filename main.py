from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


from adapters.source_manager import load_all_schemes, get_scheme_by_id
from recommendation import get_recommendations
from eligibility import check_eligibility
from rag.retriever import search_schemes, SchemeRetriever
from chatbot import get_chatbot_service

app = FastAPI(
    title="UNNATI Backend",
    description="Intelligent Government Scheme Discovery, Eligibility Verification, and Citizen Chatbot API",
    version="1.0.0"
)

# Enable CORS for frontend website integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    print("Starting UNNATI Backend...")
    schemes = load_all_schemes()
    SchemeRetriever.get_instance()
    get_chatbot_service()
    print(f"UNNATI Backend initialized with {len(schemes)} schemes.")


# -------------------------------------------------------------
# Pydantic Schemas
# -------------------------------------------------------------
class UserProfile(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    state: Optional[str] = None
    income: Optional[float] = None

    occupation: Optional[str] = None
    education: Optional[str] = None
    marital_status: Optional[str] = None
    disability: Optional[bool] = None

    student_status: Optional[str] = None
    single_girl_child: Optional[bool] = None
    social_category: Optional[str] = None


class SearchRequest(BaseModel):
    query: str = Field(
        ...,
        description="Search keywords or scheme domain",
        json_schema_extra={"example": "scholarship for college girls"}
    )
    top_k: int = 5
    state_filter: Optional[str] = None
    category_filter: Optional[str] = None


class SmartRecommendationRequest(BaseModel):
    query: Optional[str] = Field(
        default=None,
        description="Search query or prompt describing your requirements",
        json_schema_extra={"example": "college scholarship for girl student in Maharashtra with income 1.5 lakhs"}
    )
    prompt: Optional[str] = None
    message: Optional[str] = None
    profile: Optional[UserProfile] = Field(
        default=None,
        description="Optional profile (automatically extracted from query if omitted)"
    )
    top_k: int = 5

    def get_text(self) -> str:
        return self.query or self.prompt or self.message or ""


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: Optional[str] = Field(
        default=None,
        description="Your natural language question or prompt (e.g. 'I am a 20 year old student from Maharashtra...')",
        json_schema_extra={"example": "I am a 20 year old female college student from Maharashtra with family income of 1.5 lakhs. What scholarships can I apply for?"}
    )
    prompt: Optional[str] = Field(default=None, description="Alias for message")
    query: Optional[str] = Field(default=None, description="Alias for message")
    history: Optional[List[ChatMessage]] = Field(default=None, description="Optional conversation history for multi-turn conversations")
    profile: Optional[UserProfile] = Field(default=None, description="Optional profile override (automatically extracted from message if omitted)")

    def get_text(self) -> str:
        return self.message or self.prompt or self.query or ""


class RecommendationRequest(BaseModel):
    prompt: Optional[str] = Field(default=None, description="Optional text prompt to automatically infer profile from")
    query: Optional[str] = None
    message: Optional[str] = None
    profile: Optional[UserProfile] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    state: Optional[str] = None
    income: Optional[float] = None
    occupation: Optional[str] = None
    education: Optional[str] = None
    marital_status: Optional[str] = None
    disability: Optional[bool] = None
    student_status: Optional[str] = None
    single_girl_child: Optional[bool] = None
    social_category: Optional[str] = None


# -------------------------------------------------------------
# Routes
# -------------------------------------------------------------
@app.get("/")
def home():
    all_schemes = load_all_schemes()
    return {
        "service": "UNNATI Backend",
        "status": "online",
        "total_schemes_loaded": len(all_schemes),
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/chat")
def chat(request: ChatRequest):
    """
    Primary Chatbot endpoint:
    Receives user prompt string, automatically infers demographic & financial profile,
    searches schemes via RAG, verifies eligibility, and produces a step-by-step
    application workflow and document checklist using Gemini API.
    """
    user_text = request.get_text().strip()
    if not user_text:
        raise HTTPException(status_code=400, detail="Please provide a message or prompt string.")

    chatbot = get_chatbot_service()

    user_profile_dict = request.profile.model_dump(exclude_none=True) if request.profile else None
    history_dicts = [h.model_dump() for h in request.history] if request.history else None

    result = chatbot.generate_response(
        message=user_text,
        history=history_dicts,
        profile=user_profile_dict
    )

    return result


@app.post("/search")
def search(request: SearchRequest):
    """
    High-performance RAG search across 3,400 government schemes.
    """
    results = search_schemes(
        query=request.query,
        top_k=request.top_k,
        state_filter=request.state_filter,
        category_filter=request.category_filter
    )

    return {
        "query": request.query,
        "count": len(results),
        "results": results
    }


@app.post("/recommendations")
def recommendations(request: RecommendationRequest):
    """
    Profile-based eligibility recommendations.
    Accepts either an explicit profile OR a single natural language prompt string.
    """
    all_schemes = load_all_schemes()
    chatbot = get_chatbot_service()

    # Extract user profile from prompt if provided
    prompt_text = request.prompt or request.query or request.message or ""
    inferred = chatbot.extract_profile_from_text(prompt_text) if prompt_text else {}

    # Merge with explicit profile fields if provided
    direct_fields = {
        k: v for k, v in request.model_dump(exclude_none=True).items()
        if k not in ["prompt", "query", "message", "profile"]
    }
    if request.profile:
        direct_fields.update(request.profile.model_dump(exclude_none=True))

    user_data = {**inferred, **direct_fields}

    results = get_recommendations(
        user=user_data,
        schemes=all_schemes,
        include_ineligible=False
    )

    return {
        "inferred_profile": user_data,
        "count": len(results),
        "recommendations": results[:20]
    }


@app.post("/smart-recommendations")
def smart_recommendations(request: SmartRecommendationRequest):
    """
    Hybrid endpoint: RAG semantic retrieval + profile eligibility ranking.
    Profile is automatically inferred from the query string if omitted.
    """
    query_text = request.get_text().strip()
    if not query_text:
        raise HTTPException(status_code=400, detail="Please provide a query or prompt string.")

    chatbot = get_chatbot_service()

    user_data = request.profile.model_dump(exclude_none=True) if request.profile else {}
    # If no explicit profile provided, automatically extract features from the query string
    if not user_data:
        user_data = chatbot.extract_profile_from_text(query_text)

    retrieved = search_schemes(
        query=query_text,
        top_k=request.top_k * 3,
        state_filter=user_data.get("state")
    )

    candidate_schemes = [item["scheme"] for item in retrieved]

    results = get_recommendations(
        user=user_data,
        schemes=candidate_schemes,
        include_ineligible=False
    )

    # Fallback if strict filter is empty
    if not results and candidate_schemes:
        results = get_recommendations(
            user=user_data,
            schemes=candidate_schemes,
            include_ineligible=True
        )

    top_results = results[:request.top_k]

    return {
        "query": query_text,
        "inferred_profile": user_data,
        "retrieved_count": len(candidate_schemes),
        "recommendation_count": len(top_results),
        "recommendations": top_results
    }



@app.get("/schemes/{scheme_id_or_slug}")
def get_scheme(scheme_id_or_slug: str):
    """
    Retrieve complete normalized scheme by ID or slug.
    """
    scheme = get_scheme_by_id(scheme_id_or_slug)
    if not scheme:
        raise HTTPException(status_code=404, detail="Scheme not found")
    return scheme


@app.get("/categories")
def get_categories():
    """
    List all available scheme categories.
    """
    all_schemes = load_all_schemes()
    categories = sorted(list(set(
        s.get("category", "").strip() for s in all_schemes if s.get("category")
    )))
    return {
        "count": len(categories),
        "categories": categories
    }