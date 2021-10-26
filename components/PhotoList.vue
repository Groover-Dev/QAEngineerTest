<template>
  <div class="photo-list-container px-4">
    <ul
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-y-5 gap-x-5"
      v-if="photos && photos.length"
      data-test="photo-list"
    >
      <li v-for="photo in photos" :key="photo.id" data-test="photo-list-item">
        <PhotoCard :photo="photo" />
      </li>
    </ul>
    <h2 v-else class="text-center text-3xl font-bold" data-test="empty-message">
      {{ emptyMessage }}
    </h2>
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
    };
  },
});
</script>