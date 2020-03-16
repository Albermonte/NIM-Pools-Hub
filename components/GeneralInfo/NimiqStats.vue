<template>
  <div>
    <material-card class="card ml-auto mr-auto" min-width="300" color="blue darken-2" title="Nimiq Stats" elevation="none">
      <v-row v-for="item in items" :key="item.index" class="text-center">
        <v-col class="ml-2" style="font-size: 1.0rem !important; color: #272727">
          {{ item.name }}:
        </v-col>
        <v-col class="pr-0" style="font-size: 1.0rem !important; color: #525252">
          {{ item.value }}
        </v-col>
      </v-row>
    </material-card>
  </div>
</template>

<script>
import materialCard from '~/components/CustomVuetify/material/AppCard'

export default {
  components: {
    materialCard
  },
  computed: {
    items () {
      return [
        { name: 'Global Hashrate', value: this.$store.state.nimiq.hashrate },
        { name: 'Blockchain Height', value: this.$store.state.nimiq.height },
        { name: 'NIM / kH / DAY', value: this.$store.state.nimiq.nim_day_kh },
        { name: '1 NIM', value: this.$store.state.nimiq.price }
      ]
    }
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 100%;
}

.card >>> .v-offset {
  max-width: 100% !important;
}
</style>
