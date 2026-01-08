import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

def scrape_edx(topic: str, limit: int = 5):
    url = f"https://www.edx.org/search?q={topic}"
    response = requests.get(url, headers=HEADERS, timeout=10)

    soup = BeautifulSoup(response.text, "html.parser")
    courses = []

    for card in soup.select("div.discovery-card")[:limit]:
        try:
            title = card.find("h3").get_text(strip=True)
            link = card.find("a")["href"]

            if not link.startswith("http"):
                link = "https://www.edx.org" + link

            courses.append({
                "title": title,
                "platform": "edX",
                "rating": 4.4,
                "price": 0,
                "description": title,
                "link": link
            })
        except:
            continue

    return courses
