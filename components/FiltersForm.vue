<template>
  <form
    class="filters-container px-4"
    role="search"
    @submit.prevent="performSearch"
  >
    <FiltersFormSearch
      :searchText="searchText"
      @update:searchText="updateSearchText"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import debounce from "lodash/debounce";

export default defineComponent({
  setup() {
    return {
      searchText: "",
    };
  },
  methods: {
    performSearch: debounce(async function (
      this: any,
      event: InputEvent | SubmitEvent
    ) {
      await this.$store.dispatch("searchPhotos", this.searchText);
    },
    350),
    updateSearchText(event: any) {
      this.searchText = event.target.value;
      this.performSearch(event);
    },
  },
});
</script>
