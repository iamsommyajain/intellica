import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

def scrape_udemy(topic: str, limit: int = 5):
    url = f"https://www.udemy.com/courses/search/?q={topic}"
    response = requests.get(url, headers=HEADERS, timeout=10)

    soup = BeautifulSoup(response.text, "html.parser")
    courses = []

    for card in soup.select("div[data-purpose='course-card-title']")[:limit]:
        try:
            title = card.get_text(strip=True)
            link = card.find_parent("a")["href"]
            link = "https://www.udemy.com" + link

            courses.append({
                "title": title,
                "platform": "Udemy",
                "rating": 4.5,
                "price": 499,
                "description": title,
                "link": link
            })
        except:
            continue

    return courses
