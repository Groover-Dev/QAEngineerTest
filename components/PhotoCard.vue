<template>
  <figure class="photo-container relative overflow-hidden bg-gray-200">
    <img
      class="absolute object-cover h-full w-full"
      v-bind:src="photo.src.large"
      alt=""
      loading="lazy"
    />
    <figcaption
      class="
        caption-text
        absolute
        z-10
        bottom-0
        px-3
        py-2
        text-white
        md:text-lg
        bg-opacity-15 bg-black
        w-full
        text-right
      "
    >
      <span>Photo by</span>
      <a
        rel="external noreferrer noopener"
        :href="photo.photographer_url"
        class="font-bold hover:underline focus:underline"
        >{{ photo.photographer }}</a
      >
    </figcaption>
  </figure>
</template>

<script lang='ts'>
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    photo: {
      type: Object,
      required: true,
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