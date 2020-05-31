export const state = () => ({
  hashrate: '',
  top_hashrate: '',
  hashrateComplete: 0,
  top_hashrateComplete: 0,
  height: '',
  nim_day_kh: '',
  price: '',
  balance: 0
})

export const mutations = {
  updateInfo(state, value) {
    state.hashrate = value.hashrate
    state.top_hashrate = value.top_hashrate
    state.hashrateComplete = Number(value.hashrateComplete)
    state.top_hashrateComplete = Number(value.top_hashrateComplete)
    state.height = '#' + value.height
    state.nim_day_kh = value.nim_day_kh + ' NIM/day'
    state.price = value.price + ' $'
    state.balance = value.balance
  },
  updateAddress(state, value) {
    state.address = value
  }
}

export const actions = {
  async UPDATE_NIMIQ_INFO(vuexContext, context) {
    let addressBalance = 0
    const address = vuexContext.rootGetters["localStorage/getAddress"]()
    if (address) {
      const { balance } = await this.$axios.$get(`${window.location.origin}/api/balance/${address.replace(/(.{4})/g, "$1 ").slice(0, -1)}`);
      addressBalance = balance
      if (balance !== 0) {
        let parts = addressBalance.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        addressBalance = parts.join(".");
      }
    }
    const info = await this.$axios.$get(`${window.location.origin}/api/stats/nimiq`)
    if (info === 'offline') {
      console.error('NimiqX API not responding ', (new Date).toUTCString())
      return 'offline'
    }

    vuexContext.commit('updateInfo', { ...info, balance: addressBalance })
  }
}

export const getters = {
  getNimiqInfo(state) {
    return {

    }
  }
}