<template>
  <div class="pt-3 pb-4 d-flex align-center" style="min-height: 284;">
    <v-card
      v-bind="$attrs"
      :width="$vuetify.breakpoint.smAndDown ? '320' : '728'"
      :height="$vuetify.breakpoint.smAndDown ? '100' : '90'"
      v-on="$listeners"
      class="mx-auto"
      :class="$vuetify.breakpoint.smAndDow ? 'no-ad-sm' : 'no-ad'"
    >
      <!-- <adsbygoogle
        v-if="!dev"
        data-ad-slot="8810901032"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />-->
      <!-- <ins
        v-if="$vuetify.breakpoint.smAndDown"
        class="bmadblock-5ecbb30693ee28580bb674bb"
        style="display:inline-block;width:320px;height:100px;"
      ></ins>-->
      <!-- <ins
        v-else
        class="bmadblock-5ecbb43593ee287b36b675b0"
        style="display:inline-block;width:728px;height:90px;"
      ></ins>-->
      <div class="coinzilla" data-zone="C-8375eca4229a60ea729"></div>
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
    placedTop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dev: config.dev,
    };
  },
  computed: {
    styles() {
      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`,
      };
    },
  },
  mounted() {
    window.coinzilla_display = window.coinzilla_display || [];
    var c_display_preferences = {};
    c_display_preferences.zone = "8375eca4229a60ea729";
    c_display_preferences.width = this.$vuetify.breakpoint.smAndDown
      ? "320"
      : "728";
    c_display_preferences.height = this.$vuetify.breakpoint.smAndDown
      ? "100"
      : "90";
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
  background: url("https://picsum.photos/728/100");
}
.no-ad-sm {
  background: url("https://picsum.photos/320/110/");
}
</style>

