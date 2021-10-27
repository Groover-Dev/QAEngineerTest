import { shallowMount } from "@vue/test-utils";

import BaseButton from "@/components/BaseButton.vue";

describe("BaseButton", () => {
  test("displays slotted content", () => {
    const wrapper = shallowMount(BaseButton, { slots: { default: "Hello" } });
    expect(wrapper.text()).toBe("Hello");
  });

  test("emits event on click", () => {
    const wrapper = shallowMount(BaseButton);
    wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("button-click");
  });

  test("sets default button type", () => {
    const wrapper = shallowMount(BaseButton);
    expect(wrapper.attributes("type")).toBe("button");
  });

  test("sets button type through props", () => {
    const wrapper = shallowMount(BaseButton, { propsData: { type: "submit" } });
    expect(wrapper.attributes("type")).toBe("submit");
  });
});
