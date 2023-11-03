<template>
  <section class="text-container mt-4 border-t pt-2">
    <h2 class="text-gray-600 text-xs uppercase">Photo Info</h2>
    <ul class="grid gap-y-4 mt-4">
      <li class="flex items-center">
        <span class="text-gray-600 text-sm photo-info__text-label">
          Photographer
        </span>
        <a
          class="font-bold whitespace-nowrap hover:underline"
          :href="photo.photographer_url"
          data-test="photographer-name"
          rel="external noreferrer noopener"
        >
          {{ photo.photographer }}
        </a>
      </li>
      <li class="flex items-center">
        <span class="text-gray-600 text-sm photo-info__text-label">
          Resolution
        </span>
        <span class="font-bold whitespace-nowrap" data-test="photo-resolution">
          {{ photo.width }}px x {{ photo.height }}px
        </span>
      </li>
      <li class="flex items-center">
        <span class="text-gray-600 text-sm photo-info__text-label">
          Average Color
        </span>
        <div
          class="photo-info__color-swatch rounded-full h-full"
          :style="avgColorStyle"
          data-test="photo-color"
        ></div>
      </li>
    </ul>
    <div class="mt-4">
      <a
        :href="photo.url"
        class="font-bold hover:underline"
        rel="external noreferrer"
        data-test="photo-pexels-link"
      >
        View it on Pexels
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      avgColorStyle: computed(() => ({
        background: `${props.photo.avg_color}`,
      })),
    };
  },
});
</script>

<style scoped>
.photo-info__text-label {
  width: 6rem;
  white-space: nowrap;
}

.photo-info__color-swatch {
  width: 2.25rem;
  height: 2.25rem;
}
</style>
