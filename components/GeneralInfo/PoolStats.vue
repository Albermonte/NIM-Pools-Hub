<template>
  <div>
    <material-card
      class="card ml-auto mr-auto"
      min-width="300"
      color="blue darken-2"
      title="Pool Stats"
      elevation="none"
    >
      <v-row v-for="item in items" :key="item.index" class="text-center">
        <v-col
          class="ml-2"
          style="font-size: 1.0rem !important; color: #272727"
          align-self="center"
        >{{ item.name }}:</v-col>
        <v-col
          class="pr-0"
          style="font-size: 1.0rem !important; color: #525252"
          align-self="center"
        >{{ item.value }}</v-col>
      </v-row>
    </material-card>
  </div>
</template>

<script>
import materialCard from "~/components/CustomVuetify/material/AppCard";

export default {
  components: {
    materialCard
  },
  computed: {
    items() {
      /* eslint-disable */
      if (eval("this.$store.state." + this.$route.name + ".workers")) {
        return [
          {
            name: "Pool Hashrate",
            value: eval("this.$store.state." + this.$route.name + ".hashrate")
          },
          {
            name: "Miners",
            value: eval("this.$store.state." + this.$route.name + ".miners")
          },
          {
            name: "Workers",
            value: eval("this.$store.state." + this.$route.name + ".workers")
          },
          {
            name: "Pool fee",
            value: eval("this.$store.state." + this.$route.name + ".pool_fee")
          }
        ];
      } else {
        return [
          {
            name: "Pool Hashrate",
            value: eval("this.$store.state." + this.$route.name + ".hashrate")
          },
          {
            name: "Miners",
            value: eval("this.$store.state." + this.$route.name + ".miners")
          },
          {
            name: "Blocks Mined",
            value: eval("this.$store.state." + this.$route.name + ".blocksMined")
          },
          {
            name: "Pool fee",
            value: eval("this.$store.state." + this.$route.name + ".pool_fee")
          }
        ];
      }
    }
  }
};
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
