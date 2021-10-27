<template>
  <form
    class="filters-container px-4 pb-4 border-b"
    role="search"
    @submit.prevent="performSearch"
  >
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <FiltersFormSearch
        :searchText="searchText"
        @update:searchText="updateSearchText"
      />
      <FiltersFormColorPicker
        :colorHex="colorHex"
        @update:colorHex="updateColorHex"
      />
      <div>
        <span class="text-lg sm:border-b border-gray-300 pb-1 w-full sm:block">
          Filter by size (up to px):
        </span>
        <div class="mt-4 flex">
          <FiltersFormDimensionInput
            id="maxWidth"
            label="W:"
            :dimension="maxWidth"
            @update:dimension="updateMaxWidth"
          />
          <FiltersFormDimensionInput
            class="ml-4"
            id="maxHeight"
            label="H:"
            :dimension="maxHeight"
            @update:dimension="updateMaxHeight"
          />
        </div>
      </div>
    </div>
    <div class="text-center mt-6">
      <BaseButton @button-click="clearFilters"> Clear Filters </BaseButton>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import debounce from "lodash/debounce";

const defaultColor = "#00B3B3";

export default defineComponent({
  setup() {
    return {
      searchText: "",
      colorHex: defaultColor,
      maxWidth: "",
      maxHeight: "",
    };
  },
  methods: {
    performSearch: debounce(function (this: any) {
      this.$store.dispatch("filterPhotos", {
        nameSearch: this.searchText,
        maxWidth: this.maxWidth,
        maxHeight: this.maxHeight,
        colorHex: this.colorHex !== defaultColor ? this.colorHex : undefined,
      });
    }, 350),
    updateSearchText(event: InputEvent) {
      this.searchText = (event.target as HTMLInputElement).value;
      this.performSearch();
    },
    updateColorHex(event: InputEvent) {
      this.colorHex = (event.target as HTMLInputElement).value;
      this.performSearch();
    },
    updateMaxWidth(event: InputEvent) {
      this.maxWidth = (event.target as HTMLInputElement).value;
      this.performSearch();
    },
    updateMaxHeight(event: InputEvent) {
      this.maxHeight = (event.target as HTMLInputElement).value;
      this.performSearch();
    },
    clearFilters() {
      this.searchText = "";
      this.maxWidth = "";
      this.maxHeight = "";
      this.colorHex = defaultColor;
      this.performSearch();
    },
  },
});
</script>
