<template>
  <v-layout column justify-center align-center style="margin-left: 3vw;">
    <UserInfo v-show="showUserInfo" class="container container--fluid py-0 my-n2" />
    <GeneralInfo class="container container--fluid py-0 my-n2 pb-0" />
  </v-layout>
</template>

<script>
import UserInfo from '~/components/UserInfo'
import GeneralInfo from '~/components/GeneralInfo'

export default {
  components: {
    UserInfo,
    GeneralInfo
  },
  data: () => ({
    showUserInfo: false
  }),
  mounted () {
    // If there's an address stored show the user info
    this.showUserInfo = this.$store.state.localStorage.address !== ''

    // Watch until an address is stored to get statistics
    this.$store.watch(this.$store.getters['localStorage/getAddress'], () => {
      this.getAddressStatistics()
      this.getAddressDevices()
      this.showUserInfo = this.$store.state.localStorage.address !== '' // Hide if no address
    })
  },
  methods: {
    
  },
  async fetch({ store, params, $axios }) {
    let poolList = [...store.state.poolList];
    const in_eu = await $axios.$get(`${window.location.origin}/api/in_eu`);
    let region;
    if (in_eu) {
      region = "eu";
    } else {
      region = "us";
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
        store.dispatch("poolList/UPDATE_POOLSTATUS", { index, status });
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
