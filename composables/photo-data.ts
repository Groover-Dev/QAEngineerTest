import { ref } from "@nuxtjs/composition-api";

import { PexelsPhotoCollectionType } from "~/types/PexelsPhotoCollectionType";
import { PhotoResourceType } from "~/types/PhotoResourceType";
import { useColorConverter } from "./color-converter";

async function fetchPhotosData(
  url: string
): Promise<PexelsPhotoCollectionType> {
  //return await (await import("../static/photo-resources-mock.json")).default;
  return await fetch(url).then(res => res.json());
}

/**
 * Fetches photo data from the 'curated' api
 * @param {string} hostUrl
 * @param {string} [page=1]
 * @returns {Promise}
 */
export async function useFetchCuratedPhotos(
  hostUrl: string,
  page: string = "1"
) {
  const photoData = ref<PexelsPhotoCollectionType | null>(null);
  const photos = ref<PhotoResourceType[] | null>(null);

  await fetchPhotosData(`${hostUrl}/api/curated?page=${page}`).then(data => {
    photoData.value = data;
    photos.value = photoData.value.photos;
  });

  return {
    photoData,
    photos
  };
}

/**
 * Fetches a single photo with the given id
 * @param {string} hostUrl
 * @param {string} id
 * @returns {Promise}
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

export function useFilterPhotos(
  photos: PhotoResourceType[],
  nameSearch?: string,
  maxWidth?: string,
  maxHeight?: string,
  colorHex?: string
) {
  let filtered = [...photos];

  if (nameSearch) {
    filtered = [
      ...filtered.filter(photo =>
        photo.photographer.toLowerCase().includes(nameSearch.toLowerCase())
      )
    ];
  }
  if (maxWidth) {
    filtered = [...filtered.filter(photo => photo.width <= Number(maxWidth))];
  }
  if (maxHeight) {
    filtered = [...filtered.filter(photo => photo.height <= Number(maxHeight))];
  }
  if (colorHex) {
    const hsl = useColorConverter(colorHex);
    filtered = [
      ...filtered.filter(photo => {
        const photoHsl = useColorConverter(photo.avg_color);
        return doColorsMatch(hsl, photoHsl);
      })
    ];
  }

  filtered = [
    ...filtered.sort((a, b) => {
      const [hue1] = useColorConverter(a.avg_color);
      const [hue2] = useColorConverter(b.avg_color);
      return (
        a.photographer.localeCompare(b.photographer) ||
        a.width - b.width ||
        a.height - b.height ||
        hue1 - hue2
      );
    })
  ];

  return {
    filteredPhotos: filtered
  };
}

function getDegreeDeltaPercentage(a: number, b: number) {
  return (Math.abs(a - b) / 360) * 100;
}

function doColorsMatch(hsl: number[], hsl2: number[]) {
  const [h, s, l] = hsl;
  const [pH, pS, pL] = hsl2;
  const hueDeltaPercentage = getDegreeDeltaPercentage(h, pH);
  const saturationDelta = Math.abs(s - pS);
  const lightDelta = Math.abs(l - pL);

  if (hueDeltaPercentage <= 5 && saturationDelta <= 0.33 && lightDelta <= 0.4) {
    return true;
  }
  return false;
}
