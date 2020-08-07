<template>
  <div>
    <div v-if="$vuetify.breakpoint.smAndDown" class="text-center">
      <span>Please visit us on a Desktop PC</span>
    </div>
    <div v-else>
      <MinerSelect v-if="!wizardDisplay" class="pl-3" @chooseWizard="chooseWizard" />
      <Wizard v-else @chooseWizard="chooseWizard" />
    </div>
  </div>
</template>

<script>
import Wizard from "~/components/SetupMiner/StepperSetupMiner";
import MinerSelect from "~/components/SetupMiner/MinerSelect";

export default {
  components: {
    Wizard,
    MinerSelect,
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
      if (x.name === "nimpool") {
        if (region === "us")
          store.dispatch("poolList/UPDATE_POOLURL", {
            index,
            url: "us.nimpool.io:8444",
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

      await store.dispatch(`${x.name}/UPDATE_POOL_INFO`);
      await store.dispatch("poolList/UPDATE_POOLFEE", { index, name: x.name });
    });
  },
  fetchOnServer: false,
  data() {
    return {
      wizardDisplay: false,
    };
  },
  methods: {
    chooseWizard(value) {
      this.wizardDisplay = value;
    },
  },
};
</script>
