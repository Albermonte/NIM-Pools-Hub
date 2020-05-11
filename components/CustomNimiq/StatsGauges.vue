<template>
  <v-container style="height: 160px">
    <v-row style="height: 150px" class="pb-5">
      <!-- Pools Online -->
      <v-col v-if="!$vuetify.breakpoint.xs" style="height: 150px">
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
      <!-- Pool Hashrate -->
      <v-col style="height: 150px">
        <div style="height: 120px">
          <VueSvgGauge
            :start-angle="-90"
            :end-angle="90"
            :value="currentPoolHS / 1e9"
            :separator-step="0"
            :min="0"
            :max="currentNetworkHS / 1e9"
            :gauge-color="[{ offset: 0, color: '#0582CA'}, { offset: 100, color: '#21BCA5'}]"
            :scale-interval="0.1"
            class="mb-n3"
          >
            <span
              class="overline text-uppercase white--text"
              style="position: absolute; bottom: -1px; left: 17px"
            >0</span>
            <div class="d-flex justify-center align-end" style="height: 100%;">
              <v-scale-transition>
                <v-card
                  v-if="currentPoolHS / currentNetworkHS > 0.51"
                  class="caption font-weight-light text-uppercase align-self-center white--text mb-4"
                  color="red darken-4"
                  disabled
                  flat
                  style="position: absolute;"
                >Warning! Hashrate too high Choose another pool</v-card>
              </v-scale-transition>
              <span class="body-2 font-weight-light text-uppercase">{{ parsedCurrentPoolHS }}</span>
            </div>
            <span
              class="overline text-uppercase"
              style="position: absolute; bottom: -1px; right: 7px"
            >Max</span>
          </VueSvgGauge>
          <span class="title grey--text text--darken-4 text-uppercase mt-n4">Pool Hashrate</span>
        </div>
      </v-col>
      <!-- Network Hashrate -->
      <v-col style="height: 150px">
        <div style="height: 120px">
          <VueSvgGauge
            :start-angle="-90"
            :end-angle="90"
            :value="currentNetworkHS / 1e9"
            :separator-step="0"
            :min="0"
            :max="topNetworkHS / 1e9"
            :gauge-color="[{ offset: 0, color: '#0582CA'}, { offset: 100, color: '#21BCA5'}]"
            :scale-interval="0.1"
            class="mb-n3"
          >
            <span
              class="overline text-uppercase white--text"
              style="position: absolute; bottom: -1px; left: 17px"
            >0</span>
            <div class="d-flex justify-center align-end" style="height: 100%;">
              <span class="body-2 font-weight-light text-uppercase">{{ parsedNetworkHS }}</span>
            </div>
            <span
              class="overline text-uppercase"
              style="position: absolute; bottom: -1px; right: 7px"
            >Max</span>
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
  props: {
    currentPool: {
      type: Number,
      default: 0
    }
  },
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
    currentPoolHS() {
      return Number(
        eval(
          "this.$store.state." +
            this.poolList[this.currentPool].name +
            ".hashrateComplete"
        )
      );
    },
    parsedCurrentPoolHS() {
      return eval(
        "this.$store.state." +
          this.poolList[this.currentPool].name +
          ".hashrate"
      );
    },
    currentNetworkHS() {
      return this.$store.state.nimiq.hashrateComplete;
    },
    topNetworkHS() {
      return this.$store.state.nimiq.top_hashrateComplete;
    },
    parsedNetworkHS() {
      return this.$store.state.nimiq.hashrate;
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