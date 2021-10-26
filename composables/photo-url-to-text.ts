/**
 * Used specifically to get text out of Pexels photo urls.
 * Pexels urls follow a format of 'https://www.pexels.com/photo/some-words-123/
 * @param url {string}
 * @returns {string}
 */
export function usePhotoUrlToText(url: string | undefined) {
  if (!url) return "";
  let result = "";

  result = url.substring(url.indexOf("photo/") + 6);
  result = result.substring(0, result.lastIndexOf("-"));
  result = result.split("-").join(" ");

  return result;
}
