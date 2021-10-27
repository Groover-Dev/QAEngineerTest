import { shallowMount } from "@vue/test-utils";

import FiltersFormSearch from "@/components/FiltersFormSearch.vue";

const FilterFormLabelStub = {
  FiltersFormLabel: { template: "<span />" }
};

describe("FiltersFormLabel", () => {
  test("input has correct value", () => {
    const wrapper = shallowMount(FiltersFormSearch, {
      propsData: {
        searchText: "Hello"
      },
      stubs: FilterFormLabelStub
    });
    const input = wrapper.get("input");
    expect(input.element.value).toBe("Hello");
  });

  test("input change emits event", () => {
    const wrapper = shallowMount(FiltersFormSearch, {
      propsData: {
        searchText: ""
      },
      stubs: FilterFormLabelStub
    });
    wrapper.get("input").setValue("H");
    expect(wrapper.emitted()).toHaveProperty("update:searchText");
  });
});
