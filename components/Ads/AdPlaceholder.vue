<template>
  <div class="pt-11 pb-7 d-flex align-center" style="min-height: 284">
    <v-card
      v-bind="$attrs"
      :style="styles"
      width="300"
      height="250"
      v-on="$listeners"
      class="mx-auto"
    >
      <img src="https://dummyimage.com/300x250/000000/0011ff&text=Ad+Here" />
      <!-- <div class="xc449bad4854773ff" data-zone="184f4142761b42faba0e717b3066f4b9" style="width:300px;height:250px;display: inline-block;margin: 0 auto"></div> -->
    </v-card>
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: "secondary"
    },
    elevation: {
      type: [Number, String],
      default: 10
    },
    inline: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    offset: {
      type: [Number, String],
      default: 24
    },
    title: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    }
  },
  computed: {
    styles() {
      if (!this.hasOffset) {
        return null;
      }

      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`
      };
    }
  }
};
</script>

<style lang="scss">
.v-card--material {
  &__header {
    &.v-card {
      border-radius: 4px;
    }
  }
}
</style>

