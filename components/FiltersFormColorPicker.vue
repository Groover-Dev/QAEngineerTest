<template>
  <div>
    <FiltersFormLabel htmlFor="color"> Filter by color </FiltersFormLabel>
    <div
      class="color-picker__input-container relative overflow-hidden rounded-full mt-1 sm:mt-4"
    >
      <img
        v-if="colorHex === null"
        src="checkered.png"
        class="h-full w-full absolute object-none cursor-pointer"
        alt=""
        loading="lazy"
      />
      <input
        class="color-picker__input cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        :class="{ 'opacity-0': colorHex === null }"
        type="color"
        id="color"
        name="color"
        :value="colorCopy"
        @input="onColorChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@nuxtjs/composition-api";

import type { PropOptions } from "@nuxtjs/composition-api";

const defaultColor = "#FFFFFF";

export default defineComponent({
  props: {
    colorHex: {
      type: String,
    } as PropOptions<string | null>,
  },
  setup(props) {
    const colorCopy = ref(defaultColor);

    const inputType = computed(() => {
      return props.colorHex === null ? "text" : "color";
    });

    return {
      colorCopy,
      inputType,
    };
  },
  methods: {
    onColorChange(event: Event) {
      this.colorCopy = (event.target as HTMLInputElement).value;
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
}
</style>
