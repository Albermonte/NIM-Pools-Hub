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
}
</script>
