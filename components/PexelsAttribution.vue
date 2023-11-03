<template>
  <div
    class="attribution fixed z-10 bottom-0 right-0 w-full py-3 px-5 text-right"
  >
    <a
      class="hover:underline"
      rel="external noreferrer"
      href="https://www.pexels.com"
      data-test="pexels-attribution-link"
    >
      Photos provided by <span class="font-bold">Pexels</span>
    </a>
  </div>
</template>

<style scoped>
.attribution {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1) 7%,
    rgba(255, 255, 255, 0.34)
  );
  backdrop-filter: blur(3.5px);
}
</style>
