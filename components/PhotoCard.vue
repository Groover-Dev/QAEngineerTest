<template>
  <figure class="photo-container relative bg-gray-200" @click="clearFilters">
    <NuxtLink
      :to="`/photos/${photo.id}`"
      class="h-full w-full absolute overflow-hidden"
      no-prefetch
      data-test="photo-details-link"
    >
      <img
        class="photo-card__img absolute object-cover h-full w-full opacity-0 transform motion-safe:transition motion-safe:transition-transform ease-in-out duration-1000 hover:scale-105"
        :class="{ 'fade-in': photoLoaded }"
        :src="photo.src.large"
        :alt="description"
        loading="lazy"
        data-test="photo-img"
        @load="setLoaded"
      />
    </NuxtLink>
    <figcaption
      class="absolute z-10 bottom-0 px-3 py-2 text-white bg-opacity-15 bg-black w-full flex justify-between"
    >
      <span data-test="photo-size">
        Image size: {{ photo.width }} x {{ photo.height }}
      </span>
      <div class="ml-2">
        <span>Photo by</span>
        <a
          rel="external noreferrer noopener"
          :href="photo.photographer_url"
          class="font-bold hover:underline focus:underline focus:outline-white"
          data-test="photographer-link"
        >
          {{ photo.photographer }}
        </a>
      </div>
    </figcaption>
  </figure>
</template>

<script lang="ts">
import { computed, ref, defineComponent } from "@nuxtjs/composition-api";

import { usePhotoUrlToText } from "~/composables/photo-url-to-text";

export default defineComponent({
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      description: computed(() => usePhotoUrlToText(props.photo.url)),
      photoLoaded: ref(false),
    };
  },
  methods: {
    setLoaded() {
      this.photoLoaded = true;
    },
    clearFilters() {
      this.$store.dispatch("clearFilters");
    },
  },
});
</script>

<style scoped>
.photo-container {
  /* pre-calc height from portrait photo size (2:3 ratio) */
  min-height: calc(calc(100vw - 2rem) * 1.5);
}

@media screen and (min-width: 40em) {
  .photo-container {
    min-height: calc(calc(50vw - 2rem) * 1.5);
  }
}

@media screen and (min-width: 64em) {
  .photo-container {
    min-height: calc(calc(33.33vw - 2rem) * 1.5);
  }
}

@media screen and (min-width: 80em) {
  .photo-container {
    min-height: 608px;
  }
}
</style>
