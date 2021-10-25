<template>
  <div class="max-w-screen-xl mx-auto grid gap-y-12">
    <FiltersForm />
    <PhotoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  layout: "default",
});
</script>
