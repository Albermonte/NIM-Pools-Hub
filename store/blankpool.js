export const state = () => ({
  hashrate: 0,
  miners: 0,
  workers: 0,
  pool_fee: '0',
  balance: 0,
  confirmed_balance: 0,
  unconfirmed_balance: 0,
  deviceList: [],
  address_hashrate: 0,
  address_hashrate_array: [0]
})

export const mutations = {
  updateUserInfo(state, value) {
    state.balance = value.balance
    state.confirmed_balance = value.confirmed_balance
    state.unconfirmed_balance = value.unconfirmed_balance
    state.deviceList = value.deviceList
    state.address_hashrate = value.address_hashrate
    state.address_hashrate_array = value.address_hashrate_array
  },
  updatePoolInfo(state, value) {
    state.hashrate = value.hashrate
    state.miners = value.miners
    state.workers = value.workers
    state.pool_fee = value.pool_fee
  }
}


export const actions = {
  async UPDATE_USER_INFO({ commit, rootState }) {
    const info = await this.$axios.$get(`${window.location.origin}/api/blankpool/${rootState.localStorage.address}`)
    if (info === 'offline') {
      console.error('BlankPool USER_INFO not responding ', (new Date).toUTCString())
      return 'offline'
    }

    const address_hashrate_array = []

    info.hashrate.map(x => {
      address_hashrate_array.push(x.avgHR)
    })

    commit('updateUserInfo', {
      balance: Number((info.balance / 1e5).toFixed(1)),
      confirmed_balance: Number((info.confirmed_balance / 1e5).toFixed(1)),
      unconfirmed_balance: Number((info.unconfirmed_balance / 1e5).toFixed(1)),
      deviceList: info.deviceList,
      address_hashrate: Number((info.hashrate[info.hashrate.length - 1].avgHR / 1e6).toFixed(2)),
      address_hashrate_array
    })
  },
  async UPDATE_POOL_INFO({ commit }) {
    const info = await this.$axios.$get(`${window.location.origin}/api/stats/blankpool`)
    if (info === 'offline') {
      console.error('BlankPool POOL_INFO not responding ', (new Date).toUTCString())
      return 'offline'
    }

    const hs_length = info.hashrate.toFixed(0).toString().length
    let hashrate = 0
    if (hs_length <= 6) hashrate = Number((info.hashrate / 1e3).toFixed(3)) + ' KH/s'
    else if (hs_length > 6 && hs_length <= 9) hashrate = Number((info.hashrate / 1e6).toFixed(1)) + ' MH/s'


    commit('updatePoolInfo', {
      hashrate,
      miners: info.miners,
      workers: `+${info.workers}`,
      pool_fee: info.pool_fee
    })
  }
}