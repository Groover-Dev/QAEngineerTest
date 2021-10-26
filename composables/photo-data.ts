import { ref } from "@nuxtjs/composition-api";

import { PexelsPhotoCollectionType } from "~/types/PexelsPhotoCollectionType";
import { PhotoResourceType } from "~/types/PhotoResourceType";
import { State } from "~/store";
import { useColorConverter } from "./color-converter";

async function fetchPhotosData(
  url: string
): Promise<PexelsPhotoCollectionType> {
  //return await (await import("../static/photo-resources-mock.json")).default;
  return await fetch(url).then(res => res.json());
}

/**
 * Fetches photo data from the 'curated' api
 * @param hostUrl {string}
 * @returns Promise
 */
export async function useFetchCuratedPhotos(hostUrl: string) {
  const photoData = ref<PexelsPhotoCollectionType | null>(null);
  const photos = ref<PhotoResourceType[] | null>(null);

  photoData.value = await fetchPhotosData(`${hostUrl}/api/curated`);
  photos.value = photoData.value.photos;

  return {
    photoData,
    photos
  };
}

/**
 * Fetches a single photo with the given id
 * @param hostUrl {string}
 * @param id {string}
 * @returns Promise
 */
export async function useGetPhotoById(hostUrl: string, id: string) {
  const photo = ref<PhotoResourceType | null>(null);

  // const mockData = await (
  //   await import("../static/photo-resources-mock.json")
  // ).default.photos.find(photo => photo.id === Number(id));
  // if (mockData) {
  //   photo.value = mockData;
  // }
  photo.value = await fetch(`${hostUrl}/api/photos/${id}`).then(res =>
    res.json()
  );

  return {
    photo
  };
}

/**
 * Fetches photo data from the 'search' api if a search string is provided,
 * otherwise it gets data from the 'curated' api
 * @param hostUrl {string}
 * @param search {string}
 * @returns Promise
 */
export async function usePhotoDataSearch(
  hostUrl: string,
  search: string,
  color?: string
) {
  if (!search || !color) return useFetchCuratedPhotos(hostUrl);

  const photoData = ref<PexelsPhotoCollectionType | null>(null);
  const photos = ref<PhotoResourceType[] | null>(null);

  let url = `api/photos?query=${search}`;
  url = color ? `${url}&color=${color}` : url;

  photoData.value = await fetchPhotosData(url);
  photos.value = photoData.value.photos;

  return {
    photoData,
    photos
  };
}

export function useFilterPhotos(
  state: State,
  nameSearch?: string,
  maxWidth?: string,
  maxHeight?: string,
  colorHex?: string
) {
  let filtered = [...state.photos];

  if (nameSearch) {
    filtered = [
      ...filtered.filter(photo => photo.photographer.includes(nameSearch))
    ];
  }
  if (maxWidth) {
    filtered = [...filtered.filter(photo => photo.width <= Number(maxWidth))];
  }
  if (maxHeight) {
    filtered = [...filtered.filter(photo => photo.height <= Number(maxHeight))];
  }
  if (colorHex) {
    const [h, s, l] = useColorConverter(colorHex);
    filtered = [
      ...filtered.filter(photo => {
        const [pH, pS, pL] = useColorConverter(photo.avg_color);
        const hueDeltaPercentage = getDegreeDeltaPercentage(h, pH);
        const saturationDelta = Math.abs(s - pS);
        const lightDelta = Math.abs(l - pL);

        if (
          hueDeltaPercentage <= 5 &&
          saturationDelta <= 0.33 &&
          lightDelta <= 0.4
        ) {
          return photo;
        }
      })
    ];
  }

  return {
    filteredPhotos: filtered
  };
}

function getDegreeDeltaPercentage(a: number, b: number) {
  return (Math.abs(a - b) / 360) * 100;
}
