import { ref, useFetch } from "@nuxtjs/composition-api";
import { PexelsPhotoCollectionType } from "~/types/PexelsPhotoCollectionType";

export function usePhotoData() {
  const photoData = ref<PexelsPhotoCollectionType | null>(null);

  const { fetch: fetchPhotoData } = useFetch(async () => {
    const data = await import("../static/photo-resources-mock.json");
    photoData.value = data.default;
    // photoData.value = await fetch(
    //   "https://api.pexels.com/v1/curated?per_page=42",
    //   {
    //     headers: {
    //       Authorization: process.env.PEXELS_API || ""
    //     },
    //     mode: "no-cors"
    //   }
    // ).then(res => res.json());
  });

  return {
    photoData,
    fetchPhotoData
  };
}
