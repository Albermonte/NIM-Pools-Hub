export const state = () => ({
  hashrate: '',
  height: '',
  nim_day_kh: '',
  price: '',
  address: ''
})

export const mutations = {
  updateInfo(state, value) {
    state.hashrate = value.hashrate
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

    const hs_length = info.hashrate.toFixed(0).toString().length
    let hashrate = 0
    if (hs_length <= 6) hashrate = Number((info.hashrate / 1e3).toFixed(3)) + ' KH/s'
    else if (hs_length > 6 && hs_length <= 9) hashrate = Number((info.hashrate / 1e6).toFixed(2)) + ' MH/s'
    else if (hs_length > 9 && hs_length <= 12) hashrate = Number((info.hashrate / 1e9).toFixed(2)) + ' GH/s'
    else if (hs_length > 12 && hs_length <= 15) hashrate = Number((info.hashrate / 1e12).toFixed(2)) + ' TH/s'
    else hashrate = Number((info.hashrate).toFixed(1)) + ' H/s'

    vuexContext.commit('updateInfo', {
      hashrate,
      height: info.height,
      nim_day_kh: info.nim_day_kh,
      price: info.price
    })
  }
}

export const getters = {
  getNimiqInfo(state) {
    return {

    }
  }
}