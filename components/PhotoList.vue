<template>
  <div class="photo-list-container px-4">
    <ul
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-y-5 gap-x-5"
      v-if="photoData"
      data-test="photo-list"
    >
      <li
        v-for="photo in photoData.photos"
        :key="photo.id"
        data-test="photo-list-item"
      >
        <PhotoCard :photo="photo" />
      </li>
    </ul>
    <h2 v-else class="text-center text-3xl font-bold" data-test="empty-message">
      We couldn't find any photos
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { usePhotoData } from "~/composables/photo-data";

export default defineComponent({
  setup() {
    const { photoData } = usePhotoData();

    return {
      photoData,
    };
  },
});
</script>