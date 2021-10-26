import { mount } from "@vue/test-utils";

import PhotoInfo from "@/components/PhotoInfo.vue";

const photo = {
  id: 1,
  url: "",
  photographer: "John",
  photographer_id: 1,
  photographer_url: "https://test.com",
  avg_color: "#000000",
  width: 100,
  height: 100,
  liked: false,
  src: {
    original: "",
    large: "",
    large2x: "",
    medium: "",
    small: "",
    portrait: "",
    landscape: ""
  }
};

describe("PhotoInfo", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(PhotoInfo, { propsData: { photo } });
  });

  test("displays photographer name and link", () => {
    const name = wrapper.get('[data-test="photographer-name"]');
    expect(name.text()).toBe(photo.photographer);
    expect(name.html().indexOf(photo.photographer_url)).toBeTruthy();
  });

  test("displays photo resolution", () => {
    const resolution = wrapper.get('[data-test="photo-resolution"]');
    expect(resolution.text()).toBe(`${photo.width}px x ${photo.height}px`);
  });

  test("displays photo color", () => {
    const color = wrapper.get('[data-test="photo-color"]');
    expect(color.attributes("style")).toBe("background: rgb(0, 0, 0);");
  });
});
