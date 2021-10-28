import { shallowMount } from "@vue/test-utils";

import FiltersFormOpenButton from "@/components/FiltersFormOpenButton.vue";

describe("FiltersFormOpenButton", () => {
  test("emits event on click", () => {
    const wrapper = shallowMount(FiltersFormOpenButton, {
      propsData: { isOpen: false }
    });
    wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("toggle");
  });

  test("title changes based on props", async () => {
    const wrapper = shallowMount(FiltersFormOpenButton, {
      propsData: { isOpen: false }
    });
    expect(wrapper.attributes("title")).toBe("Open filters");
    await wrapper.setProps({ isOpen: true });
    expect(wrapper.attributes("title")).toBe("Close filters");
  });
});
