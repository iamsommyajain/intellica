export async function fetchRecommendations(topic) {
  const response = await fetch(
    `/api/recommend?topic=${encodeURIComponent(topic)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return response.json();
}
