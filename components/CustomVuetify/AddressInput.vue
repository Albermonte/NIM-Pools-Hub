<template>
  <div class="d-flex justify-center align-center" style="min-height: 200px;">
    <v-text-field
      v-model="address"
      clearable
      clear-icon="mdi-close"
      flat
      dense
      solo-inverted
      background-color="grey lighten-2"
      color="#0071C3"
      dark
      hide-details
      append-icon="mdi-wallet"
      label="Enter your address or double click here to open the Hub"
      class="label input"
      @click:clear="clearAddress"
      :style="$vuetify.breakpoint.xs ? 'width: 83vw;' : 'width: 500px;'"
      @focus="inputFocused = true"
      @blur="inputFocused = false"
      @mousedown="openHub"
      @input="inputText"
    />
  </div>
</template>


<script>
import HubApi from "@nimiq/hub-api";

export default {
  data: () => ({
    address: "",
    inputFocused: false,
    hubOpened: false,
    textInputed: false
  }),
  methods: {
    clearAddress() {
      this.$store.commit("localStorage/updateAddress", "");
    },
    async openHub() {
      console.log(
        `inputFocused: ${this.inputFocused}, hubOpened: ${this.hubOpened}, textInputed: ${this.textInputed}`
      );
      if (!this.inputFocused || this.hubOpened || this.textInputed) return;
      this.hubOpened = true;
      setTimeout(() => {
        this.hubOpened = false;
      }, 100);

      const hubApi = new HubApi("https://hub.nimiq.com");
      const options = {
        appName: "NIM Pools Hub"
      };

      try {
        const addressInfo = await hubApi.chooseAddress(options);
        this.address = addressInfo.address;
      } catch (e) {
        if (e === "Connection was closed") this.inputFocused = false;
        else this.inputFocused = true;
      }
    },
    inputText(e) {
      if (e) this.textInputed = e.length > 0;
      else this.textInputed = false;
    }
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
      this.$root.$emit("updateFromAddressInput", this.address);
      this.address = this.$store.state.localStorage.address
        .replace(/(.{4})/g, "$1 ")
        .slice(0, -1);
    } else if (this.address.replace(/ /g, "").length >= 36) {
      this.snackbar = true;
    }
  }
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
</style>