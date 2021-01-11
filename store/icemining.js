export const state = () => ({
  hashrate: 0,
  hashrateComplete: 0,
  miners: 0,
  workers: 0,
  blocksMined: 0,
  pool_fee: "0",
  minimum_payout: 0,
  payout_frecuency: 0,
  balance: 0,
  minimum_payout: 0,
  payout_frecuency: 0,
  confirmed_balance: 0,
  unconfirmed_balance: 0,
  deviceList: [],
  address_hashrate: 0,
  address_hashrate_complete: 0,
  address_hashrate_array: [0],
  snackbarText: ""
});

export const mutations = {
  updateUserInfo(state, value) {
    state.balance = value.balance;
    state.confirmed_balance = value.confirmed_balance;
    state.unconfirmed_balance = value.unconfirmed_balance;
    state.deviceList = value.deviceList;
    state.address_hashrate = value.address_hashrate;
    state.address_hashrate_complete = value.address_hashrate_complete;
    state.address_hashrate_array.push(value.address_hashrate);
  },
  updatePoolInfo(state, value) {
    state.hashrate = value.hashrate;
    state.hashrateComplete = value.hashrateComplete;
    state.miners = value.miners;
    state.workers = value.workers;
    state.blocksMined = value.blocksMined;
    state.pool_fee = value.pool_fee;
    state.minimum_payout = value.minimum_payout;
    state.payout_frecuency = value.payout_frecuency;
  },
  clearUserInfo(state) {
    state.balance = 0;
    state.confirmed_balance = 0;
    state.unconfirmed_balance = 0;
    state.deviceList = [];
    state.address_hashrate = 0;
    state.address_hashrate_array = [];
  },
  userInfoError(state, value) {
    state.snackbarText = "";
    state.snackbarText = value;
  },
  poolInfoError(state, value) {
    state.snackbarText = "";
    state.snackbarText = value;
  }
};

export const actions = {
  async UPDATE_USER_INFO({ commit, rootState }) {
    const info = await this.$axios.$get(
      `${window.location.origin}/api/icemining/${rootState.localStorage.address}`
    );
    if (info === "offline") {
      console.error(
        "Icemining USER_INFO not responding ",
        new Date().toUTCString()
      );
      commit(
        "userInfoError",
        "Pool's User Stats API not working, retying in 30 seconds"
      );
      return "offline";
    } else if (info === "Not found") {
      commit("userInfoError", "User not found on this pool, try again later");
      return;
    }
    commit("updateUserInfo", info);
  },
  async UPDATE_POOL_INFO({ commit }) {
    const info = await this.$axios.$get(
      `${window.location.origin}/api/stats/icemining`
    );
    console.log(info);
    if (info === "offline") {
      console.error(
        "Icemining POOL_INFO not responding ",
        new Date().toUTCString()
      );
      commit(
        "poolInfoError",
        "Pool's General Stats API not working, retying in 40 seconds"
      );
      return "offline";
    }
    commit("updatePoolInfo", info);
    return;
  },
  CLEAR_USER_INFO({ commit }) {
    commit("clearUserInfo");
  }
};
