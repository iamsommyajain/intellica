import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def groq_rank_courses(query: str, courses: list[dict], limit: int = 5):
    course_text = "\n".join(
        [
            f"{i+1}. {c['title']} ({c['platform']})"
            for i, c in enumerate(courses)
        ]
    )

    prompt = f"""
You are an expert learning advisor.

User query:
"{query}"

Available courses:
{course_text}

Task:
1. Select the best {limit} courses for the query.
2. Prefer clarity, beginner-friendliness, and reputation.
3. Return the answer as JSON only.

JSON format:
[
  {{
    "title": "...",
    "platform": "...",
    "reason": "short explanation"
  }}
]
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return response.choices[0].message.content
