export function usePhotoUrlToText(url: string | undefined) {
  if (!url) return "";
  let result = "";

  result = url.substring(url.indexOf("photo/") + 6);
  result = result.substring(0, result.lastIndexOf("-"));
  result = result.split("-").join(" ");

  return result;
}
