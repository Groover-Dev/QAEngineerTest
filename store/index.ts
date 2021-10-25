import {
  InjectionKey,
  useStore as baseUseStore
} from "@nuxtjs/composition-api";

import {
  useFetchCuratedPhotos,
  usePhotoDataSearch
} from "~/composables/photo-data";
import { CollectionMetaDataType } from "~/types/CollectionMetaDataType";
import { PhotoResourceType } from "~/types/PhotoResourceType";

export interface State {
  photoCollectionData: CollectionMetaDataType;
  photos: PhotoResourceType[];
}

export const key: InjectionKey<State> = Symbol();

export const state = () => ({
  photoCollectionData: {},
  photos: []
});

export const mutations = {
  setPhotoCollectionData(state: State, photoData: CollectionMetaDataType) {
    state.photoCollectionData = {
      page: photoData.page,
      per_page: photoData.per_page,
      total_results: photoData.total_results,
      next_page: photoData.next_page,
      prev_page: photoData.prev_page
    };
  },
  setPhotos(state: State, photos: PhotoResourceType[]) {
    state.photos = photos;
  },
  addPhotos(state: State, photos: PhotoResourceType[]) {
    photos.forEach(photo => state.photos.push(photo));
  }
};

export const actions = {
  async fetchCuratedPhotos({ commit }: { commit: any }) {
    const { photoData, photos } = await useFetchCuratedPhotos();
    commit("setPhotos", photos.value);
    commit("setPhotoCollectionData", photoData.value);
  },
  async searchPhotos({ commit }: { commit: any }, search: string) {
    const { photoData, photos } = await usePhotoDataSearch(search);
    commit("setPhotos", photos.value);
    commit("setPhotoCollectionData", photoData.value);
  }
};

export function useStore() {
  return baseUseStore<State>(key);
}
