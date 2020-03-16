<template>
  <!-- <v-row class="pl-3" justify="space-between" style="padding-right: 9px !important;">
    <v-col :cols="$vuetify.breakpoint.xs ? 8 : 4" class="pa-0">
      <div class="d-flex justify-start align-center">
        <span class="caption pr-2 text-center" style="color: #616161">Devices List</span>
        <v-switch v-model="showDevices" hide-details dense color="green" class="switch"></v-switch>
      </div>
    </v-col>
    <v-col cols="7" class="pa-0" v-if="!$vuetify.breakpoint.xs">
      <div class="d-flex justify-end align-center">
        <span class="caption pr-2 text-center" style="color: #616161">Offline Device Notification</span>
        <v-switch v-model="checkbox" hide-details dense color="green" class="switch"></v-switch>
      </div>
    </v-col>
  </v-row> -->
  <v-row class="px-3">
    <v-col class="pa-0">
      <div class="d-flex justify-end align-center">
        <span class="caption pr-2 text-center" style="color: #616161;">Devices List</span>
        <v-switch v-model="showDevices" hide-details dense color="#41A38E" class="switch" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      checkbox: false,
      showDevices: false
    }
  },
  watch: {
    showDevices (value) {
      this.toggleShowDevices(value)
    }
  },
  mounted () {
    this.showDevices = this.$store.state.localStorage.showDevices
  },
  methods: {
    toggleShowDevices (value) {
      this.$store.commit('localStorage/toggleDevices', value)
    }
  }
}
</script>

<style scoped>
.col-4 {
  -webkit-box-flex: 0;
  flex: 0 0 35.7% !important;
  max-width: 35.7% !important;
}

.col-7 {
  -webkit-box-flex: 0;
  flex: 0 0 60% !important;
  max-width: 60% !important;
}

.switch {
  margin-top: 0 !important;
  padding-top: 0 !important;
  display: inline-block;
}
</style>
