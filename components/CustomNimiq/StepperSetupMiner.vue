<template>
  <div>
    <v-lazy v-model="isActive" transition="fade-transition">
      <v-stepper v-model="page">
        <v-stepper-header>
          <PageHeader class="px-4 pt-2" progress-indicator :number-steps="maxPage" :step="page" />
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" class="pt-2">
            <h2 class="mt-0 pb-2 text-center">{{ title }}</h2>
            <!-- eslint-disable-next-line -->
            <p class="pb-4 text-center" v-html="text" />

            <v-text-field
              v-model="address"
              clearable
              clear-icon="mdi-close"
              flat
              dense
              background-color="#ffffff"
              solo
              outlined
              rounded
              hide-details
              label="Enter here your address"
              @click:clear="clearAddress"
            />
            <div class="py-2 d-flex justify-end align-center" style="min-height: 70px">
              <v-scroll-y-reverse-transition>
                <v-btn
                  v-if="isButtonActive"
                  rounded
                  color="primary"
                  @click="validAddress ? buttonClick() : error('Error. Wrong Address')"
                >{{ buttonText }}</v-btn>
              </v-scroll-y-reverse-transition>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2" class="pt-2">
            <h2 class="mt-0 pb-2 text-center">{{ title }}</h2>
            <!-- eslint-disable-next-line -->
            <p class="pb-4 text-center" v-html="text" />

            <PoolList />

            <div class="py-2 d-flex justify-end align-center" style="min-height: 70px">
              <v-scroll-y-reverse-transition>
                <v-btn v-if="isButtonActive" rounded text @click="page = page - 1">Back</v-btn>
              </v-scroll-y-reverse-transition>

              <v-scroll-y-reverse-transition>
                <v-btn
                  v-if="isButtonActive"
                  rounded
                  color="primary"
                  @click="selectedPool ? buttonClick() : error('Error. Choose a Pool')"
                >{{ buttonText }}</v-btn>
              </v-scroll-y-reverse-transition>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3" class="pt-2">
            <h2 class="mt-0 pb-2 text-center">{{ title }}</h2>
            <!-- eslint-disable-next-line -->
            <p class="pb-4 text-center">
              <span class="font-weight-bold">Pool:</span>
              {{selectedPool}}
              <br />
              <span class="font-weight-bold">Your address:</span>
              {{address}}
              <br />
              <br />Download and execute this file to auto-configure your miner:
            </p>

            <div class="mx-auto d-flex justify-space-between" style="width: 300px">
              <v-chip
                x-large
                outlined
                class="font-weight-regular"
                style="height: 100px; width: 120px"
                @click="downloadLinux()"
              >
                <div
                  class="d-flex flex-column justify-space-around align-center"
                  style="height: 70%; width: 100%"
                >
                  <v-icon large>mdi-linux</v-icon>
                  <span>Linux</span>
                </div>
              </v-chip>
              <v-chip
                x-large
                outlined
                class="font-weight-regular"
                style="height: 100px; width: 120px"
                @click="downloadWindows()"
              >
                <div
                  class="d-flex flex-column justify-space-around align-center"
                  style="height: 70%; width: 100%"
                >
                  <v-icon large>mdi-microsoft-windows</v-icon>
                  <span>Windows</span>
                </div>
              </v-chip>
            </div>

            <div class="py-2 d-flex justify-end align-center" style="min-height: 70px">
              <v-scroll-y-reverse-transition>
                <v-btn v-if="isButtonActive" rounded text @click="page = page - 1">Back</v-btn>
              </v-scroll-y-reverse-transition>

              <v-scroll-y-reverse-transition>
                <v-btn
                  v-if="isButtonActive"
                  rounded
                  color="primary"
                  @click="buttonClick"
                >{{ buttonText }}</v-btn>
              </v-scroll-y-reverse-transition>
            </div>
          </v-stepper-content>

          <v-stepper-content step="4" class="pt-2">
            <h2 class="mt-0 pb-2 text-center">{{ title }}</h2>
            <!-- eslint-disable-next-line -->
            <p class="pb-4 text-center" v-html="text" />

            <div class="py-2 d-flex justify-end align-center" style="min-height: 70px">
              <v-scroll-y-reverse-transition>
                <v-btn v-if="isButtonActive" rounded text @click="page = page - 1">Back</v-btn>
              </v-scroll-y-reverse-transition>

              <v-scroll-y-reverse-transition>
                <v-btn
                  v-if="isButtonActive"
                  rounded
                  color="primary"
                  @click="buttonClick"
                >{{ buttonText }}</v-btn>
              </v-scroll-y-reverse-transition>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-lazy>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="red darken-3"
      class="text-uppercase font-weight-medium"
    >
      {{ snackbarText }}
      <v-btn color="grey lighten-3" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import PageHeader from "./PageHeader.vue";
import PoolList from "~/components/CustomNimiq/PoolList";
import { download } from "~/components/downloadHelper";

export default {
  components: {
    PageHeader,
    PoolList
  },
  data() {
    return {
      address: "",
      selectedPool: null,
      isActive: false,
      isButtonActive: false,
      validAddress: false,
      snackbar: false,
      snackbarText: "",
      timeout: 3000,
      page: 3,
      maxPage: 4,
      content: [
        {
          title: "First, enter you Address",
          text:
            "This is the address where all the pool's payments will go<br>Make sure it's an address you own",
          button: "Let's Choose a Pool"
        },
        {
          title: "Now Choose a Pool",
          text:
            "Here's the list of pools supported by NIM POOLS HUB, click one to select it:",
          button: "Let's MINE!"
        },
        {
          title: "All Ready to Start Mining",
          text: ``,
          button: "Got it!"
        },
        {
          title: "Old and new Accounts",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique, tortor ut vehicula tincidunt, turpis lacus aliquet arcu, vel consequat nisi odio vitae velit. Nam auctor tempor tincidunt. Proin rutrum, lacus sit amet rhoncus rutrum, justo nunc dapibus dolor, vitae commodo odio mi sit amet sem. Integer pellentesque augue urna, at fringilla nisi sollicitudin sed. Ut mollis leo non velit fermentum, eget varius dui lacinia. Donec id felis pellentesque, malesuada felis at, fermentum dui. In molestie justo quis enim aliquam, vel commodo odio varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In nec dapibus mauris, sed placerat justo. Nunc non consequat urna. Duis consequat ante sed porta sodales.",
          button: "Got it!"
        }
      ]
    };
  },
  computed: {
    title() {
      return this.content[this.page - 1].title;
    },
    text() {
      return this.content[this.page - 1].text;
    },
    buttonText() {
      return this.content[this.page - 1].button;
    }
  },
  mounted() {
    this.$root.$on("poolURL", url => (this.selectedPool = url));
    this.address = this.$store.state.localStorage.address.replace(
      /(.{4})/g,
      "$1 "
    );
    this.isActive = true;
    setTimeout(() => (this.isButtonActive = true), 500);
  },
  updated() {
    if (this.address === null) return;
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
      this.validAddress = true;
      this.$store.commit(
        "localStorage/updateAddress",
        this.address.replace(/ /g, "")
      );
      if (this.address.length <= 43) {
        this.address = this.$store.state.localStorage.address.replace(
          /(.{4})/g,
          "$1 "
        );
      }
    } else {
      this.validAddress = false;
    }
  },
  methods: {
    reset() {
      this.page = 1;
    },
    buttonClick() {
      this.isButtonActive = false;
      setTimeout(() => {
        if (this.page === this.maxPage) {
        } else {
          this.page += 1;
        }
      }, 100);
      setTimeout(() => (this.isButtonActive = true), 500);
    },
    clearAddress() {
      this.$store.commit("localStorage/updateAddress", "");
    },
    error(message) {
      this.snackbarText = message;
      this.snackbar = true;
    },
    downloadLinux() {
      alert("Soon");
    },
    downloadWindows() {
      download();
    }
  }
};
</script>

<style scoped>
.v-stepper__header {
  height: 40px;
  -webkit-box-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  box-shadow: none;
}

.v-chip >>> .v-chip__content {
  width: 100%;
}
</style>
