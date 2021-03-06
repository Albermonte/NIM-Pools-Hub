<template>
  <div class="px-12 mx-12">
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
              <v-btn
                text
                class="mr-auto mt-2"
                color="grey darken-4"
                @click="chooseWizard"
              >Back to Miner selection</v-btn>
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
            <p class="pb-4 text-center" v-html="text" />

            <v-item-group
              v-model="selectedGPU"
              class="mx-auto d-flex justify-space-between"
              style="width: 300px"
            >
              <v-item>
                <v-chip
                  x-large
                  outlined
                  class="font-weight-regular"
                  :class="selectedGPU === 'cuda' ? 'green--text text--accent-4' : 'grey--text'"
                  style="height: 100px; width: 120px"
                  @click="selectedGPU = 'cuda'"
                >
                  <div
                    class="d-flex flex-column justify-space-around align-center"
                    style="height: 70%; width: 100%"
                  >
                    <v-icon large>mdi-expansion-card</v-icon>
                    <span>NVIDIA</span>
                  </div>
                </v-chip>
              </v-item>

              <v-item>
                <v-chip
                  x-large
                  outlined
                  class="font-weight-regular"
                  :class="selectedGPU === 'opencl' ? 'red--text text--accent-4' : 'grey--text'"
                  style="height: 100px; width: 120px"
                  @click="selectedGPU = 'opencl'"
                >
                  <div
                    class="d-flex flex-column justify-space-around align-center"
                    style="height: 70%; width: 100%"
                  >
                    <v-icon large>mdi-expansion-card-variant</v-icon>
                    <span>AMD</span>
                  </div>
                </v-chip>
              </v-item>
            </v-item-group>

            <div class="py-2 d-flex justify-end align-center" style="min-height: 70px">
              <v-scroll-y-reverse-transition>
                <v-btn v-if="isButtonActive" rounded text @click="page = page - 1">Back</v-btn>
              </v-scroll-y-reverse-transition>

              <v-scroll-y-reverse-transition>
                <v-btn
                  v-if="isButtonActive"
                  rounded
                  color="primary"
                  @click="selectedGPU ? buttonClick() : error('Error. Choose a GPU type')"
                >{{ buttonText }}</v-btn>
              </v-scroll-y-reverse-transition>
            </div>
          </v-stepper-content>

          <v-stepper-content step="4" class="pt-2">
            <h2 class="mt-0 pb-2 text-center">{{ title }}</h2>
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
                @click="downloadLinuxHandler()"
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
                @click="downloadWindowsHandler()"
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
                  @click="openDialog"
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
    <v-dialog v-model="dialog" persistent max-width="550">
      <v-card>
        <v-card-title class="headline">How to execute?</v-card-title>
        <v-card-text v-html="modalText"></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogFinal" persistent max-width="550">
      <v-card>
        <v-card-title class="headline">Now execute the downloaded file</v-card-title>
        <v-card-text>Once you have done it and have the miner executed wait a few minutes and then go to the dashboard and check your statistics. Happy mining.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="purple darken-1" text :href="`/${selectedPoolName}`">Go to the Dashboard</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PageHeader from "~/components/CustomNimiq/PageHeader.vue";
import PoolList from "~/components/CustomNimiq/PoolList";
import { downloadWindows, downloadLinux } from "~/components/downloadHelper";

export default {
  components: {
    PageHeader,
    PoolList,
  },
  data() {
    return {
      address: "",
      selectedPool: null,
      selectedPoolName: "",
      selectedGPU: null,
      isActive: false,
      isButtonActive: false,
      validAddress: false,
      snackbar: false,
      snackbarText: "",
      timeout: 3000,
      dialog: false,
      dialogFinal: false,
      modalText: "",
      page: 1,
      maxPage: 4,
      content: [
        {
          title: "First, enter you Address",
          text:
            "This is the address where all the pool's payments will go<br>Make sure it's an address you own",
          button: "Let's Choose a Pool",
        },
        {
          title: "Now Choose a Pool",
          text:
            "Here's the list of pools supported by NIM POOLS HUB, click one to select it:",
          button: "Let's MINE!",
        },
        {
          title: "What GPU do you have?",
          text: "If you don't know, choose AMD",
          button: "Got it!",
        },
        {
          title: "All Ready to Start Mining",
          text: "",
          button: "Finished!",
        },
      ],
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
    },
  },
  mounted() {
    this.$root.$on("poolURL", ({ url, name }) => {
      this.selectedPool = url;
      this.selectedPoolName = name;
    });
    if (typeof this.$store.state.localStorage.address !== "undefined")
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
      .map((c) => {
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
      this.address = this.$store.state.localStorage.address
        .replace(/(.{4})/g, "$1 ")
        .slice(0, -1);
    } else if (this.address.replace(/ /g, "").length >= 36) {
      this.snackbarText = "Double check your address, it might be wrong";
      this.snackbar = true;
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
    downloadLinuxHandler() {
      this.modalText =
        "Open a terminal on the directory where <kbd>NIM_MinerSetup.sh</kbd> is located and run:<br><br> <code>chmod +x NIM_MinerSetup.sh</code>";
      this.dialog = true;
      downloadLinux(this.selectedGPU, this.address, this.selectedPool);
    },
    downloadWindowsHandler() {
      this.modalText =
        "Doble click on <kbd>NIM_MinerSetup.bat</kbd><br><br>If a warning message is prompted, click on <code>More information</code> and next, click on <code>Execute anyway</code>";
      this.dialog = true;
      downloadWindows(this.selectedGPU, this.address, this.selectedPool);
    },
    openDialog() {
      this.dialogFinal = true;
    },
    chooseWizard() {
      this.$emit("chooseWizard", false);
    },
  },
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
