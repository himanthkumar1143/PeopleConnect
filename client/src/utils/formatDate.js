/**
 * Formats an ISO date string to a human-readable date.
 * e.g. "2025-04-25T11:00:00Z" → "April 25, 2025"
 */
export const formatDate = (isoString) => {
  if (!isoString) return '—';
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoString));
};

/**
 * Formats an ISO date string to short form.
 * e.g. "25 Apr 2025"
 */
export const formatDateShort = (isoString) => {
  if (!isoString) return '—';
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoString));
};
