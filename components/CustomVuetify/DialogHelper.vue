<template>
  <v-row justify="center">
    <v-dialog v-model="open" width="80%" max-width="1000px" @click:outside="closeDialog">
      <v-card>
        <v-card-title class="justify-center pb-6">
          <span class="headline text-center" style="word-break: break-word;">Frequently Asked Questions</span>
        </v-card-title>
        <v-card-text>
          <v-expansion-panels hover>
            <v-expansion-panel v-for="(question, i) in questions" :key="i">
              <v-expansion-panel-header>{{ question.title }}</v-expansion-panel-header>
              <v-expansion-panel-content class="px-6" v-html="`<p> ${question.answer} </p>`" />
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="grey darken-4" text @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      questions: [
        {
          title: "How to start mining?",
          answer: `There's a tutorial on this web specialy crafted to be simple and let everyone mine in a few clicks, you just need to go to <a href='/setupMiner'>SETUP MINER</a> and follow the steps.
          <br>
          <br>
          Happy mining.
          `
        },
        {
          title: "What pool should I choose?",
          answer: `There are some important factors to consider when choosing a pool.
          <br>
          <br>
          • If you are going to mine for a few hours only you should go for a pool with high hashrate to have consistent payouts.
          <br>
          <br>
          • If you are going to mine for days without interruption you should go for the pool with the lowest fee, since you will mine fewer blocks but the reward will be higher and the less the fee the higher the payout.
          <br>
          <br>
          Apart from that just choose the pool you prefer, you have some relevant data about every pool on the <a href='/'>Home</a> page.
          `
        },
        {
          title: "How can I check my statistics?",
          answer: `If you are mining on a pool supported by us just search it on the <a href="/">Home</a> page and click the <kbd>Go!</kbd> button, it will rediret you to the dashboard specific to that pool.
            <br>
            <br>
            <span class="caption">If you have just started minig wait some minutes begore checking since the data can take some time to reach the pool.</span>
            `
        },
        {
          title: "How can I setup my address?",
          answer: "Go to any pool's dashboard and fill the input with your address, it will be automatically saved for the next time you come back."
        },
        {
          title: "How can I change my address?",
          answer: `Simple, go to any pool's dashboard and check the rigth top.
            <br>
            <br>
            Do you see the wallet icon? <svg class="mt-n12" style="width:24px;height:24px; margin-bottom: -7px !important;" viewBox="0 0 24 24"><path fill="currentColor" d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z" /></svg>
            <br>
            <br>
            Click on it or just hover over it, it will display an input with your current address. Now change it
            `
        },
        {
          title: "Do you need more help?",
          answer:
            "Go to our <a href='https://discord.gg/4YHc7kd'>Discord</a> and ask there."
        }
      ]
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    }
  }
};
</script>

<style>
</style>