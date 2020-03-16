export const state = () => ({
  hashrate: '',
  height: '',
  nim_day_kh: '',
  price: '',
  address: ''
})

export const mutations = {
  updateInfo (state, value) {
    state.hashrate = (value.hashrate / 1e9) > 1 ? (value.hashrate / 1e9).toFixed(3) + ' GH/s' : (value.hashrate / 1e6).toFixed(2) + ' MH/s'
    state.height = '#' + value.height
    state.nim_day_kh = value.nim_day_kh + ' NIM'
  },
  updatePrice (state, value) {
    state.price = value
  },
  updateAddress (state, value) {
    state.address = value
  }
}
