from app.services.embeddings import embed_texts, embed_query
from app.services.faiss_index import CourseIndex

def semantic_rank(courses: list[dict], query: str, top_k: int = 5):
    texts = [c["title"] + ". " + c.get("description", "") for c in courses]

    vectors = embed_texts(texts)
    index = CourseIndex(vectors.shape[1])
    index.add(vectors, courses)

    q_vector = embed_query(query)
    return index.search(q_vector, top_k)
