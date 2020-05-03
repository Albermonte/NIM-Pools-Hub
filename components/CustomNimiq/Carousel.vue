<template>
  <carousel-3d
    :perspective="20"
    :space="280"
    :height="height"
    :width="width"
    :display="poolList.length"
    :border="0"
    bias="right"
    :controls-visible="true"
  >
    <slide v-for="(pool, i) in poolList" :key="i" :index="i">
      <template>
        <v-card :height="height" :width="width" outlined>
          <v-container :style="`height: ${height}px; width: ${width}px`" class="py-0">
            <v-row justify="space-between" :style="`height: ${height}px; width: ${width}px`">
              <v-col cols="3" class="pr-0" :style="`height: ${height}px;`">
                <v-img
                  class="mx-auto"
                  height="60"
                  width="60"
                  :src="`/${pool.name}.png`"
                  style="border-radius: 50px"
                ></v-img>
                <v-chip
                  v-if="pool.status === 'online'"
                  color="green darken-2"
                  class="font-weight-light"
                  outlined
                  small
                >
                  <v-icon left small>mdi-transit-connection-variant</v-icon>Online
                </v-chip>
                <v-chip
                  v-else-if="pool.status === 'offline'"
                  color="red darken-2"
                  class="font-weight-light"
                  outlined
                  small
                >
                  <v-icon left small>mdi-transit-connection-variant</v-icon>Offline
                </v-chip>
                <v-chip v-else outlined small>
                  <v-icon left small>mdi-transit-connection-variant</v-icon>Checking
                </v-chip>
                <v-btn block small rounded color="primary" :href="pool.name">
                  Go!
                </v-btn>
              </v-col>
              <v-col cols="9" class="py-2 px-0" :style="`height: ${height}px;`">
                <v-card-title class="pt-0">{{ pool.displayName}}</v-card-title>
                <v-card-subtitle class="body-2 font-weight-light pb-2">"{{ pool.slogan }}"</v-card-subtitle>
                <v-card-text style="position: fixed; bottom: 0;" :style="`width: ${extrasWidth}px`" class="pb-3 pr-2" v-html="pool.extras.join('<br>') + '<br>' + pool.message"></v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </template>
    </slide>
  </carousel-3d>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return {
      height: 190,
      width: 360,
      extrasWidth: 270,
    };
  },
  computed: {
    poolList() {
      return this.$store.state.poolList;
    }
  }
};
</script>

<style>
.carousel-3d-slide {
  background: none;
}
</style>