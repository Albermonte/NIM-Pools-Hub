export const state = () => [
  {
    icon: "/acemining.png",
    name: "acemining",
    displayName: "Acemining",
    message: "Recommended",
    status: "",
    extras: ["World Class Customer Support", "Maximum Uptime"],
    slogan: "Join The Fight Against Mining Centralization!",
    url: "pool.acemining.co:8443"
  },
  /* {
    icon: "/nimpool.png",
    name: "nimpool",
    displayName: "Nimpool",
    message: "Non-profit",
    status: "",
    extras: ["Managed by a member of Team Nimiq"],
    slogan: "Nimiq Pool Mining Done Right. Secure. Distributed.",
    url: "eu.nimpool.io:8444"
  },*/
  /*{
    icon: "/blankpool.png",
    name: "blankpool",
    displayName: "BlankPool",
    message: "Adaptive fees",
    status: "",
    extras: ["Fees depends on pool H/s"],
    slogan: "Pool ran by Chugwig that uses an adaptive pool fee.",
    url: "mine.blank.drawpad.org:8444"
  },*/
  {
    icon: "/icemining.png",
    name: "icemining",
    displayName: "Icemining",
    message: "YIIMP based",
    status: "",
    extras: ["Greatest Support"],
    slogan: "icemining.ca 🇨🇦 ❄️ the cool pool",
    url: "nimiq.icemining.ca:2053"
  },
  /* SiriusPool will suspend its services by the 5th January 2021 21:00 (GMT +2), due low mining activity.. you should change pool until that date. */
  /* {
    icon: "/siriuspool.png",
    name: "siriuspool",
    displayName: "Siriuspool",
    message: "Low Hashrate",
    status: "",
    extras: ["Greek Pool"],
    slogan: "First Greek Pool for Nimiq!",
    url: "siriuspool.net:8443"
  }, */
  /* {
    icon: "/balkanpool.png",
    name: "balkanpool",
    displayName: "Balkan Mining Pool",
    message: "Balkans based",
    status: "",
    extras: ["Slow API"],
    slogan: "Nimiq Pool hosted by Balkan users",
    url: "pool.balkanminingpool.com:8444"
  }, */
  // Skypool stopped working on April 2022
  /*
  {
    icon: "/skypool.png",
    name: "skypool",
    displayName: "Skypool",
    message: "China based",
    status: "",
    extras: ["Not using official protocol"],
    slogan: "Connect to unlimited value networks",
    url: "sh1.nimiq.skypool.xyz:5000"
  },
  */
  {
    icon: "/nimiqwatchpool.png",
    name: "nimiqwatch",
    displayName: "Nimiq.Watch",
    message: "Low fee",
    status: "",
    extras: ["Pool run by Sören (Team Nimiq)"],
    slogan: "Nimiq Mining you can trust.",
    url: "pool.nimiq.watch:8443"
  },
  {
    icon: "/e4pool.png",
    name: "e4pool",
    displayName: "E4pool",
    message: "Russia based",
    status: "",
    extras: ["Support in Russian"],
    slogan: "Multicoin CPU/GPU mining pool",
    url: "nimiq.e4pool.com:6985"
  }
];

export const mutations = {
  updateStatus(state, { index, status, region }) {
    region
      ? (state[index].displayName = `${state[index].displayName
        } (${region.toUpperCase()})`)
      : null;
    state[index].status = status;
  },
  updateUrl(state, { index, url }) {
    state[index].url = url;
  },
  updateFee(state, { index, pool_fee }) {
    state[index].extras.unshift(`Pool fee: ${pool_fee}`);
  }
};

export const actions = {
  UPDATE_POOLSTATUS({ commit }, { index, status, region }) {
    commit("updateStatus", { index, status, region });
  },
  UPDATE_POOLURL({ commit }, { index, url }) {
    commit("updateUrl", { index, url });
  },
  async UPDATE_POOLFEE({ commit }, { index, name }) {
    const { pool_fee } = await this.$axios.$get(
      `${window.location.origin}/api/stats/${name}`
    );
    commit("updateFee", { index, pool_fee });
  }
};
