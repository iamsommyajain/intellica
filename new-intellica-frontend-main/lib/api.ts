export async function getDailyContent(interest = "DSA") {
  const res = await fetch(
    `http://localhost:5000/daily-content?interest=${interest}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch daily content");
  }

  return res.json();
}
