def merge_llm_with_metadata(llm_results: list, all_courses: list):
    merged = []

    for llm_course in llm_results:
        for course in all_courses:
            if (
                course["title"].lower() == llm_course["title"].lower()
                and course["platform"] == llm_course["platform"]
            ):
                merged.append({
                    **course,
                    "reason": llm_course["reason"]
                })
                break

    return merged
