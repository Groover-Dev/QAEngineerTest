<template>
  <article class="max-w-screen-xl mx-auto py-4">
    <div
      v-if="photo && !$fetchState.pending"
      class="sm:grid sm:grid-cols-2 sm:gap-x-6"
    >
      <img
        class="photo-details__image w-full object-cover sm:pl-4 md:object-contain opacity-0"
        :class="{ 'fade-in': photoLoaded }"
        :src="photo.src.large"
        @load="setLoaded"
        alt=""
      />
      <div class="mt-4 sm:mt-0 px-4 sm:pl-0">
        <h1 class="capitalize text-2xl font-bold">
          {{ description }}
        </h1>
        <PhotoInfo :photo="photo" />
      </div>
    </div>
    <div v-else-if="$fetchState.pending" class="text-2xl font-bold text-center">
      Loading...
    </div>
    <div v-else-if="$fetchState.error" class="text-2xl font-bold text-center">
      Oh no! An error occurred
    </div>
  </article>
</template>

<script lang="ts">
import {
  defineComponent,
  useRoute,
  useStore,
  useFetch,
  ref,
  computed,
} from "@nuxtjs/composition-api";
import { State } from "~/store";
import { useGetPhotoById } from "~/composables/photo-data";
import { usePhotoUrlToText } from "~/composables/photo-url-to-text";
import { PhotoResourceType } from "~/types/PhotoResourceType";
import capitalize from "lodash/capitalize";

export default defineComponent({
  layout: "default",
  setup() {
    const route = useRoute();
    const store = useStore<State>();
    const photo = ref<PhotoResourceType | null>(null);
    const id = route.value.params.id;

    useFetch(async () => {
      const { photo: photoData } = await useGetPhotoById(
        store.state.hostUrl,
        id
      );
      photo.value = photoData.value;
    });

    const description = computed<string>(
      () => usePhotoUrlToText(photo.value?.url) || ""
    );

    return {
      id,
      photo,
      description,
      photoLoaded: ref(false),
    };
  },
  head() {
    return {
      title: `Photo View | ${capitalize(this.description || "")}`,
    };
  },
  methods: {
    setLoaded() {
      this.photoLoaded = true;
    },
  },
});
</script>

<style scoped>
.photo-details__image {
  max-height: 650px;
}
</style>
