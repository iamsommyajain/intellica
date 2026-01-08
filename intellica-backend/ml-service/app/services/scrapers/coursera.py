import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

def scrape_coursera(topic: str, limit: int = 5):
    url = f"https://www.coursera.org/search?query={topic}"
    response = requests.get(url, headers=HEADERS, timeout=10)

    soup = BeautifulSoup(response.text, "html.parser")
    courses = []

    # Coursera course cards usually have links starting with /learn or /professional-certificates
    links = soup.select("a[href^='/learn'], a[href^='/professional-certificates']")

    for link_tag in links[:limit]:
        try:
            title = link_tag.get_text(strip=True)
            href = link_tag.get("href")

            if not title or not href:
                continue

            full_link = "https://www.coursera.org" + href

            courses.append({
                "title": title,
                "platform": "Coursera",
                "rating": 4.6,          # placeholder (Coursera hides ratings dynamically)
                "price": 0,             # many courses are free to audit
                "description": title,
                "link": full_link
            })
        except Exception:
            continue

    return courses
