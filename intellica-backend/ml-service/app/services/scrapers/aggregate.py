from .coursera import scrape_coursera
from .udemy import scrape_udemy
from .edx import scrape_edx

def normalize_key(course):
    return course["title"].lower().strip()

def aggregate_courses(topic: str, limit: int):
    raw_courses = []

    raw_courses.extend(scrape_coursera(topic, limit))
    raw_courses.extend(scrape_udemy(topic, limit))
    raw_courses.extend(scrape_edx(topic, limit))

    seen = set()
    unique_courses = []

    for course in raw_courses:
        key = normalize_key(course)
        if key not in seen:
            seen.add(key)
            unique_courses.append(course)

    return unique_courses[:limit]
