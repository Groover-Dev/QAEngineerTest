<template>
  <span>
    <label
      v-if="htmlFor"
      :for="htmlFor"
      class="
        text-lg
        leading-none
        sm:border-b
        border-gray-300
        sm:pb-2
        w-full
        sm:block
      "
    >
      <slot></slot>
    </label>
    <span
      v-else
      class="
        text-lg
        leading-none
        sm:border-b
        border-gray-300
        sm:pb-2
        w-full
        sm:block
      "
    >
      <slot></slot>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    htmlFor: {
      type: String,
    },
  },
});
</script>
