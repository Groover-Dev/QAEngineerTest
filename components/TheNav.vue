<template>
  <nav class="max-w-screen-xl mx-auto flex justify-between items-center">
    <NuxtLink to="/" class="text-4xl" data-test="nav-logo-link"
      >Photo View</NuxtLink
    >
    <NuxtLink
      v-show="$route.path !== '/'"
      to="/"
      class="text-lg font-medium"
      data-test="nav-back-link"
      ><span aria-hidden class="transform -rotate-45 inline-block">&#8598;</span
      ><span class="ml-1">Back</span></NuxtLink
    >
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({});
</script>
