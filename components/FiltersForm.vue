<template>
  <form
    class="
      filters-form__container
      overflow-hidden
      px-4
      pb-4
      pt-2
      border-b
      sticky
      top-0
      z-50
      bg-white
    "
    :class="{ 'filters-form__container--show': showFilters }"
    role="search"
    @submit.prevent="performSearch"
  >
    <div class="grid md:grid-cols-4 gap-4 sm:gap-6 items-end">
      <div class="flex items-end">
        <FiltersFormSearch
          :searchText="searchText"
          @update:searchText="updateSearchText"
        />
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
          :class="{ 'bg-gray-400': showFilters }"
          :title="`${showFilters ? 'hide' : 'show'} fiters`"
          @click="toggleShowFilters"
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
      </div>
      <div
        class="
          filter-forms__mobile-filters
          md:hidden
          grid
          sm:grid-cols-3
          gap-4
          sm:gap-6
        "
      >
        <FiltersFormColorPicker
          :colorHex="colorHex"
          @update:colorHex="updateColorHex"
          v-show="showFilters"
        />
        <div
          class="filter-forms__dimension-inputs-container"
          v-show="showFilters"
        >
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
          v-show="showFilters"
          :sort="sort"
          @update:sort="updateSort"
        />
      </div>
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
    <div class="text-center mt-6 md:hidden" v-show="showFilters">
      <BaseButton @button-click="clearFilters"> Clear Filters </BaseButton>
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
  setup() {
    return {
      searchText: "",
      colorHex: defaultColor,
      maxWidth: "",
      maxHeight: "",
      sort: "newest",
      showFilters: false,
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
      this.performSearch();
    },
    toggleShowFilters() {
      this.showFilters = !this.showFilters;
    },
  },
});
</script>

<style scoped>
.filters-form__container {
  height: 7rem;
}

.filters-form__container--show {
  height: 28.4375rem;
}

.filters-form__toggle-btn {
  height: 2.875rem;
}

@media screen and (prefers-reduced-motion: no-preference) {
  .filters-form__container {
    transition: height 300ms ease-out;
  }
}

@media screen and (min-width: 40em) {
  .filters-form__container {
    height: 7.5rem;
  }

  .filters-form__container--show {
    height: 19rem;
  }
}

@media screen and (min-width: 48em) {
  .filters-form__container {
    height: 100%;
  }
}
</style>
