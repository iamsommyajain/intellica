// src/utils/chunkText.js

/**
 * Splits long text into safe-sized chunks for LLM processing
 * @param {string} text
 * @param {number} maxChars
 * @returns {string[]}
 */
export function chunkText(text, maxChars = 6000) {
  if (!text || typeof text !== "string") return [];

  const chunks = [];
  let start = 0;

  while (start < text.length) {
    chunks.push(text.slice(start, start + maxChars));
    start += maxChars;
  }

  return chunks;
}
