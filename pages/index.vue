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

import pageTransition from "~/mixins/page-transitions.js";
import Vue from "vue";

const enter = (el, done) => {
  console.info("enter child animation");
  let tl = Vue.prototype.$anime.timeline({
    duration: 350,
    easing: "easeInSine",
    complete: done
  });

  tl.add({
    targets: ".logo",
    opacity: 1
  })
    .add({
      targets: ".title",
      opacity: 1
    })
    .add({
      targets: ".subtitle",
      opacity: 1
    })
    .add({
      targets: ".links",
      opacity: 1
    });
};

export default {
  mixins: [pageTransition(enter)],
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