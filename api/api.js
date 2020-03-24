const express = require('express')
const axios = require('axios');
const requestIp = require('request-ip');
const app = express()

// isOnline
app.get('/api/isOnline/:pool', async function (req, res) {
  let pool = req.params.pool.toLowerCase()
  pool = pool.charAt(0).toUpperCase() + pool.slice(1)
  try {
    res.send(await eval("is" + pool + "Online(true)"))
  } catch (e) {
    res.send('Not found')
  }
})

const isIceminingOnline = async retry => {
  try {
    return (await axios.get('https://icemining.ca/api/currencies', { timeout: 3000 })).data.NIM.hashrate > 0;
  } catch{
    if (retry) return isIceminingOnline(false);
    return false;
  }
}

const isUrpOnline = async retry => {
  try {
    return (await axios.get('https://urp.best:2053/', { timeout: 3000 })).data.hashrate > 0;
  } catch{
    if (retry) return isUrpOnline(false);
    return false;
  }
}

const isNimpooleuOnline = async retry => {
  try {
    const res = (await axios.get('https://api.nimpool.io/status', { timeout: 3000 })).data.result
    return res.eu.core;
  } catch {
    if (retry) return isNimpooleuOnline(false);
    return false;
  }
}

const isNimpoolusOnline = async retry => {
  try {
    const res = (await axios.get('https://api.nimpool.io/status', { timeout: 3000 })).data.result
    return res.us.core;
  } catch {
    if (retry) return isNimpoolusOnline(false);
    return false;
  }
}

const isNimpoolapOnline = async retry => {
  try {
    const res = (await axios.get('https://api.nimpool.io/status', { timeout: 3000 })).data.result
    return res.ap.core;
  } catch {
    if (retry) return isNimpoolapOnline(false);
    return false;
  }
}

const isSiriuspoolOnline = async retry => {
  try {
    return (await axios.get('https://siriuspool.net/stats_refr.php', { timeout: 3000 })).data.pool_hashrate > 0
  } catch {
    if (retry) return isSiriuspoolOnline(false);
    return false;
  }
}

const isSkypoolOnline = async retry => {
  try {
    return (await axios.get('https://api.nimiq.skypool.xyz/api/v1/pool/poolProfile', { timeout: 3000 })).data.data.hashrate > 0
  } catch {
    if (retry) return isSkypoolOnline(false);
    return false;
  }
}

// Address
app.get('/api/nimpool/:address', async function (req, res) {
  const address = req.params.address
  const result = (await axios.get(`https://api.nimpool.io/user?address=${address}`, { timeout: 3000 })).data
  /*
  deviceList: [],
  address_hashrate: '',
  address_hashrate_array: [0]
  */
  let address_hashrate = 0;

  try {
    res.send({
      hashrate: '',
      balance: result.balance,
      confirmed_balance: result.balanceWithoutPending,
      unconfirmed_balance: result.balance - result.balanceWithoutPending,
      deviceList: result.devices_new
    })
  } catch (e) {
    res.send('Not found')
  }
})

app.get('/api/in_us', async function (req, res) {
  const continent_code = (await axios.get(`https://ipapi.co/${requestIp.getClientIp(req)}/continent_code`)).data
  res.send(continent_code === "NA" || continent_code === "SA")
})

process.on('unhandledRejection', error => consola.error(error))

module.exports = app