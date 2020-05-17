<template>
  <v-row justify="center">
    <v-dialog v-model="open" width="75%" @click:outside="closeDialog">
      <v-card>
        <v-card-title class="justify-center pb-6">
          <span class="headline">Frequently Asked Questions</span>
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
          Happy mining.`
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
          Apart from that just choose the pool you prefer, you have some relevant data about every pool on the <a href='/'>Home</a> page.`
        },
        {
          title: "How can I check my statistics?",
          answer:
            "TODO"
        },
        {
          title: "How can I change my address?",
          answer:
            "TODO"
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