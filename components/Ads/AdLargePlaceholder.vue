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
      <div
        v-if="$vuetify.breakpoint.smAndDown"
        class="xc449bad4854773ff"
        data-zone="ae3a4ace72154fcebcfbc43550d669d1"
        style="width:320px;height:100px;display: inline-block;margin: 0 auto"
      ></div>
      <div
        v-else
        class="xc449bad4854773ff"
        data-zone="596155b768cd4e339c066f94cbc84778"
        style="width:728px;height:90px;display: inline-block;margin: 0 auto"
      ></div>
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
      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`
      };
    }
  }
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

