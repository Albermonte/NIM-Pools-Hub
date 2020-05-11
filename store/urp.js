export const state = () => ({
  luck: [],
  hashrate: 0,
  hashrateComplete: 0,
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
  updateInfo(state, value) {
    state.luck = []
    for (let i = 0; i < value.luck.hours.length; i++) {
      state.luck.push({ time: value.luck.hours[i], luck: (100 - value.luck.luck[i]).toFixed(0), blocks: value.luck.count[i] })
    }
    state.hashrate = (value.hashrate / 1e6).toFixed(2) + ' MH/s'
    state.miners = value.miners
    state.workers = value.workerCount
    state.pool_fee = '0.5%'
  },
  updateAddressStatisticsBalance(state, value) {
    state.confirmed_balance = (value.confirmed / 1e5).toFixed(1)
    state.unconfirmed_balance = ((value.unconfirmed - value.confirmed) / 1e5).toFixed(1)
    state.balance = (value.unconfirmed / 1e5).toFixed(1)
  },
  updateAddressDevices(state, value) {
    state.deviceList = []
    let hashrate = 0

    const format = window.localStorage.updateInterval.replace(/[0-9]+/g, '').substr(1)
    const minutes = format === 'minutes' ? window.localStorage.updateInterval.match(/[0-9]+/g)[0] : window.localStorage.updateInterval.match(/[0-9]+/g)[0] * 60

    for (let i = 0; i < value.length; i++) {
      const time = Math.round((Date.now() - value[i].last.updated) / 1000)
      const rate = value[i].difficulty / (minutes * 60) * 2 ** 16 / 1000000
      hashrate += Number(rate.toFixed(3))
      state.deviceList.push(
        {
          deviceName: value[i].deviceName,
          deviceId: value[i].deviceId,
          hashrate: rate.toFixed(3),
          last_share: (time <= 0 ? 1 : time) + ' sec ago'
        }
      )
    }
    state.address_hashrate = hashrate.toFixed(3)
    state.address_hashrate_array.push(Number(state.address_hashrate))
  }
}
