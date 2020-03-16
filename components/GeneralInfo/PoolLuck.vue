<template>
  <div>
    <material-card class="card ml-auto mr-auto" min-width="300" color="blue darken-2" title="Pool Luck" elevation="none">
      <v-row class="px-4 py-1 text-center">
        <v-col>
          <div class="pb-2 mt-n2" style="color: #272727">
            Time
          </div>
          <div v-for="item in items" :key="item.index" style="color: #525252">
            {{ item.time }} h
          </div>
        </v-col>
        <v-col>
          <div class="pb-2 mt-n2" style="color: #272727">
            Luck
          </div>
          <div
            v-for="item in items"
            :key="item.index"
            :class="item.luck < 0 ? 'red--text' : 'green--text'"
          >
            {{ item.luck }}%
          </div>
        </v-col>
        <v-col>
          <div class="pb-2 mt-n2" style="color: #272727">
            Blocks
          </div>
          <div v-for="item in items" :key="item.index" style="color: #525252">
            {{ item.blocks }}
          </div>
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
  data: () => ({
    item: 1
    /* items: [
      { time: "1", luck: -10, blocks: 23 },
      { time: "2", luck: 20, blocks: 44 },
      { time: "3", luck: -12, blocks: 72 },
      { time: "6", luck: 13, blocks: 139 },
      { time: "12", luck: 14, blocks: 267 },
      { time: "24", luck: 0, blocks: 541 }
    ] */
  }),
  computed: {
    items () {
      // eslint-disable-next-line
      return eval('this.$store.state.' + this.$route.name + '.luck')
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

.red--text {
  color: #D94432 !important;
  caret-color: #D94432 !important;
}
</style>
