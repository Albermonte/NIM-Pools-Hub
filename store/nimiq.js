export const state = () => ({
  hashrate: '',
  top_hashrate: '',
  hashrateComplete: 0,
  top_hashrateComplete: 0,
  height: '',
  nim_day_kh: '',
  price: '',
  address: ''
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
  },
  updateAddress(state, value) {
    state.address = value
  }
}

export const actions = {
  async UPDATE_NIMIQ_INFO(vuexContext, context) {
    const info = await this.$axios.$get(`${window.location.origin}/api/stats/nimiq`)
    if (info === 'offline') {
      console.error('NimiqX API not responding ', (new Date).toUTCString())
      return 'offline'
    }

    vuexContext.commit('updateInfo', info)
  }
}

export const getters = {
  getNimiqInfo(state) {
    return {

    }
  }
}