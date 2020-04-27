<template>
  <v-layout style="margin-left: 3vw; height: 100%">
    <v-flex class="text-center d-flex flex-column justify-space-between align-center">
      <!-- <AdLargePlaceholder /> -->
      <v-spacer />
      <v-spacer />
      <v-card :width="$vuetify.breakpoint.xs ? 320 : 400">
        <v-card-text>
          <div class="px-4 headline text--primary">Icemining doesn't support us</div>
          <p>Sad 😢</p>
          <div class="text--primary">
            To check your statistics you have to go to their site
            <br />
            <br />You can also contact them 
            <br />asking to fix their API to help us 🙌
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="deep-purple accent-4" @click="goToPool">Go to their site</v-btn>
        </v-card-actions>
      </v-card>
      <v-spacer />
      <AdLargePlaceholder />
    </v-flex>
  </v-layout>
</template>

<script>
import AdLargePlaceholder from "~/components/Ads/AdLargePlaceholder";

export default {
  components: {
    AdLargePlaceholder
  },
  methods: {
      goToPool(){
          window.location.href = `https://icemining.ca/?address=${this.$store.state.localStorage.address}`
      }
  }
};
</script>