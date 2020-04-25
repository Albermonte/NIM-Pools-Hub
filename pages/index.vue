<template>
  <v-layout style="margin-left: 3vw; height: 100%">
    <v-flex class="text-center d-flex flex-column justify-space-between align-center">
      <AdLargePlaceholder />
      <blockquote class="blockquote">
        &#8220;One place for all Nimiq's Pools.&#8221;
        <br />
        <NuxtLink to="/">Coming Soon</NuxtLink>
        <footer>
          <small>
            <em>&mdash; Albermonte</em>
          </small>
        </footer>
      </blockquote>
      <AdLargePlaceholder />
    </v-flex>
  </v-layout>
</template>

<script>
import AdLargePlaceholder from "~/components/Ads/AdLargePlaceholder";

export default {
  components: {
    AdLargePlaceholder
  }
};
</script>