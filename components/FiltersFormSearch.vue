<template>
  <div class="search-container w-full">
    <FiltersFormLabel htmlFor="search-input">
      Search by photographer
    </FiltersFormLabel>
    <div class="relative mt-2 sm:mt-4">
      <input
        class="border border-gray-400 bg-gray-100 rounded w-full py-2 pl-4 pr-10 text-lg placeholder-gray-500 font-medium"
        id="search-input"
        type="search"
        name="search"
        :value="searchText"
        @input="onInputChange"
        required
        data-test="search-input"
      />
      <button
        title="search"
        id="search-button"
        type="submit"
        class="absolute top-0 right-0 h-full px-3"
        data-test="search-input-button"
      >
        <svg
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-current text-gray-600"
          aria-label="Search"
        >
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    onInputChange(event: Event) {
      this.$emit("update:searchText", event);
    },
  },
});
</script>

<style scoped>
/* clears the 'X' from Internet Explorer */
#search-input::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
#search-input::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

/* clears the 'X' from Chrome */
#search-input::-webkit-search-decoration,
#search-input::-webkit-search-cancel-button,
#search-input::-webkit-search-results-button,
#search-input::-webkit-search-results-decoration {
  display: none;
}
</style>
