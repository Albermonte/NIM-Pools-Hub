<template>
  <v-container fluid class="pt-7 pb-6 px-6">
    <material-table-card
      min-width="300"
      color="indigo"
      icon="mdi-format-list-bulleted-square"
      inline
      class="px-5"
    >
      <template v-slot:after-heading>
        <v-row class="mt-n4">
          <v-col>
            <div class="display-1 font-weight-light">Devices</div>
          </v-col>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              class="ml-auto"
              label="Search"
              single-line
              hide-details
              dense
              style="max-width: 250px;"
            />
          </v-col>
        </v-row>
      </template>

      <v-divider class="mt-3" />

      <v-data-table
        :headers="headers"
        :items="deviceList"
        :search.sync="search"
        :items-per-page="6"
        calculate-widths
        dense
        :sort-by="['deviceName', 'hashrate']"
        :sort-desc="[false, true]"
      />
    </material-table-card>
  </v-container>
</template>

<script>
import materialTableCard from "~/components/CustomVuetify/material/TableCard";

export default {
  components: {
    materialTableCard,
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Device Name",
        align: "left",
        sortable: true,
        value: "deviceName",
      },
      {
        text: "Device ID",
        align: "center",
        sortable: false,
        value: "deviceId",
      },
      { text: "Hashrate", value: "hashrateComplete" },
      { text: "Parsed Hashrate", value: "hashrate", sortable: false },
      { text: "Total Shares", value: "total_shares" },
    ],
  }),
  computed: {
    deviceList() {
      // eslint-disable-next-line
      return eval("this.$store.state." + this.$route.name + ".deviceList");
    },
  },
};
</script>
