/** Rough average Latin word length for estimating words in text with no spaces. */
const AVG_CHARS_PER_WORD = 5;

/**
 * Word count for journaling: whitespace-separated tokens; if there is a single
 * long unbroken run (e.g. pasted text without spaces), estimate from length so
 * the counter and minimum-length rules still make sense.
 */
export function countJournalWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;

  const tokens = trimmed.split(/\s+/).filter(Boolean);
  if (tokens.length >= 2) return tokens.length;

  const single = tokens[0] ?? "";
  if (single.length <= AVG_CHARS_PER_WORD) return 1;

  return Math.max(1, Math.round(single.length / AVG_CHARS_PER_WORD));
}
