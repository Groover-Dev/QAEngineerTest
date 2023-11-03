<template>
  <div>
    <FiltersFormLabel htmlFor="color"> Filter by color </FiltersFormLabel>
    <div
      class="color-picker__input-container relative overflow-hidden rounded-full mt-1 sm:mt-4"
    >
      <input
        class="color-picker__input cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
    onColorChange(event: Event) {
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

.color-picker__input-container:focus-within {
  outline: 2px dashed #333;
  outline-offset: 0.25rem;
}

.color-picker__input {
  height: 3.5rem;
  width: 3.5rem;

  &::-webkit-color-swatch {
    background-color: transparent;
  }
}
</style>
