<template>
  <v-row class="ml-auto mr-auto pt-2 pb-1 px-3">
    <v-col class="py-0">
      <material-stats-card
        min-height="138"
        color="green"
        icon="mdi-currency-usd"
        :currencyBtn="true"
        title="Balance"
        :value="balance"
        :small-value="currency"
        :sub-text-right="'Confirmed: ' + confirmedBalance"
        :sub-text-left="'Unconfirmed: ' + unconfirmedBalance"
      />
    </v-col>
    <v-col class="py-0">
      <material-stats-card
        min-height="138"
        color="red"
        icon="mdi-devices"
        title="Device Count"
        :value="deviceCount"
        checkbox
      />
    </v-col>
    <v-col class="py-0">
      <material-stats-card
        min-height="138"
        color="orange"
        icon="mdi-speedometer"
        title="Address Hashrate"
        :value="adressHashrate"
        small-value="MH/s"
        :graph="[1,2]"
      />
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
import materialStatsCard from '~/components/CustomVuetify/material/AppStatsCard'

export default {
  components: {
    materialStatsCard
  },
  data: () => ({
    interval: '10 minutes',
    time: ['10 minutes', '30 minutes', '1 hour', '3 hours', '24 hours'],
    currency: 'NIM'
  }),
  computed: {
    balance () {
      // eslint-disable-next-line
      return eval('this.$store.state.' + this.$route.name + '.balance')
    },
    confirmedBalance () {
      // eslint-disable-next-line
      return eval(
        'this.$store.state.' + this.$route.name + '.confirmed_balance'
      )
    },
    unconfirmedBalance () {
      // eslint-disable-next-line
      return eval(
        'this.$store.state.' + this.$route.name + '.unconfirmed_balance'
      )
    },
    adressHashrate () {
      // eslint-disable-next-line
      return eval(
        'this.$store.state.' + this.$route.name + '.address_hashrate'
      )
    },
    deviceCount () {
      // eslint-disable-next-line
      return eval(
        'this.$store.state.' + this.$route.name + '.deviceList.length'
      )
    }
  },
  updated () {
    // const temp = window.localStorage.updateInterval
    window.localStorage.setItem('updateInterval', this.interval)
    /* setTimeout(() => {
      if (temp != window.localStorage.updateInterval) {
        console.log(
          `Temp value of interval: ${temp}, New value from localStorage: ${window.localStorage.updateInterval}`
        );
        window.location.reload(true); // Refresh to adecuate the interval
      }
    }, 1000); */
  },
  mounted () {
    this.interval = window.localStorage.updateInterval
  }
}
</script>
