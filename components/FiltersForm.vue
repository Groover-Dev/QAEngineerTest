<template>
  <form
    class="
      filters-form__container
      px-4
      pb-4
      pt-2
      border-b
      sticky
      top-0
      z-50
      bg-white
    "
    role="search"
    @submit.prevent="performSearch"
  >
    <div class="grid md:grid-cols-4 gap-4 sm:gap-6 items-end">
      <div class="flex items-end">
        <FiltersFormSearch
          :searchText="searchText"
          @update:searchText="updateSearchText"
        />
        <FiltersFormOpenButton
          :isOpen="mobileFiltersOpen"
          @toggle="$emit('toggleMobileFiltersOpen')"
        />
      </div>
      <MobileFiltersDialog
        v-if="mobileFiltersOpen"
        class="md:hidden"
        :colorHex="colorHex"
        @update:colorHex="updateColorHex"
        :maxWidth="maxWidth"
        @update:maxWidth="updateMaxWidth"
        :maxHeight="maxHeight"
        @update:maxHeight="updateMaxHeight"
        :sort="sort"
        @update:sort="updateSort"
        @clearFilters="clearFilters"
        @toggleMobileFiltersOpen="$emit('toggleMobileFiltersOpen', false)"
      />
      <FiltersFormColorPicker
        class="hidden md:block"
        :colorHex="colorHex"
        @update:colorHex="updateColorHex"
      />
      <div class="filter-forms__dimension-inputs-container hidden md:block">
        <FiltersFormLabel>
          Filter size <span class="text-sm">(up to px)</span>
        </FiltersFormLabel>
        <div class="mt-2 sm:mt-4 flex">
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
      <FiltersFormSortSelect
        class="hidden md:block"
        :sort="sort"
        @update:sort="updateSort"
      />
    </div>
    <div class="text-center mt-4 hidden md:block">
      <BaseButton @button-click="clearFilters"> Clear Filters </BaseButton>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import debounce from "lodash/debounce";

const defaultColor = "#00B3B3";

export default defineComponent({
  props: {
    mobileFiltersOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {
      searchText: "",
      colorHex: defaultColor,
      maxWidth: "",
      maxHeight: "",
      sort: "newest",
    };
  },
  methods: {
    performSearch: debounce(function (this: any) {
      this.$store.dispatch("filterPhotos", {
        nameSearch: this.searchText,
        maxWidth: this.maxWidth,
        maxHeight: this.maxHeight,
        colorHex: this.colorHex !== defaultColor ? this.colorHex : undefined,
        sort: this.sort,
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
    updateSort(event: InputEvent) {
      this.sort = (event.target as HTMLSelectElement).value;
      this.performSearch();
    },
    clearFilters() {
      this.searchText = "";
      this.maxWidth = "";
      this.maxHeight = "";
      this.colorHex = defaultColor;
      this.sort = "newest";
      this.$emit("toggleMobileFiltersOpen");
      this.performSearch();
    },
  },
});
</script>

<style scoped>
.filters-form__toggle-btn {
  height: 2.875rem;
}
</style>
