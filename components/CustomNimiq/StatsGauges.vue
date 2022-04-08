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
            :value="logCurrentPoolHS / 1e9"
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
                  v-if="currentNetworkHS && currentPoolHS / currentNetworkHS > 0.51"
                  class="caption font-weight-light text-uppercase align-self-center white--text mb-4"
                  color="red darken-4"
                  disabled
                  flat
                  style="position: absolute;"
                >Warning! Hashrate too high Choose another pool</v-card>
              </v-scale-transition>
              <v-scroll-y-transition v-if="!$vuetify.breakpoint.xs">
                <!-- if condition just to toggle -->
                <span
                  v-if="currentPool % 2"
                  class="body-2 font-weight-light text-uppercase pb-1"
                  style="position:absolute"
                >{{ parsedCurrentPoolHS }}</span>
              </v-scroll-y-transition>
              <v-scroll-y-transition v-if="!$vuetify.breakpoint.xs">
                <!-- if condition just to toggle -->
                <span
                  v-if="!(currentPool % 2)"
                  class="body-2 font-weight-light text-uppercase pb-1"
                  style="position:absolute"
                >{{ parsedCurrentPoolHS }}</span>
              </v-scroll-y-transition>
              <span
                v-if="$vuetify.breakpoint.xs"
                class="body-2 font-weight-light text-uppercase pb-1"
              >{{ parsedCurrentPoolHS }}</span>
              <span
                class="text-uppercase"
                style="position: absolute;bottom: -3px;font-size: 7.5px;"
              >(Log Scale)</span>
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
    logCurrentPoolHS() {
      // Using logarithmic scale to represent better small hashrates
      const vm = this;
      let smallestHS = this.currentNetworkHS;
      this.poolList.forEach(x => {
        const hashrateComplete = eval(
          "vm.$store.state." + x.name + ".hashrateComplete"
        );
        if (hashrateComplete <= 0) return;
        if (hashrateComplete < smallestHS) smallestHS = hashrateComplete;
      });
      smallestHS = smallestHS - smallestHS / 2; // To prevent the smallestHS being 0 on the log scale

      const higherHS = this.currentNetworkHS;

      const m = this.currentNetworkHS;
      const k = m / (Math.log10(higherHS) - Math.log10(smallestHS));

      const value =
        k * (Math.log10(this.currentPoolHS) - Math.log10(smallestHS));
      return value;
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