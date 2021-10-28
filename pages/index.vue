<template>
  <div class="grid gap-y-12">
    <h1 class="sr-only">Photo View</h1>
    <FiltersForm
      :mobileFiltersOpen="mobileFiltersOpen"
      @toggleMobileFiltersOpen="toggleMobileFiltersOpen"
    />
    <PhotoList />
    <div
      v-if="mobileFiltersOpen"
      class="backdrop fixed top-0 left-0 md:hidden w-full h-full z-10"
      @click="() => toggleMobileFiltersOpen(false)"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  layout: "default",
  setup() {
    return {
      mobileFiltersOpen: false,
    };
  },
  methods: {
    toggleMobileFiltersOpen(open?: boolean) {
      this.mobileFiltersOpen =
        open === undefined ? !this.mobileFiltersOpen : open;
    },
  },
});
</script>
