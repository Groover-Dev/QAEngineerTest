import { shallowMount } from "@vue/test-utils";

import MobileFiltersDialog from "@/components/MobileFiltersDialog.vue";

const propsData = {
  colorHex: "",
  maxWidth: "",
  maxHeight: "",
  sort: ""
};

const stubs = {
  FiltersFormLabel: { template: "<span></span>" },
  FiltersFormSortSelect: { template: "<span></span>" },
  BaseButton: { template: "<span></span>" },
  FiltersFormDimensionInput: { template: "<span></span>" },
  FiltersFormColorPicker: { template: "<span></span>" }
};

describe("FiltersFormOpenButton", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(MobileFiltersDialog, {
      propsData,
      stubs
    });
  });

  test("close button emits event when clicked", () => {
    wrapper.get('[data-test="close-button"]').trigger("click");
    expect(wrapper.emitted()).toHaveProperty("toggleMobileFiltersOpen");
  });
});
