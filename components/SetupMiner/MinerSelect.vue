<template>
  <v-row justify="space-around">
    <v-card class="ml-6 d-flex flex-column justify-space-between" width="45%">
      <v-list class="pt-3">
        <v-list-item class="d-flex justify-center align-center">
          <v-list-item-avatar tile size="70">
            <v-img src="/nimpoolshubminer.png"></v-img>
          </v-list-item-avatar>
          <span class="font-weight-regular h2">NIM Pools Hub Miner</span>
        </v-list-item>
        <div class="text-center">
          <span class="font-weight-medium text-uppercase h5">Best Option for New Users</span>
        </div>
        <v-list-item class="d-felx flex-column">
          <span class="h3">Features:</span>
          <ul class="h4 font-weight-regular">
            <li>Beautiful and User Friendly UI</li>
            <li>Supports CPU and GPU</li>
            <li>Supports NVIDIA and AMD cards</li>
            <li>Pool list with Real-Time Statistics</li>
            <li>Tune the miner and test it on the fly, no need to restart the app</li>
            <li>Graph to control hashrate history</li>
            <li>Auto-Update</li>
          </ul>
        </v-list-item>
      </v-list>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          text
          color="green darken-1"
          href="https://github.com/Albermonte/NIM-Pools-Hub-Miner"
        >Webpage</v-btn>
        <v-btn
          text
          color="blue darken-1"
          href="https://github.com/Albermonte/nim-pools-hub-miner/releases/latest"
        >Download</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mr-6 d-flex flex-column justify-space-between" width="45%">
      <v-list class="pt-3">
        <v-list-item class="d-flex justify-center align-center">
          <span class="font-weight-regular h2">NQ-Miner</span>
        </v-list-item>
        <div class="text-center">
          <span class="font-weight-medium text-uppercase h5">More control for advanced users</span>
        </div>
        <v-list-item class="d-felx flex-column">
          <span class="h3">Features:</span>
          <ul class="h4 font-weight-regular">
            <li>Command Line only</li>
            <li>Supports NVIDIA and AMD cards</li>
            <li>Can be run on servers without a Graphical Interface</li>
            <li>Same hashrate as NIM Pools Hub Miner</li>
          </ul>
        </v-list-item>
      </v-list>
      <v-card-actions class="d-flex justify-center">
        <v-btn text color="teal darken-1" @click="chooseWizard">Setup Miner</v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>



<script>
export default {
  methods: {
    chooseWizard() {
      this.$emit("chooseWizard", true);
    },
  },
};
</script>

<style scoped>
.container-left {
  border-right: 1px solid #ccc;
  height: 100%;
}

.container-right {
  border-left: 1px solid #ccc;
  height: 100%;
}
</style>