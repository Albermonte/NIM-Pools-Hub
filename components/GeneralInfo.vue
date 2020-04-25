<template>
  <v-row class="pb-0">
    <v-col class="py-0">
      <PoolStats />
    </v-col>
    <v-col class="py-0">
      <NimiqStats />
    </v-col>
    <v-col class="py-0 pb-0">
      <AdPlaceholder />
    </v-col>
  </v-row>
</template>

<script>
import AdPlaceholder from "~/components/Ads/AdPlaceholder";
//import PoolLuck from '~/components/GeneralInfo/PoolLuck'
import NimiqStats from "~/components/GeneralInfo/NimiqStats";
import PoolStats from "~/components/GeneralInfo/PoolStats";

export default {
  components: {
    AdPlaceholder,
    //PoolLuck,
    NimiqStats,
    PoolStats
  }
};
</script>
