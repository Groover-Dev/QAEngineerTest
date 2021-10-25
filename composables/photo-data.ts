import { ref } from "@nuxtjs/composition-api";
import { PexelsPhotoCollectionType } from "~/types/PexelsPhotoCollectionType";
import { PhotoResourceType } from "~/types/PhotoResourceType";

async function fetchPhotosData(
  url: string
): Promise<PexelsPhotoCollectionType> {
  //return await (await import("../static/photo-resources-mock.json")).default;
  return await fetch(url).then(res => res.json());
}

/**
 * Fetches photo data from the 'curated' api
 * @returns Promise
 */
export async function useFetchCuratedPhotos() {
  const photoData = ref<PexelsPhotoCollectionType | null>(null);
  const photos = ref<PhotoResourceType[] | null>(null);

  photoData.value = await fetchPhotosData("/api/curated");
  photos.value = photoData.value.photos;

  return {
    photoData,
    photos
  };
}

/**
 * Fetches photo data from the 'search' api if a search string is provided,
 * otherwise it gets data from the 'curated' api
 * @param search {string}
 * @returns Promise
 */
export async function usePhotoDataSearch(search: string) {
  if (!search) return useFetchCuratedPhotos();

  const url = `api/photos?query=${search}`;
  const photoData = ref<PexelsPhotoCollectionType | null>(null);
  const photos = ref<PhotoResourceType[] | null>(null);

  photoData.value = await fetchPhotosData(url);
  photos.value = photoData.value.photos;

  return {
    photoData,
    photos
  };
}
