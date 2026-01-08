import faiss
import numpy as np

class CourseIndex:
    def __init__(self, dim: int):
        self.index = faiss.IndexFlatL2(dim)
        self.metadata = []

    def add(self, vectors: np.ndarray, metadata: list[dict]):
        self.index.add(vectors)
        self.metadata.extend(metadata)

    def search(self, query_vector: np.ndarray, top_k: int = 5):
        distances, indices = self.index.search(query_vector, top_k)
        return [self.metadata[i] for i in indices[0]]
