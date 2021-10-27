<template>
  <div class="photo-list-container px-4">
    <div v-if="photos && photos.length">
      <ul
        class="
          mt-8
          grid
          sm:grid-cols-2
          lg:grid-cols-3
          gap-y-10
          sm:gap-y-5
          gap-x-5
        "
        data-test="photo-list"
      >
        <li v-for="photo in photos" :key="photo.id" data-test="photo-list-item">
          <PhotoCard :photo="photo" />
        </li>
      </ul>
      <div class="text-center mt-6">
        <BaseButton @button-click="loadMorePhotos" v-if="!loadingMore">
          Load more
        </BaseButton>
        <StateMessage class="mx-auto flex justify-center" v-else>
          <svg
            class="
              motion-safe:animate-spin
              motion-reduce:animate-pulse
              h-8
              w-8
              text-gray-600
            "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </StateMessage>
      </div>
    </div>
    <StateMessage v-else-if="$fetchState.pending">Loading...</StateMessage>
    <StateMessage v-else-if="$fetchState.error">
      Oh no! An error occurred
    </StateMessage>
    <StateMessage v-else-if="!$fetchState.pending && !$fetchState.error">
      {{ emptyMessage }}
    </StateMessage>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useFetch } from "@nuxtjs/composition-api";
import { useStore } from "~/store";

export default defineComponent({
  setup() {
    const store = useStore();

    useFetch(async () => {
      await store.dispatch("fetchCuratedPhotos");
    });

    return {
      collectionData: computed(() => store.state.photoCollectionData),
      photos: computed(() => store.state.filteredPhotos),
      emptyMessage: computed(() =>
        store.state.photos.length > 0 && store.state.filteredPhotos.length === 0
          ? "No photos match your search criteria"
          : "We couldn't find any photos"
      ),
      loadingMore: false,
      async loadMorePhotos(this: any) {
        this.loadingMore = true;
        await store.dispatch("fetchMorePhotos");
        this.loadingMore = false;
      },
    };
  },
});
</script>

<style scoped>
.scroller {
  height: 100%;
}
</style>