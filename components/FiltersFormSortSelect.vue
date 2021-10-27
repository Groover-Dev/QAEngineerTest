<template>
  <div>
    <FiltersFormLabel htmlFor="sort">Sort by</FiltersFormLabel>
    <select
      class="
        sort-select__select
        mt-2
        sm:mt-4
        border border-gray-400
        bg-gray-100
        rounded
        w-full
        py-2
        pl-4
        pr-10
        text-lg
        placeholder-gray-500
        font-medium
      "
      name="sort"
      id="sort"
      :value="sort"
      @change="onSelectChange"
    >
      <option value="newest">Newest</option>
      <option value="a-z">Photographer (a - z)</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    sort: {
      type: String,
      required: true,
    },
  },
  methods: {
    onSelectChange(event: InputEvent) {
      this.$emit("update:sort", event);
    },
  },
});
</script>

<style scoped>
.sort-select__select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='%23555555'%3E%3Cpath d='M24 24H0V0h24v24z' fill='none' opacity='.87'/%3E%3Cpath d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 98% center;
}
</style>