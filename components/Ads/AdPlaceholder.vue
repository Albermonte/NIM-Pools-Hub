<template>
  <div class="pt-11 pb-7 d-flex align-center" style="min-height: 284">
    <v-card
      v-bind="$attrs"
      :style="styles"
      width="300"
      height="250"
      v-on="$listeners"
      class="mx-auto no-ad"
    >
      <!-- <adsbygoogle
        v-if="!dev"
        data-ad-slot="1192550870"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />-->
      <!-- <ins
        class="bmadblock-5ecbb4a693ee2899f2b675f0"
        style="display:inline-block;width:300px;height:250px;"
      ></ins>-->
      <div class="coinzilla" data-zone="C-7615eca4229a5405545"></div>
    </v-card>
  </div>
</template>

<script>
import config from "~/nuxt.config";

export default {
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: "secondary",
    },
    elevation: {
      type: [Number, String],
      default: 10,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: [Number, String],
      default: 24,
    },
    title: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      dev: config.dev,
    };
  },
  computed: {
    styles() {
      if (!this.hasOffset) {
        return null;
      }

      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`,
      };
    },
  },
  mounted() {
    window.coinzilla_display = window.coinzilla_display || [];
    var c_display_preferences = {};
    c_display_preferences.zone = "7615eca4229a5405545";
    c_display_preferences.width = "300";
    c_display_preferences.height = "250";
    coinzilla_display.push(c_display_preferences);
  },
};
</script>

<style lang="scss" scoped>
.v-card--material {
  &__header {
    &.v-card {
      border-radius: 4px;
    }
  }
}

.no-ad {
  background-image: url("https://picsum.photos/300/260");
  background-repeat: no-repeat;
}
</style>

