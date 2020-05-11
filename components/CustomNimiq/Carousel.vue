<template>
  <!-- Height + 22px for the button -->
  <carousel-3d
    @after-slide-change="selectedCard"
    :perspective="20"
    :space="280"
    :height="height+22"
    :width="width"
    :display="poolList.length"
    :border="0"
    bias="right"
    :controls-visible="true"
  >
    <slide v-for="(pool, i) in poolList" :key="i" :index="i">
      <PoolCard :pool="pool" :height="height" :width="width" />
    </slide>
  </carousel-3d>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import PoolCard from "~/components/CustomNimiq/PoolCard";

export default {
  components: {
    Carousel3d,
    Slide,
    PoolCard
  },
  data() {
    return {
      height: 195,
      width: 360
    };
  },
  methods: {
    selectedCard(e){
      this.$emit('currentPool',e)
    }
  },
  computed: {
    poolList() {
      return this.$store.state.poolList;
    }
  }
};
</script>

<style scoped>
.carousel-3d-slide {
  background: none;
}

.v-chip.v-size--x-small {
  border-radius: 10px;
  font-size: 14px;
  height: 20px;
}

.v-list-item__title,
.v-list-item__subtitle {
  white-space: pre-line;
}
</style>