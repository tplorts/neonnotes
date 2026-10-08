export const AGE_RANGE = { min: 0, max: 10 } as const;

export const ageRangeText = `${AGE_RANGE.min}–${AGE_RANGE.max}`;
export const ageRangeLabel = `${AGE_RANGE.min} to ${AGE_RANGE.max}`;

export const INSTAGRAM_URL = "https://instagram.com/neonnoteslv";

/**
 * Ticket page for the next session. Set to null between sessions — ticket
 * buttons then point to Instagram, where new dates are announced.
 */
export const TICKETS_URL: string | null = null;
