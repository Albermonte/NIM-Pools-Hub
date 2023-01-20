<template>
  <v-row class="ml-auto mr-auto pt-2 pb-1 px-3">
    <v-col class="py-0">
      <material-stats-card min-height="138" color="green" icon="mdi-currency-usd" :currencyBtn="true" title="Balance" :value="balance" :small-value="currency"
        :sub-text-right="`Confirmed: ${confirmedBalance} NIM`" :sub-text-left="`Expected 24 Hours: ${(addressHashrateComplete / 1e3 * nim_day_kh).toFixed(0)} NIM`" />
    </v-col>
    <v-col class="py-0">
      <material-stats-card min-height="138" color="red" icon="mdi-devices" title="Device Count" :value="deviceCount" checkbox />
    </v-col>
    <v-col class="py-0">
      <material-stats-card min-height="138" color="orange" icon="mdi-speedometer" title="Address Hashrate" :value="addressHashrate" :small-value="addressHashrateSmallValue"
        :graph="[1, 2]" />
    </v-col>
  </v-row>
</template>

<style scoped>
.v-application .grey--text.text--darken-1 {
  color: #a0aec0 !important;
  caret-color: #a0aec0 !important;
}
</style>

<script>
import materialStatsCard from "~/components/CustomVuetify/material/AppStatsCard";

export default {
  components: {
    materialStatsCard,
  },
  data: () => ({
    currency: "NIM",
  }),
  computed: {
    balance() {
      // eslint-disable-next-line
      return eval("this.$store.state." + this.$route.name + ".balance");
    },
    confirmedBalance() {
      // eslint-disable-next-line
      return eval(
        "this.$store.state." + this.$route.name + ".confirmed_balance"
      );
    },
    unconfirmedBalance() {
      // eslint-disable-next-line
      return eval(
        "this.$store.state." + this.$route.name + ".unconfirmed_balance"
      );
    },
    addressHashrate() {
      // eslint-disable-next-line
      let addressHashrate = eval(
        "this.$store.state." + this.$route.name + ".address_hashrate"
      );
      if (addressHashrate !== 0 && typeof addressHashrate !== "undefined") {
        document.title = `NIM Pools Hub - ${addressHashrate}`
        return Number(addressHashrate.substr(0, addressHashrate.indexOf(" ")));;
      }
      else {
        return 0;
      }
    },
    addressHashrateComplete() {
      const hs = eval(
        "this.$store.state." + this.$route.name + ".address_hashrate_complete"
      );
      return Number(hs);
    },
    addressHashrateSmallValue() {
      let addressHashrate = eval(
        "this.$store.state." + this.$route.name + ".address_hashrate"
      );
      if (addressHashrate !== 0 && typeof addressHashrate !== "undefined")
        return addressHashrate.substr(addressHashrate.indexOf(" ") + 1);
      else return "kH/s";
    },
    deviceCount() {
      // eslint-disable-next-line
      try {
        return eval(
          "this.$store.state." + this.$route.name + ".deviceList.length"
        );
      } catch {
        return 0;
      }
    },
    nim_day_kh() {
      const nim_day_kh = this.$store.state.nimiq.nim_day_kh;
      if (nim_day_kh !== 0 && typeof nim_day_kh !== "undefined")
        return Number(nim_day_kh.substr(0, nim_day_kh.indexOf(" ")));
      else return 0;
    },
  },
};
</script>
