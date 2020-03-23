export const state = () => ({
    luck: [],
    hashrate: '',
    miners: '',
    workers: '',
    pool_fee: '',
    balance: '',
    confirmed_balance: '',
    unconfirmed_balance: '',
    deviceList: [],
    address_hashrate: '',
    address_hashrate_array: [0]
  })
  
  export const mutations = {
    updateInfo (state, value) {
      state.luck = []
      state.hashrate = (value.hashrate / 1e6).toFixed(2) + ' MH/s'
      state.miners = value.miners
      state.workers = value.workerCount
      state.pool_fee = '0.5%'
    }
  }
  