<template>
  <v-layout style="height: 100%;">
    <v-flex class="text-center d-flex flex-column justify-space-between align-center">
      <AdLargePlaceholder />
      <StatsGauges />
      <Carousel />
      <AdLargePlaceholder />
    </v-flex>
  </v-layout>
</template>

<script>
import AdLargePlaceholder from "~/components/Ads/AdLargePlaceholder";
import Carousel from "~/components/CustomNimiq/Carousel";
import StatsGauges from "~/components/CustomNimiq/StatsGauges";

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
    Carousel,
    StatsGauges
  },
  async fetch({ store, params, $axios }) {
    let poolList = [...store.state.poolList];
    poolList.forEach(async (x, index) => {
      if (x.name === "blankpool" || x.name === "balkanpool") {
        store.dispatch("poolList/UPDATE_POOLFEE", { index, name: x.name });
      }
    });
    setInterval(() => store.dispatch("nimiq/UPDATE_NIMIQ_INFO"), 5 * 60 * 1000);
  },
  fetchOnServer: false
};
</script>