<template>
  <v-app style="background-color: #fafafa">
    <div
      v-if="$route.name !== 'index'"
      :class="[$vuetify.breakpoint.xs ? 'navbar-mobile' : 'navbar', show ? 'stay-on-top' : '']"
      :style="[$vuetify.breakpoint.xs && (show || sidebarOpen) ? 'width: 100%' : 'width: 0', sidebarOpen ? 'width: 100%' : 'width: 35px']"
    >
      <v-card flat style="border-radius: 0 8px 8px 0;">
        <v-navigation-drawer
          v-model="show"
          clipped
          :expand-on-hover="!$vuetify.breakpoint.xs"
          :permanent="!$vuetify.breakpoint.xs"
          disable-resize-watcher
          disable-route-watcher
          mini-variant-width="65"
          height
          class="py-5"
        >
          <div @mouseover="mouseover" @mouseleave="mouseleave">
            <v-list
              nav
              class="d-flex flex-column justify-center"
              :class="[!sidebarOpen && !$vuetify.breakpoint.xs ? 'align-center' : 'align-start', $vuetify.breakpoint.xs ? 'align-start' : '']"
            >
              <template v-for="pool in poolList">
                <v-list-item
                  :key="pool.displayName"
                  nuxt
                  style="max-height: 60px; margin: 10px 15px 8px !important; width: 88%;"
                  :to="`${pool.name}`"
                  :disabled="!(pool.status === 'online')"
                >
                  <v-list-item-action>
                    <img
                      :src="pool.icon"
                      alt="avatar"
                      style="width: 35px; height: 35px; margin-right: 5px; border-radius: 50px"
                    />
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ pool.displayName }}</v-list-item-title>
                    <v-list-item-subtitle
                      :class="pool.status === 'offline' ? 'red--text' : 'green--text'"
                      class="text-capitalize text--darken-2"
                    >{{ pool.status }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </div>
        </v-navigation-drawer>
      </v-card>
    </div>

    <v-btn
      v-if="$route.name !== 'index'"
      class="hidden-sm-and-up"
      style="top: 50%; margin-left: -50px;"
      :style="show ? 'z-index: 1': 'z-index:10'"
      color="pink"
      dark
      fab
      fixed
      left
      @click="show = true"
    >
      <v-icon class="ml-7">mdi-chevron-right</v-icon>
    </v-btn>

    <v-app-bar clipped-left app color="grey lighten-5" dark elevate-on-scroll style="z-index:15">
      <v-toolbar-title style="width: 100%">
        <div v-if="$route.name === 'index'" class="d-flex align-center" style="width: max-content;">
          <v-avatar :size="$vuetify.breakpoint.xs ? 35 : 44">
            <img src="/nimpoolshub.png" alt="Logo" />
          </v-avatar>
          <span
            class="pl-2 black--text font-weight-medium text-uppercase"
            :class="[$vuetify.breakpoint.xs ? 'body-2' : '',]"
          >{{ pageName || heading }}</span>
          <v-tooltip
            :disabled="$vuetify.breakpoint.xs"
            bottom
            class="white"
            color="blue-grey darken-3"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="!stateInputAddress"
                v-on="on"
                text
                color="grey darken-4"
                absolute
                right
                href="/setupMiner"
              >Setup Miner</v-btn>
            </template>
            <span class="green--text text--accent-3 text-center">Helper to setup your GPU Miner</span>
          </v-tooltip>
        </div>
        <div v-else class="d-flex align-center">
          <v-btn
            text
            color="grey darken-4"
            absolute
            class="ml-n3"
            style="min-width: 50px;"
            nuxt
            href="/"
          >
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <div
            class="d-flex justify-center"
            :class="$vuetify.breakpoint.xs ? 'ml-2' : 'ml-12 pl-8'"
            style="width: 100%"
          >
            <span
              class="black--text font-weight-medium text-uppercase"
              :style="$vuetify.breakpoint.xs ? 'font-size: 18px;' : 'font-size: 20px;'"
            >{{ pageName || heading }}</span>
            <div
              v-if="addressBalance && !$vuetify.breakpoint.xs"
              style="position: absolute; top: 12.5px; right: 55px"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <span
                      class="black--text text-uppercase font-weight-medium"
                      style="font-size: 18px;"
                    >{{addressBalance}}</span>
                    <span
                      class="black--text text-uppercase font-weight-regular"
                      style="font-size: 13px;"
                    >{{' '}}NIM</span>
                  </div>
                </template>
                <span
                  class="white--text"
                >This is your address balance, it will be updated every 15 minutes</span>
              </v-tooltip>
            </div>
          </div>
          <div style="position: absolute; right: 18px; top: 11px;">
            <v-btn
              v-if="!stateInputAddress"
              text
              color="grey darken-4"
              right
              class="mr-n4"
              style="min-width: 50px;"
              @click="showInputAddress(true)"
              @mouseover="showInputAddress(true)"
            >
              <v-icon>mdi-wallet</v-icon>
            </v-btn>
          </div>
        </div>
      </v-toolbar-title>
      <v-slide-x-reverse-transition>
        <div
          v-if="stateInputAddress"
          @mouseleave="showInputAddress(false)"
          style="position: absolute; right: 8px; top: 10px;"
        >
          <v-text-field
            v-model="address"
            clearable
            clear-icon="mdi-close"
            flat
            dense
            solo-inverted
            background-color="grey lighten-2"
            color="#0071C3"
            hide-details
            append-icon="mdi-wallet"
            label="Enter here your address"
            class="label input"
            @click:clear="clearAddress"
            :style="$vuetify.breakpoint.xs ? '' : 'width: 500px;'"
            @focus="preventInputAddressClose = true"
            @blur="preventInputAddressClose = false; showInputAddress(false)"
          />
        </div>
      </v-slide-x-reverse-transition>
    </v-app-bar>
    <v-content style="height: 100%;">
      <v-container
        class="fill-height pb-0 pr-0"
        :class="[$vuetify.breakpoint.xs ? 'ml-n2' : 'pl-11 ml-1', $vuetify.breakpoint.sm || $vuetify.breakpoint.md ? 'pl-12 ml-2' : null, $route.name === 'index' && !$vuetify.breakpoint.xs ? 'pr-12' : 'pl-6']"
        fluid
        style="background-color: #fafafa"
      >
        <v-row align="center" justify="center" class="pb-0" style="height: 100%;">
          <div v-show="splashScreenEnabled" class="splashScreen">
            <h1 class="text-uppercase text-center">Loading data...</h1>
          </div>
          <div v-show="pageTransitionEnabled" class="pageTransScreen"></div>
          <Nuxt />
        </v-row>
      </v-container>
    </v-content>
    <v-layout row class="fab-container pb-4 pr-6" style="z-index: 25;">
      <v-tooltip :disabled="$vuetify.breakpoint.xs" top class="white" color="blue-grey darken-3">
        <template v-slot:activator="{ on }">
          <v-btn small fab v-on="on" href="https://discord.gg/4YHc7kd" class="my-auto mx-2">
            <v-icon color="#7289da">mdi-discord</v-icon>
          </v-btn>
        </template>
        <span class="green--text text--accent-3 text-center">Support and report bugs</span>
      </v-tooltip>
      <v-tooltip :disabled="$vuetify.breakpoint.xs" top class="white" color="blue-grey darken-3">
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            dark
            color="pink"
            nuxt
            v-on="on"
            @click="openDialog = true"
            class="my-auto mx-1"
          >
            <v-icon>mdi-help</v-icon>
          </v-btn>
        </template>
        <span class="green--text text--accent-3 text-center">Help / Tutorial</span>
      </v-tooltip>
    </v-layout>
    <v-snackbar v-model="snackbar" color="red darken-3" class="text-uppercase font-weight-medium">
      {{ snackbarText || 'Double check your address, it might be wrong' }}
      <v-btn color="grey lighten-3" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <DialogHelper :open="openDialog" @closeDialog="openDialog = false" />
  </v-app>
</template>

<script>
import config from "~/nuxt.config";
import { store as transitionsStore } from "~/store/transitions.js";

import DialogHelper from "~/components/CustomVuetify/DialogHelper";

export default {
  components: {
    DialogHelper
  },
  data: () => ({
    address: "",
    pageName: "",
    mini: true,
    show: null,
    sidebarOpen: false,
    heading: config.head.title,
    snackbar: false,
    stateInputAddress: false,
    preventInputAddressClose: false,
    openDialog: false
  }),
  computed: {
    pageTransitionEnabled() {
      return transitionsStore.pageTransitionEnabled;
    },
    splashScreenEnabled() {
      return transitionsStore.splashScreenEnabled;
    },
    poolList() {
      return this.$store.state.poolList;
    },
    snackbarText() {
      if (this.$route.name === "index" || this.$route.name === null)
        return false;
      this.snackbar = eval(
        "this.$store.state." + this.$route.name + ".snackbarText"
      )
        ? true
        : false;
      return eval("this.$store.state." + this.$route.name + ".snackbarText");
    },
    addressBalance() {
      return this.$store.state.nimiq.balance;
    }
  },
  mounted() {
    if (this.$store.state.localStorage.address)
      this.address = this.$store.state.localStorage.address.replace(
        /(.{4})/g,
        "$1 "
      );
    this.$root.$on("updateFromAddressInput", e => {
      this.address = e;
    });
  },
  updated() {
    let poolList = [...this.$store.state.poolList];
    poolList.forEach(x => {
      if (x.name === this.$route.name) {
        this.pageName = x.displayName;
      } else if (this.$route.name === "index") {
        this.pageName = "NIM POOLS HUB";
      }
    });

    if (this.address === null) {
      return;
    }
    this.address = this.address.toUpperCase();
    let value = this.address;
    value = value.replace(/ /g, "");
    value = value.substr(4) + value.substr(0, 4);

    const num = value
      .split("")
      .map(c => {
        const code = c.toUpperCase().charCodeAt(0);
        return code >= 48 && code <= 57 ? c : (code - 55).toString();
      })
      .join("");
    let tmp = "";

    for (let i = 0; i < Math.ceil(num.length / 6); i++) {
      tmp = (parseInt(tmp + num.substr(i * 6, 6)) % 97).toString();
    }

    if (parseInt(tmp) === 1) {
      this.$store.commit(
        "localStorage/updateAddress",
        this.address.replace(/ /g, "")
      );
      this.address = this.$store.state.localStorage.address
        .replace(/(.{4})/g, "$1 ")
        .slice(0, -1);
    } else if (this.address.replace(/ /g, "").length >= 36) {
      this.snackbar = true;
    }
  },
  methods: {
    clearAddress() {
      this.$store.commit("localStorage/updateAddress", "");
    },
    testData() {
      //this.address = "NQ66 V5JX 3G2A HAEM 8LV3 8LMU YPVY BSG7 8NNJ";
    },
    mouseover() {
      this.sidebarOpen = true;
    },
    mouseleave() {
      this.sidebarOpen = false;
    },
    showInputAddress(value) {
      if (this.preventInputAddressClose) return;
      this.stateInputAddress = value;
    }
  },
  middleware: "updateInfo"
};
</script>

<style>
.v-text-field__slot .v-label {
  color: var(--nimiq-blue-darkened) !important;
}

.theme--dark.v-input input,
.theme--dark.v-input textarea {
  color: var(--nimiq-blue-darkened);
}

.navbar {
  height: calc(100vh - 64px);
  margin-top: 64px;
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
}

.navbar-mobile {
  height: calc(100vh - 56px);
  margin-top: 56px;
  position: fixed;
  z-index: 0;
  display: flex;
  align-items: center;
}

.stay-on-top {
  z-index: 10 !important;
}

.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
}

.splashScreen {
  background-color: #222;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.splashScreen h1 {
  color: #fff;
  display: block;
  transform: translateY(-300px);
  opacity: 0;
}

.pageTransScreen {
  background-color: #2e495e;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 999;
}
</style>
