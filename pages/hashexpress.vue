<template>
  <v-layout column justify-center align-center style="margin-left: 3vw;">
    <v-scroll-y-transition leave-absolute>
      <UserInfo v-if="showUserInfo" class="container container--fluid py-0 my-n2" />
      <AddressInput v-else />
    </v-scroll-y-transition>
    <GeneralInfo class="container container--fluid py-0 my-n2 pb-0" />
  </v-layout>
</template>

<script>
import UserInfo from "~/components/UserInfo";
import GeneralInfo from "~/components/GeneralInfo";
import AddressInput from "~/components/CustomVuetify/AddressInput";

import pageTransition from "~/mixins/page-transitions.js";

export default {
  mixins: [pageTransition()],
  components: {
    UserInfo,
    GeneralInfo,
    AddressInput,
  },
  data: () => ({
    showUserInfo: false,
  }),
  mounted() {
    // If there's an address stored show the user info
    this.showUserInfo = this.$store.state.localStorage.address !== "";

    // Watch until an address is stored to get statistics
    this.$store.watch(this.$store.getters["localStorage/getAddress"], () => {
      console.log("Address changed");
      this.$store.dispatch(`${this.$route.name}/UPDATE_USER_INFO`);
      this.$store.dispatch("nimiq/UPDATE_NIMIQ_INFO");
      this.showUserInfo = this.$store.state.localStorage.address !== ""; // Hide if no address
    });
  },
  methods: {},
};
</script>
