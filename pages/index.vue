<template>
  <v-layout style="margin-left: 3vw;">
    <v-flex class="text-center d-flex justify-space-around align-center">
      <AdPlaceholder />
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
      <AdPlaceholder />
    </v-flex>
  </v-layout>
</template>

<script>
import AdPlaceholder from "~/components/AdPlaceholder";

export default {
  components: {
    AdPlaceholder
  }
};
</script>