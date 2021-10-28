<template>
  <button
    class="
      filters-form__toggle-btn
      ml-4
      px-2
      rounded
      border border-gray-400
      bg-gray-100
      md:hidden
    "
    :class="{ 'bg-gray-400': isOpen }"
    :title="`${isOpen ? 'Close' : 'Open'} filters`"
    @click="$emit('toggle')"
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="fill-current text-gray-600"
      role="img"
      aria-label="show/hide more filters icon"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
