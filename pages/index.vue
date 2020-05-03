<template>
  <v-layout style="height: 100%;">
    <v-flex class="text-center d-flex flex-column justify-space-between align-center">
      <AdLargePlaceholder />
      <Carousel />
      <AdLargePlaceholder />
    </v-flex>
  </v-layout>
</template>

<script>
import AdLargePlaceholder from "~/components/Ads/AdLargePlaceholder";
import Carousel from "~/components/CustomNimiq/Carousel";

export default {
  components: {
    AdLargePlaceholder,
    Carousel
  },
  async fetch({ store, params, $axios }) {
    let poolList = [...store.state.poolList];
    poolList.map(async (x, index) => {
      if (x.name === "blankpool" || x.name === "balkanpool") {
        store.dispatch("poolList/UPDATE_POOLFEE", { index, name: x.name });
      }
    });
  },
  fetchOnServer: false
};
</script>