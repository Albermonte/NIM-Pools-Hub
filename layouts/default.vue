<template>
  <v-app style="background-color: #fafafa">
    <div
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
                  link
                  style="max-height: 60px; margin: 10px 15px 8px !important; width: 88%;"
                  :href="`/${pool.name}`"
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

    <v-app-bar clipped-left app color="blue darken-3" dark elevate-on-scroll style="z-index:15">
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <nuxt-link to="/" class="white--text text-uppercase">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div v-on="on" class="d-flex align-center">
                <v-avatar size="44">
                  <img src="/nimpoolshub.png" alt="Logo" />
                </v-avatar>
                <span class="pl-2">{{ pageName || heading }}</span>
              </div>
            </template>
            <span
              class="white--text text-center"
            >{{ $route.name === 'index' ? 'You are already on the HOME page ;D' : 'Go to the HOME page' }}</span>
          </v-tooltip>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="address"
        clearable
        clear-icon="mdi-close"
        flat
        dense
        solo-inverted
        color="grey darken-4"
        background-color="blue accent-2"
        hide-details
        append-icon="mdi-magnify"
        label="Enter here your address"
        @click:clear="clearAddress"
      />
    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height pb-0 pr-0"
        :class="[$vuetify.breakpoint.xs ? 'pl-3' : 'pl-11 ml-1', $vuetify.breakpoint.sm || $vuetify.breakpoint.md ? 'pl-12 ml-2' : null ]"
        fluid
        style="background-color: #fafafa"
      >
        <v-row align="center" justify="center" class="pb-0" style="height: 100%">
          <nuxt />
        </v-row>
      </v-container>
    </v-content>
    <v-layout row class="fab-container pb-4 pr-6" style="z-index: 25;">
      <v-btn small fab href="https://discord.gg/4YHc7kd" class="my-auto mx-2">
        <v-icon color="#7289da">mdi-discord</v-icon>
      </v-btn>
      <v-btn fab dark color="pink" nuxt href="/setupMiner" @click="testData" class="my-auto mx-1">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-layout>
    <v-snackbar v-model="snackbar" color="red darken-3" class="text-uppercase font-weight-medium">
      {{ snackbarText || 'Double check your address, it might be wrong' }}
      <v-btn color="grey lighten-3" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import config from "~/nuxt.config";

export default {
  data: () => ({
    address: "",
    pageName: "",
    mini: true,
    show: null,
    sidebarOpen: false,
    heading: config.head.title,
    snackbar: false
  }),
  computed: {
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      window.addEventListener("load", function() {
        this.$nuxt.$loading.finish();
      });
    });

    this.address = this.$store.state.localStorage.address.replace(
      /(.{4})/g,
      "$1 "
    );
  },
  updated() {
    let poolList = [...this.$store.state.poolList];
    poolList.map(x => {
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
    }
  },
  middleware: "updateInfo"
};
</script>

<style scoped>
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
</style>
