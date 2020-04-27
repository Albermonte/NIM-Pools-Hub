export const state = () => ({
    hashrate: 0,
    miners: 0,
    workers: 0,
    blocksMined: 0,
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
        state.hashrate = value.hashrate
        state.miners = value.miners
        state.workers = value.workers
        state.blocksMined = value.blocksMined,
            state.pool_fee = value.pool_fee
    },
    clearUserInfo(state) {
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
        const info = await this.$axios.$get(`${window.location.origin}/api/siriuspool/${rootState.localStorage.address.replace(/(.{4})/g, "$1 ").slice(0, -1)}`)
        if (info === 'offline') {
            console.error('Siriuspool USER_INFO not responding ', (new Date).toUTCString())
            commit('userInfoError', 'Pool\'s User Stats API not working, retying in 30 seconds')
            return 'offline'
        }

        const deviceList = []
        if (info.deviceList)
            info.deviceList.map(x => {
                deviceList.push({
                    deviceName: x.dev_name,
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
        const info = await this.$axios.$get(`${window.location.origin}/api/stats/siriuspool`)
        if (info === 'offline') {
            console.error('Siriuspool POOL_INFO not responding ', (new Date).toUTCString())
            commit('poolInfoError', 'Pool\'s General Stats API not working, retying in 40 seconds')
            return 'offline'
        }

        const hs_length = info.hashrate.toFixed(0).toString().length
        let hashrate = 0
        if (hs_length <= 6) hashrate = Number((info.hashrate / 1e3).toFixed(3)) + ' KH/s'
        else if (hs_length > 6 && hs_length <= 9) hashrate = Number((info.hashrate / 1e6).toFixed(1)) + ' MH/s'
        else if (hs_length > 9 && hs_length <= 12) hashrate = Number((info.hashrate / 1e9).toFixed(1)) + ' GH/s'
        else if (hs_length > 12 && hs_length <= 15) hashrate = Number((info.hashrate / 1e12).toFixed(1)) + ' TH/s'
        else hashrate = Number((info.hashrate).toFixed(1)) + ' H/s'


        commit('updatePoolInfo', {
            hashrate,
            miners: info.miners,
            workers: null,
            blocksMined: info.blocksMined,
            pool_fee: info.pool_fee
        })
    },
    CLEAR_USER_INFO({ commit }) {
        commit('clearUserInfo')
    }
}