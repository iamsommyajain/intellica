from fastapi import APIRouter
from app.services.scrapers.aggregate import aggregate_courses
from app.services.semantic_recommender import semantic_rank
from app.services.groq_client import groq_rank_courses
from app.services.llm_utils import safe_json_parse
from app.services.merge_results import merge_llm_with_metadata

router = APIRouter()


@router.get("/recommend")
def recommend(topic: str, limit: int = 5):
    scraped = aggregate_courses(topic, limit * 4)

    semantic_results = semantic_rank(scraped, topic, limit * 2)

    llm_raw = groq_rank_courses(topic, semantic_results, limit)
    llm_ranked = safe_json_parse(llm_raw)

    final_results = merge_llm_with_metadata(llm_ranked, semantic_results)

    return {
        "query": topic,
        "results": final_results
    }
