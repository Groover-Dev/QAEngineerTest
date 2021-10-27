import { shallowMount } from "@vue/test-utils";

import FiltersFormLabel from "@/components/FiltersFormLabel.vue";

describe("FiltersFormLabel", () => {
  test("displays slotted content", () => {
    const wrapper = shallowMount(FiltersFormLabel, {
      slots: { default: "Hello" }
    });
    expect(wrapper.text()).toBe("Hello");
  });

  test("displays label element when given a htmlFor attribute", () => {
    const wrapper = shallowMount(FiltersFormLabel, {
      propsData: {
        htmlFor: "something"
      }
    });
    const labelEl = wrapper.get('[data-test="filters-form-label"] label');
    expect(labelEl.exists()).toBe(true);
  });

  test("displays span element when not given a htmlFor attribute", () => {
    const wrapper = shallowMount(FiltersFormLabel);
    const spanEl = wrapper.get('[data-test="filters-form-label"] span');
    expect(spanEl.exists()).toBe(true);
  });
});
