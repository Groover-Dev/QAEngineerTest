<template>
  <div
    class="flex items-center bg-gray-100 border border-gray-400 rounded pl-4"
  >
    <label class="dimension-input__label mr-2" :for="id">{{ label }}</label>
    <input
      class="w-full bg-gray-100 rounded pl-2 pr-4 py-2 text-lg font-medium"
      :id="id"
      :name="name"
      type="number"
      :value="dimension"
      @input="onInputChange"
      min="1"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    name: { type: String },
    label: {
      type: String,
      required: true,
    },
    dimension: {
      type: String,
      required: true,
    },
  },
  methods: {
    onInputChange(event: InputEvent) {
      this.$emit("update:dimension", event);
    },
  },
});
</script>