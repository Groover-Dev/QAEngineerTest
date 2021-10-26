import {
  InjectionKey,
  useStore as baseUseStore
} from "@nuxtjs/composition-api";

import {
  useFetchCuratedPhotos,
  usePhotoDataSearch,
  useFilterPhotos
} from "~/composables/photo-data";
import { CollectionMetaDataType } from "~/types/CollectionMetaDataType";
import { PhotoResourceType } from "~/types/PhotoResourceType";

export interface State {
  photoCollectionData: CollectionMetaDataType;
  photos: PhotoResourceType[];
  filteredPhotos: PhotoResourceType[];
  hostUrl: string;
}

export const key: InjectionKey<State> = Symbol();

export const state = () => ({
  photoCollectionData: {},
  photos: [],
  filteredPhotos: [],
  hostUrl: ""
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
    state.photos = [...photos];
  },
  addPhotos(state: State, photos: PhotoResourceType[]) {
    state.photos = [...state.photos, ...photos];
  },
  setFilteredPhotos(state: State, photos: PhotoResourceType[]) {
    state.filteredPhotos = [...photos];
  },
  setHostUrl(state: State, url: string) {
    state.hostUrl = url;
  }
};

export const actions = {
  nuxtServerInit({ commit }: { commit: any }, { req }: { req: any }) {
    const hostUrl =
      req.headers.host.indexOf("localhost:3000") > -1
        ? `http://${req.headers.host}`
        : req.headers.host;
    commit("setHostUrl", hostUrl);
  },
  async fetchCuratedPhotos({ commit, state }: { commit: any; state: State }) {
    const { photoData, photos } = await useFetchCuratedPhotos(state.hostUrl);
    commit("setPhotos", photos.value);
    commit("setFilteredPhotos", photos.value);
    commit("setPhotoCollectionData", photoData.value);
  },
  async searchPhotosApi(
    { commit, state }: { commit: any; state: State },
    { search, color }: { search: string; color?: string }
  ) {
    const { photoData, photos } = await usePhotoDataSearch(
      state.hostUrl,
      search,
      color
    );
    commit("setPhotos", photos.value);
    commit("setFilteredPhotos", photos.value);
    commit("setPhotoCollectionData", photoData.value);
  },
  searchPhotos(
    { commit, state }: { commit: any; state: State },
    {
      nameSearch,
      maxWidth,
      maxHeight,
      colorHex
    }: {
      nameSearch?: string;
      maxWidth?: string;
      maxHeight?: string;
      colorHex?: string;
    }
  ) {
    const { filteredPhotos } = useFilterPhotos(
      state,
      nameSearch,
      maxWidth,
      maxHeight,
      colorHex
    );
    commit("setFilteredPhotos", filteredPhotos);
  }
};

export function useStore() {
  return baseUseStore<State>(key);
}
