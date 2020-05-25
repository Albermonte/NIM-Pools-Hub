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
      <ins
        v-if="$vuetify.breakpoint.smAndDown"
        :class="placedTop ? 'bmadblock-5ecbb30693ee28580bb674bb' : 'bmadblock-5ecbb7ad93ee2861f0b6771b'"
        style="display:inline-block;width:320px;height:100px;"
      ></ins>
      <ins
        v-else
        :class="placedTop ? 'bmadblock-5ecbb43593ee287b36b675b0' : 'bmadblock-5ecbb76793ee28ae0ab676f3'"
        style="display:inline-block;width:728px;height:90px;"
      ></ins>
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
    },
    placedTop: {
      type: Boolean,
      default: true
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

