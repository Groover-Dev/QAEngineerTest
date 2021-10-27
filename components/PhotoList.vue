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
        <p class="text-3xl font-bold" v-else>Getting more photos...</p>
      </div>
    </div>
    <p
      v-else-if="!$fetchState.pending"
      class="text-center text-3xl font-bold"
      data-test="empty-message"
    >
      {{ emptyMessage }}
    </p>
    <p
      v-else-if="$fetchState.pending"
      class="text-center text-3xl font-bold"
      data-test="empty-message"
    >
      Loading...
    </p>
    <p
      v-else-if="$fetchState.error"
      class="text-center text-3xl font-bold"
      data-test="empty-message"
    >
      Oh no! An error occurred
    </p>
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