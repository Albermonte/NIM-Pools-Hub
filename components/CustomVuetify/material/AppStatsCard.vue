<template>
  <div>
    <material-card
      v-bind="$attrs"
      class="v-card--material-stats card"
      min-width="300"
      v-on="$listeners"
    >
      <v-card
        slot="offset"
        :class="`elevation-${elevation}`"
        :color="color"
        class="pa-4 d-flex justify-center align-center"
        dark
        width="75"
        height="75"
      >
        <v-icon size="40">{{ icon }}</v-icon>
      </v-card>
      <div>
        <div
          class="category grey--text font-weight-light text-right"
          :style="subTextLeft || subTextRight || checkbox || graph ? 'font-size: 18px !important;' : 'font-size: 24px !important;'"
        >
          <div class="d-flex justify-end align-center">
            <div class="mt-n1 pr-1">
              <v-btn
                v-if="typeof(currencyBtn) !== 'undefined'"
                icon
                x-small
                @click="activateUSD = !activateUSD"
              >
                <v-icon v-if="activateUSD">mdi-currency-usd-circle</v-icon>
                <v-icon v-else>mdi-currency-usd-circle-outline</v-icon>
              </v-btn>
            </div>
            <span>{{ title }}</span>
          </div>
        </div>
        <h3
          v-if="activateUSD"
          class="title font-weight-light pb-1 text-right"
          :style="subTextLeft || subTextRight || checkbox || graph ? 'font-size: 1.5625rem !important' : 'font-size: 2.25rem !important'"
          style="line-height: 1.5em !important; letter-spacing: 0 !important; color: #272727"
        >
          {{ (value * usdPrice).toFixed(2) }}
          <small>$</small>
        </h3>

        <h3
          v-else
          class="title font-weight-light pb-1 text-right"
          :style="subTextLeft || subTextRight || checkbox || graph ? 'font-size: 1.5625rem !important' : 'font-size: 2.25rem !important'"
          style="line-height: 1.5em !important; letter-spacing: 0 !important; color: #272727"
        >
          {{ value }}
          <small>{{ smallValue }}</small>
        </h3>
      </div>

      <v-divider v-show="subTextLeft || subTextRight || checkbox" class="mt-n2" />

      <template slot="actions">
        <div v-if="graph" class="graph">
          <materialChart />
        </div>
        <div v-else-if="checkbox" class="pl-2" style="width: 100%">
          <materialCheckbox />
        </div>
        <v-row v-else class="pt-3 pb-1 pl-5">
          <v-icon v-show="subIcon" :color="subIconColor" size="20" class="mr-2">{{ subIcon }}</v-icon>
          <span :class="subTextColor" class="caption font-weight-light" v-text="subTextLeft" />
          <span class="caption font-weight-light ml-auto pr-5" v-text="subTextRight" />
        </v-row>
      </template>
    </material-card>
  </div>
</template>

<script>
import materialCard from "~/components/CustomVuetify/material/AppCard";
import materialChart from "~/components/CustomVuetify/material/AppChart";
import materialCheckbox from "~/components/CustomVuetify/material/AppAlertCheckbox";

export default {
  components: {
    materialCard,
    materialChart,
    materialCheckbox,
  },
  inheritAttrs: false,
  props: {
    ...materialCard.props,
    icon: {
      type: String,
      required: true,
    },
    subIcon: {
      type: String,
      default: undefined,
    },
    subIconColor: {
      type: String,
      default: undefined,
    },
    subTextColor: {
      type: String,
      default: undefined,
    },
    subTextLeft: {
      type: String,
      default: undefined,
    },
    subTextRight: {
      type: String,
      default: undefined,
    },
    currencyBtn: {
      type: Boolean,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
    value: {
      type: Number,
      default: undefined,
    },
    smallValue: {
      type: String,
      default: undefined,
    },
    graph: {
      type: Array,
      default: undefined,
    },
    checkbox: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activateUSD: false,
    };
  },
  computed: {
    usdPrice() {
      return Number(this.$store.state.nimiq.price.slice(0, -2));
    },
  },
};
</script>

<style lang="scss">
.card {
  width: 100%;
  height: 100%;
}

.graph {
  min-width: 100%;
  position: absolute;
  bottom: -1.1px;
  right: 0;
}

.v-card--material-stats {
  display: flex;
  flex-wrap: wrap;
  position: relative;

  .v-offset {
    display: inline-block;
    flex: 0 1;
    margin-top: 0;
    margin-left: 0;
    margin-right: auto;
    margin-bottom: 0 !important;
    max-width: auto;
    padding: 0 16px 0;
  }

  .v-card {
    border-radius: 4px;
    flex: 0 1 auto;
  }

  .v-card__text {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  .v-card__actions {
    flex: 1 0 100%;
  }
}
</style>
