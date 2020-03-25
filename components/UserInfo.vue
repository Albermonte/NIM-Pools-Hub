<template>
  <client-only placeholder="Loading...">
    <div>
      <v-row>
        <AddressInfo />
      </v-row>
      <v-expand-transition>
        <v-row v-show="toggleDevices">
          <DeviceList />
        </v-row>
      </v-expand-transition>
    </div>
  </client-only>
</template>

<script>
import DeviceList from "~/components/UserInfo/DeviceList";
import AddressInfo from "~/components/UserInfo/AddressInfo";

export default {
  components: {
    DeviceList,
    AddressInfo
  },
  computed: {
    toggleDevices() {
      return this.$store.state.localStorage.showDevices;
    }
  }
};
</script>

<style>
</style>
