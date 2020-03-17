<template>
  <v-app style="background-color: #fafafa">
    <div :class="[$vuetify.breakpoint.xs ? 'navbar-mobile' : 'navbar', show ? 'stay-on-top' : '']" :style="[$vuetify.breakpoint.xs && (show || sidebarOpen) ? 'width: 100%' : 'width: 0', sidebarOpen ? 'width: 100%' : 'width: 35px']">
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
      style="top: 50%; margin-left: -48px;"
      :style="show ? 'z-index: 1': 'z-index:10'"
      color="pink"
      dark
      fab
      fixed
      left
      @click="show = true"
    >
      <v-icon class="ml-6">mdi-chevron-right</v-icon>
    </v-btn>

    <v-app-bar clipped-left app color="blue darken-3" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span>NIM POOLS HUB</span>
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
      <v-container class="fill-height pb-0" fluid style="background-color: #fafafa">
        <v-row align="center" justify="center" class="pb-0">
          <nuxt />
        </v-row>
      </v-container>
    </v-content>
    <v-btn bottom color="pink" dark fab fixed right nuxt href="/setupMiner" @click="testData">
      <v-icon>mdi-help</v-icon>
    </v-btn>
    <v-overlay opacity="1" :value="overlay" color="#260133" style="z-index: 100">
      <!-- <v-progress-circular indeterminate size="64"></v-progress-circular> -->
      <Loading />
    </v-overlay>
  </v-app>
</template>

<script>
import Loading from "~/components/Loading/Loading";

export default {
  components: {
    Loading
  },
  data: () => ({
    address: "",
    overlay: true,
    dialog: false,
    mini: true,
    show: null,
    sidebarOpen: false,
    poolList: [
      {
        icon: "/nimpool.png",
        name: "nimpool",
        displayName: "NimPool",
        message: "Preferred",
        status: "",
        extras: [" Pool fee: 1%", "Non-profit"]
      },
      {
        icon: "/icemining.png",
        name: "icemining",
        displayName: "Icemining",
        message: "YIIMP based",
        status: "",
        extras: ["Pool fee: 1.25%", "Greatest Support"]
      },
      {
        icon: "/siriuspool.png",
        name: "siriuspool",
        displayName: "SiriusPool",
        message: "Low Hashrate",
        status: "",
        extras: ["Pool fee: 1%", "Greek Pool"]
      },
      {
        icon: "/skypool.png",
        name: "skypool",
        displayName: "Skypool",
        message: "China based",
        status: "",
        extras: ["Pool fee: ~1%", "Not using official protocol"]
      },
      {
        icon: "/urp.png",
        name: "urp",
        displayName: "URP Best",
        message: "Lowest Fees",
        status: "",
        extras: [" Pool fee: 0.5%"]
      }
    ]
  }),
  beforeMount() {
    this.overlay = this.$route.name !== "index";
  },
  mounted() {
    this.address = this.$store.state.localStorage.address.replace(
      /(.{4})/g,
      "$1 "
    );

    const loading = setInterval(() => {
      if (
        typeof this.$store.state.urp.confirmed_balance !== "undefined" &&
        this.overlay
      ) {
        clearInterval(loading);
        setTimeout(() => {
          this.overlay = false;
        }, 1800);
      }
    }, 1000);
  },
  updated() {
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
      this.address = this.$store.state.localStorage.address.replace(
        /(.{4})/g,
        "$1 "
      );
    }
  },
  methods: {
    clearAddress() {
      this.$store.commit("localStorage/updateAddress", "");
    },
    testData() {
      this.address = "NQ47 TD6C UT1K X35M DLVC N7QN YK5N FXNY SP5N";
    },
    mouseover() {
      this.sidebarOpen = true;
    },
    mouseleave() {
      this.sidebarOpen = false;
    }
  }
};
</script>

<style scoped>
.navbar {
  height: calc(100vh - 64px);
  margin-top: 64px;
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
}

.navbar-mobile {
  height: calc(100vh - 56px);
  margin-top: 56px;
  position: absolute;
  z-index: 0;
  display: flex;
  align-items: center;
}

.stay-on-top{
  z-index: 10 !important;
}
</style>
