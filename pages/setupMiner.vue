<template>
  <Wizard />
</template>

<script>
import Wizard from '~/components/CustomNimiq/StepperSetupMiner'

export default {
  components: {
    Wizard
  },
  layout: 'tutorial',
  async fetch({ store, params, $axios }) {
    let poolList = [...store.state.poolList];
    const ipContinent = await $axios.$get("https://ipapi.co/continent_code/");
    let region;
    if (ipContinent === "US") {
      region = "us";
    } else {
      region = "eu";
    }
    poolList.map(async (x, index) => {
      if (x.name === "nimpool") {
        if (region === "us") x.url = "us.nimpool.io:8444";
        const status = (
          await $axios.$get(
            `${window.location.origin}/api/isOnline/${x.name}` + region
          )
        )
          ? "online"
          : "offline";
        store.dispatch("poolList/UPDATE_POOLSTATUS", { index, status, region });
      } else {
        const status = (
          await $axios.$get(`${window.location.origin}/api/isOnline/${x.name}`)
        )
          ? "online"
          : "offline";
        store.dispatch("poolList/UPDATE_POOLSTATUS", { index, status });
      }
    });
  },
  fetchOnServer: false
}
</script>
