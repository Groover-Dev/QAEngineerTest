<template>
  <div
    role="dialog"
    class="mobile-filters__container md:hidden absolute left-1/2 transform -translate-x-1/2 fade-in opacity-0"
    data-test="filters-dialog"
  >
    <span class="mobile-filters__arrow"></span>
    <div
      class="mobile-filters__inner-container shadow-xl bg-white border border-gray-300 p-4 sm:py-6 rounded z-50"
    >
      <button
        type="button"
        class="absolute right-4 top-4 sm:top-3"
        title="Close filters dialog"
        @click="$emit('toggleMobileFiltersOpen', false)"
        data-test="close-button"
      >
        <svg
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          class="fill-current text-gray-600"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
          />
        </svg>
      </button>
      <div class="grid sm:grid-cols-3 gap-4 sm:gap-6">
        <FiltersFormColorPicker
          :colorHex="colorHex"
          @update:colorHex="$emit('update:colorHex', $event)"
        />
        <div class="filter-forms__dimension-inputs-container">
          <FiltersFormLabel>
            Filter by size <span class="text-sm">(up to px)</span>
          </FiltersFormLabel>
          <div class="mt-2 sm:mt-4 flex">
            <FiltersFormDimensionInput
              id="maxWidth"
              label="W:"
              :dimension="maxWidth"
              @update:dimension="$emit('update:maxWidth', $event)"
            />
            <FiltersFormDimensionInput
              class="ml-4"
              id="maxHeight"
              label="H:"
              :dimension="maxHeight"
              @update:dimension="$emit('update:maxHeight', $event)"
            />
          </div>
        </div>
        <FiltersFormSortSelect
          :sort="sort"
          @update:sort="$emit('update:sort', $event)"
        />
      </div>
      <div class="text-center mt-6 md:hidden">
        <BaseButton
          @button-click="$emit('clearFilters', $event)"
          data-test="clear-filters-dialog-button"
        >
          Clear Filters
        </BaseButton>
      </div>
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
    maxWidth: {
      type: String,
      required: true,
    },
    maxHeight: {
      type: String,
      required: true,
    },
    sort: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.mobile-filters__container {
  animation-duration: 250ms;
  top: 110%;
  width: calc(100vw - 1rem);
}

.mobile-filters__inner-container::before {
  background: white;
  content: "";
  position: absolute;
  width: 1.75rem;
  height: 1px;
  top: 0;
  right: 0.875rem;
}

.mobile-filters__arrow {
  filter: drop-shadow(0px 0px 1rem rgba(0, 0, 0, 0.3));
  position: absolute;
  top: -1.25rem;
  right: 0.875rem;
  width: 1.75rem;
  height: 1.25rem;
  z-index: -1;
}

.mobile-filters__arrow::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  background: black;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  width: 1.75rem;
  height: 1.25rem;
  top: 0;
  left: 0;
}

.mobile-filters__arrow::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  background: white;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  width: 1.75rem;
  height: 1.25rem;
  top: 0;
  left: 0;
}
</style>
