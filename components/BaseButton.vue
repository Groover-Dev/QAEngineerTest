<template>
  <button
    class="
      border border-gray-500
      rounded
      px-4
      py-2
      pb-3
      text-lg
      font-medium
      motion-safe:transition-colors
      duration-300
      ease-in-out
      hover:text-white hover:bg-gray-800
    "
    :type="buttonType || 'button'"
    @click="$emit('button-click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  emits: ["button-click"],
  props: {
    buttonType: {
      type: String,
    },
  },
});
</script>
