export const state = () => (
    [
        {
            icon: "/nimpool.png",
            name: "nimpool",
            displayName: "Nimpool",
            message: "Recommended",
            status: "",
            extras: [" Pool fee: 1%", "Non-profit"],
            url: "eu.nimpool.io:8444"
        },
        {
            icon: "/blankpool.png",
            name: "blankpool",
            displayName: "BlankPool",
            message: "Adaptive fees",
            status: "",
            extras: ["Fees varies depending on the pool hashrate"],
            url: "mine.blank.drawpad.org:8444"
        },
        {
            icon: "/icemining.png",
            name: "icemining",
            displayName: "Icemining",
            message: "YIIMP based",
            status: "",
            extras: ["Pool fee: 1.25%", "Greatest Support"],
            url: "nimiq.icemining.ca:2053"
        },
        {
            icon: "/siriuspool.png",
            name: "siriuspool",
            displayName: "Siriuspool",
            message: "Low Hashrate",
            status: "",
            extras: ["Pool fee: 1%", "Greek Pool"],
            url: "siriuspool.net:8443"
        },
        {
            icon: "/balkanpool.png",
            name: "balkanpool",
            displayName: "Balkan Mining Pool",
            message: "Balkans based",
            status: "",
            extras: ["Slow API"],
            url: "mine.blank.drawpad.org:8444"
        },
        {
            icon: "/skypool.png",
            name: "skypool",
            displayName: "Skypool",
            message: "China based",
            status: "",
            extras: ["Pool fee: ~1%", "Not using official protocol"],
            url: "hk1.nimiq.skypool.org:5000"
        },
        {
            icon: "/urp.png",
            name: "urp",
            displayName: "URP Best",
            message: "Lowest Fees",
            status: "",
            extras: [" Pool fee: 0.5%"],
            url: ""
        }
    ]
)

export const mutations = {
    updateStatus(state, { index, status, region }) {
        region ? state[index].displayName = `${state[index].displayName} (${region.toUpperCase()})` : null;
        state[index].status = status;
    },
    updateUrl(state, { index, url }) {
        state[index].url = url;
    },
    updateFee(state, { index, pool_fee }) {
        typeof(pool_fee) === 'undefined' ? pool_fee = '~1%' : null
        state[index].extras.unshift(`Pool fee: ${pool_fee}`);
    }
}

export const actions = {
    UPDATE_POOLSTATUS({ commit }, { index, status, region }) {
        commit('updateStatus', { index, status, region })
    },
    UPDATE_POOLURL({ commit }, { index, url }) {
        commit('updateUrl', { index, url })
    },
    async UPDATE_POOLFEE({ commit }, { index, name }) {
        const { pool_fee } = await this.$axios.$get(`${window.location.origin}/api/stats/${name}`)
        commit('updateFee', { index, pool_fee })
    }
}