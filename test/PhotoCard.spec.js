import { shallowMount, RouterLinkStub } from "@vue/test-utils";

import PhotoCard from "@/components/PhotoCard.vue";

const photo = {
  id: 1,
  url: "https://test.com/photo/john-standing-123/",
  photographer: "John",
  photographer_id: 1,
  photographer_url: "https://test.com/",
  avg_color: "#000000",
  width: 100,
  height: 100,
  liked: false,
  src: {
    original: "",
    large: "https://test.com/large",
    large2x: "",
    medium: "",
    small: "",
    portrait: "",
    landscape: ""
  }
};

describe("PhotoCard", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(PhotoCard, {
      propsData: { photo },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });
  });

  test("displays img and img alt text", () => {
    const img = wrapper.get('[data-test="photo-img"]');
    expect(img.attributes("src")).toBe(photo.src.large);
    expect(img.attributes("alt")).toBe("john standing");
  });

  test("displays photo size", () => {
    const size = wrapper.get('[data-test="photo-size"]');
    expect(size.text()).toBe("Image size: 100 x 100");
  });

  test("displays photographer link", () => {
    const link = wrapper.get('[data-test="photographer-link"]');
    expect(link.text()).toBe(photo.photographer);
    expect(link.attributes("href")).toBe(photo.photographer_url);
  });
});
