import {
  InjectionKey,
  useStore as baseUseStore
} from "@nuxtjs/composition-api";

import {
  useFetchCuratedPhotos,
  useFilterPhotos
} from "~/composables/photo-data";
import { useGetNextPageFromUrl } from "~/composables/get-next-page-from-url";
import { CollectionMetaDataType } from "~/types/CollectionMetaDataType";
import { FiltersType } from "~/types/FiltersType";
import { PhotoResourceType } from "~/types/PhotoResourceType";

export interface State {
  photoCollectionData: CollectionMetaDataType;
  photos: PhotoResourceType[];
  filteredPhotos: PhotoResourceType[];
  filters: FiltersType;
  hostUrl: string;
}

export const key: InjectionKey<State> = Symbol();

export const state = () => ({
  photoCollectionData: {},
  photos: [],
  filteredPhotos: [],
  filters: {},
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
  setFilters(state: State, filters: FiltersType) {
    state.filters = { ...filters };
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
        : `https://${req.headers.host}`;
    commit("setHostUrl", hostUrl);
  },
  async fetchCuratedPhotos({ commit, state }: { commit: any; state: State }) {
    await useFetchCuratedPhotos(state.hostUrl).then(data => {
      const { photoData, photos } = data;
      commit("setPhotos", photos.value);
      commit("setPhotoCollectionData", photoData.value);

      const { filteredPhotos } = useFilterPhotos(
        state.photos,
        state.filters.nameSearch,
        state.filters.maxWidth,
        state.filters.maxHeight,
        state.filters.colorHex,
        state.filters.sort
      );
      commit("setFilteredPhotos", filteredPhotos);
    });
  },
  async fetchMorePhotos({
    dispatch,
    commit,
    state
  }: {
    dispatch: any;
    commit: any;
    state: State;
  }) {
    const nextPage = useGetNextPageFromUrl(state.photoCollectionData.next_page);
    if (nextPage) {
      await useFetchCuratedPhotos(state.hostUrl, nextPage).then(data => {
        const { photoData, photos } = data;
        commit("addPhotos", photos.value);
        commit("setPhotoCollectionData", photoData.value);
        dispatch("filterPhotos", state.filters);
      });
    }
  },
  filterPhotos(
    { commit, state }: { commit: any; state: State },
    {
      nameSearch,
      maxWidth,
      maxHeight,
      colorHex,
      sort
    }: {
      nameSearch?: string;
      maxWidth?: string;
      maxHeight?: string;
      colorHex?: string;
      sort?: string;
    }
  ) {
    const { filteredPhotos } = useFilterPhotos(
      state.photos,
      nameSearch,
      maxWidth,
      maxHeight,
      colorHex,
      sort
    );
    commit("setFilters", { nameSearch, maxWidth, maxHeight, colorHex, sort });
    commit("setFilteredPhotos", filteredPhotos);
  }
};

export function useStore() {
  return baseUseStore<State>(key);
}
