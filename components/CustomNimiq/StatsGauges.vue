<template>
  <v-container style="height: 160px">
    <v-row style="height: 150px" class="pb-5">
      <!-- Pools Online -->
      <v-col style="height: 150px">
        <div style="height: 120px">
          <VueSvgGauge
            :start-angle="-90"
            :end-angle="90"
            :value="poolsOnline"
            :separator-step="1"
            :min="0"
            :max="poolList.length"
            gauge-color="#21BCA5"
            :scale-interval="0"
            class="mb-n3"
          />
          <span
            class="title grey--text text--darken-4 text-uppercase mt-n4"
          >{{ `${poolsOnline}/${poolList.length}` }} Pools Online</span>
        </div>
      </v-col>
      <!-- Network Hashrate -->
      <v-col style="height: 150px">
        <div style="height: 120px">
          <VueSvgGauge
            :start-angle="-90"
            :end-angle="90"
            :value="currentNetworkHS"
            :separator-step="0"
            :min="0"
            :max="topNetworkHS"
            :gauge-color="[{ offset: 0, color: '#0582CA'}, { offset: 100, color: '#21BCA5'}]"
            :scale-interval="0.1"
            class="mb-n3"
          >
            <span class="overline text-uppercase white--text" style="position: absolute; bottom: -1px; left: 17px">0</span>
            <span class="body-2 font-weight-light text-uppercase" style="position: absolute; bottom: -1px; right: 33.8%">{{ parsedNetworkHS }}</span>
            <span class="overline text-uppercase" style="position: absolute; bottom: -1px; right: 7px">Max</span>
          </VueSvgGauge>
          <span class="title grey--text text--darken-4 text-uppercase mt-n4">Network Hashrate</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VueSvgGauge } from "vue-svg-gauge";

export default {
  components: {
    VueSvgGauge
  },
  computed: {
    poolList() {
      return this.$store.state.poolList;
    },
    poolsOnline() {
      let counter = 0;
      this.poolList.forEach(x => {
        if (x.status === "online") counter++;
      });
      return counter;
    },
    currentNetworkHS() {
      return this.$store.state.nimiq.hashrateComplete / 1e9;
    },
    topNetworkHS() {
      return this.$store.state.nimiq.top_hashrateComplete / 1e9;
    },
    parsedNetworkHS(){
      return this.$store.state.nimiq.hashrate
    }
  }
};
</script>

<style>
.inner-text {
  height: 100%;
  width: 100%;
}
</style>