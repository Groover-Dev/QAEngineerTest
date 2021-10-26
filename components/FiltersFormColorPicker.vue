<template>
  <div>
    <label
      for="color"
      class="text-lg sm:border-b border-gray-300 sm:pb-1 w-full sm:block"
      >Filter by color:</label
    >
    <div
      class="
        color-picker__input-container
        relative
        overflow-hidden
        rounded-full
        mt-3
        sm:mt-4
      "
    >
      <input
        class="
          color-picker__input
          cursor-pointer
          absolute
          top-1/2
          left-1/2
          transform
          -translate-x-1/2 -translate-y-1/2
        "
        type="color"
        id="color"
        name="color"
        :value="colorHex"
        @input="onColorChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    colorHex: {
      type: String,
      required: true,
    },
  },
  methods: {
    onColorChange(event: InputEvent) {
      this.$emit("update:colorHex", event);
    },
  },
});
</script>

<style scoped>
.color-picker__input-container {
  height: 2.875rem;
  width: 2.875rem;
}

.color-picker__input {
  height: 3.5rem;
  width: 3.5rem;
}
</style>