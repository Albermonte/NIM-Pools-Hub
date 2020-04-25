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
  address_hashrate_array: [0],
  snackbarText: ''
})

export const mutations = {
  updateUserInfo(state, value) {
    state.balance = value.balance
    state.confirmed_balance = value.confirmed_balance
    state.unconfirmed_balance = value.unconfirmed_balance
    state.deviceList = value.deviceList
    state.address_hashrate = value.address_hashrate
    state.address_hashrate_array.push(value.address_hashrate)
  },
  updatePoolInfo(state, value) {
    state.hashrate = value.hashrate + ' MH/s'
    state.miners = value.miners
    state.workers = value.workers
    state.pool_fee = value.pool_fee
  },
  clearUserInfo(state){
    state.balance = 0
    state.confirmed_balance = 0
    state.unconfirmed_balance = 0
    state.deviceList = []
    state.address_hashrate = 0
    state.address_hashrate_array = []
  },
  userInfoError(state, value) {
    state.snackbarText = ''
    state.snackbarText = value
  },
  poolInfoError(state, value) {
    state.snackbarText = ''
    state.snackbarText = value
  }
}


export const actions = {
  async UPDATE_USER_INFO({ commit, rootState }) {
    const info = await this.$axios.$get(`${window.location.origin}/api/nimpool/${rootState.localStorage.address}`)
    if (info === 'offline') {
      console.error('Nimpool USER INFO not responding ', (new Date).toUTCString())
      commit('userInfoError', 'Pool\'s User Stats API not working, retying in 30 seconds')
      return 'offline'
    }

    const deviceList = []
    if (info.deviceList)
      info.deviceList.map(x => {
        deviceList.push({
          deviceName: x.device_id,
          deviceId: x.device_id,
          hashrate: (x.hashes_per_second / 1e3).toFixed(2) + ' kH/s',
          total_shares: x.shares
        })
      })

    commit('updateUserInfo', {
      balance: Number((info.balance / 1e5).toFixed(1)),
      confirmed_balance: Number((info.confirmed_balance / 1e5).toFixed(1)),
      unconfirmed_balance: Number((info.unconfirmed_balance / 1e5).toFixed(1)),
      deviceList,
      address_hashrate: Number((info.hashrate / 1e6).toFixed(2)),
    })
  },
  async UPDATE_POOL_INFO({ commit }) {
    const info = await this.$axios.$get(`${window.location.origin}/api/stats/nimpool`)
    if (info === 'offline') {
      console.error('Nimpool POOL INFO not responding ', (new Date).toUTCString())
      commit('poolInfoError', 'Pool\'s General Stats API not working, retying in 40 seconds')
      return 'offline'
    }

    commit('updatePoolInfo', {
      hashrate: Number((info.hashrate / 10e5).toFixed(1)),
      miners: info.miners,
      workers: info.workers,
      pool_fee: info.pool_fee
    })
  },
  CLEAR_USER_INFO({ commit }) {
    commit('clearUserInfo')
  }
}