<template>
  <v-layout>
    <v-flex class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <br />
        <NuxtLink to="/urp">Go to /URP</NuxtLink>
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async fetch({ store, params, $axios }) {
    let poolList = [...store.state.poolList];
    const in_eu = await $axios.$get(`${window.location.origin}/api/in_eu`);
    let region;
    if (in_eu) {
      region = "eu";
    } else {
      region = "us";
    }
    poolList.map(async (x, index) => {
      if (x.name === "nimpool") {
        if (region === "us") x.url = "us.nimpool.io:8444";
        const status = (
          await $axios.$get(
            `${window.location.origin}/api/isOnline/${x.name}` + region
          )
        )
          ? "online"
          : "offline";
        store.dispatch("poolList/UPDATE_POOLSTATUS", { index, status });
      } else {
        const status = (
          await $axios.$get(`${window.location.origin}/api/isOnline/${x.name}`)
        )
          ? "online"
          : "offline";
        store.dispatch("poolList/UPDATE_POOLSTATUS", { index, status });
      }
    });
  },
  fetchOnServer: false
};
</script>