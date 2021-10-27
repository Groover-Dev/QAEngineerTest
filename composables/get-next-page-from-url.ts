/**
 * Gets the page query from within the pexels next_page url.
 * Example url: "https://api.pexels.com/v1/curated/?page=2&per_page=25"
 * @param {string} url
 * @returns {string}
 */
export function useGetNextPageFromUrl(url?: string) {
  if (!url) return "";

  const res = url.substr(url.indexOf("?") + 1);
  const splitArr = res.split("&");
  const pageParam = splitArr.find(item => item.indexOf("_page=") === -1);
  const page = pageParam?.substr(pageParam.indexOf("=") + 1);

  return page;
}
