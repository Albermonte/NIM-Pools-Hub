export default async function ({ store, $axios, route }) {
    let poolList = [...store.state.poolList];
    const in_us = await $axios.$get(`${window.location.origin}/api/in_us`);
    let region;
    if (in_us) {
        region = "us";
    } else {
        region = "eu";
    }
    poolList.map(async (x, index) => {
        if (x.name === "nimpool") {
            if (region === "us") store.dispatch("poolList/UPDATE_POOLURL", { index, url: "us.nimpool.io:8444" });
            const status = (await $axios.$get(
                `${window.location.origin}/api/isOnline/${x.name}` + region
            ))
                ? "online"
                : "offline";
            store.dispatch("poolList/UPDATE_POOLSTATUS", { index, status });
        } else {
            const status = (await $axios.$get(
                `${window.location.origin}/api/isOnline/${x.name}`
            ))
                ? "online"
                : "offline";
            store.dispatch("poolList/UPDATE_POOLSTATUS", { index, status });
        }
    });
    const updateUserInfo = () => store.dispatch(`${route.name}/UPDATE_USER_INFO`)
    const updatePoolInfo = () => store.dispatch(`${route.name}/UPDATE_POOL_INFO`)
    if (route.name !== 'index' && route.name !== null) {
        if (store.state.localStorage.address !== '') {
            setTimeout(updateUserInfo, 100)
            setInterval(updateUserInfo, 1 * 60 * 1000) // 1minute
        }
        updatePoolInfo()
        setInterval(updatePoolInfo, 15 * 60 * 1000) // 15 minutes
    }
}