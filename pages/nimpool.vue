<template>
  <v-layout column justify-center align-center style="margin-left: 3vw;">
    <UserInfo v-show="showUserInfo" class="container container--fluid py-0 my-n2" />
    <GeneralInfo class="container container--fluid py-0 my-n2 pb-0" />
  </v-layout>
</template>

<script>
import UserInfo from '~/components/UserInfo'
import GeneralInfo from '~/components/GeneralInfo'

import pageTransition from "~/mixins/page-transitions.js";

export default {
  mixins: [pageTransition()],
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
      console.log('Address changed')
      this.$store.dispatch(`${this.$route.name}/CLEAR_USER_INFO`)
      this.$store.dispatch(`${this.$route.name}/UPDATE_USER_INFO`)
      this.showUserInfo = this.$store.state.localStorage.address !== '' // Hide if no address
    })
  },
  methods: {
    
  },
}
</script>
