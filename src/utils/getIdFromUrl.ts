/**
 * Extracts the ID from a SWAPI URL and returns it as a number.
 */
export const getIdFromUrl = (url: string): number | null => {
  const idRegex = /\/(\d+)\/?$/;
  const match = url.match(idRegex);

  if (match && match[1]) {
    return parseInt(match[1], 10);
  }

  return null;
};
