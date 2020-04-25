<template>
  <div class="pt-5 pb-7 d-flex align-center" style="min-height: 284">
    <v-card
      v-bind="$attrs"
      :style="styles"
      :width="$vuetify.breakpoint.smAndDown ? '320' : '728'"
      :height="$vuetify.breakpoint.smAndDown ? '100' : '90'"
      v-on="$listeners"
      class="mx-auto"
    >
      <img v-if="$vuetify.breakpoint.smAndDown" src="https://dummyimage.com/320x100/000000/0011ff&text=Ad+Here" />
      <img v-else src="https://dummyimage.com/728x90/000000/0011ff&text=Ad+Here" />
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

