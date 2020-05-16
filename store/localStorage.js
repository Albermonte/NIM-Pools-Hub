export const state = () => ({
  address: undefined,
  showDevices: false
})

export const mutations = {
  updateAddress (state, value) {
    state.address = value
  },
  toggleDevices (state, value) {
    state.showDevices = value
  }
}

export const getters = {
  getAddress: state => () => state.address,
  getShowDevices: state => () => state.showDevices
}
