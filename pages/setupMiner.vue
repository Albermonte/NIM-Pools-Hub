<template>
  <Wizard />
</template>

<script>
import Wizard from "~/components/CustomNimiq/StepperSetupMiner";

export default {
  components: {
    Wizard
  },
  layout: "tutorial",
  async fetch({ store, params, $axios }) {
    let poolList = [...store.state.poolList];
    const in_us = await $axios.$get(`${window.location.origin}/api/in_us`);
    let region;
    if (in_us) {
      region = "us";
    } else {
      region = "eu";
    }
    poolList.forEach(async (x, index) => {
      if (x.name === "blankpool" || x.name === "balkanpool") {
        store.dispatch("poolList/UPDATE_POOLFEE", { index, name: x.name });
      }
      if (x.name === "nimpool") {
        if (region === "us")
          store.dispatch("poolList/UPDATE_POOLURL", {
            index,
            url: "us.nimpool.io:8444"
          });
        const status = (await $axios.$get(
          `${window.location.origin}/api/isOnline/${x.name}` + region
        ))
          ? "online"
          : "offline";
        store.dispatch("poolList/UPDATE_POOLSTATUS", { index, status, region });
      } else {
        const status = (await $axios.$get(
          `${window.location.origin}/api/isOnline/${x.name}`
        ))
          ? "online"
          : "offline";
        store.dispatch("poolList/UPDATE_POOLSTATUS", { index, status });
      }
    });
  },
  fetchOnServer: false
};
</script>
