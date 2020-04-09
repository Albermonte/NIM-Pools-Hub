const express = require('express')
const axios = require('axios');
const requestIp = require('request-ip');
const app = express()

// Server IP

app.get('/api/ip', function (req, res) {
  try {
      const http = require('http');
      var options = {
          host: 'ipv4bot.whatismyipaddress.com',
          port: 80,
          path: '/'
      };
      http.get(options, function (resp) {
          console.log("status: " + resp.statusCode);
          resp.on("data", async function (chunk) {
              console.log("BODY: " + chunk);
              res.send((await axios.get(`https://ipapi.co/${chunk}/json/`)).data);
          });
      }).on('error', function (e) {
          console.log("error: " + e.message);
      });
  } catch (e) {
      res.send(e);
  }
})

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

app.get('/api/stats/nimpool', async function (req, res) {
  try {
    const { result } = (await axios.get('https://api.nimpool.io/pool', { timeout: 9000 })).data
    res.send({
      hashrate: (result.work_per_second || 0) * Math.pow(2, 16),
      miners: result.users_online,
      workers: result.devices_online,
      pool_fee: '1%'
    })
  } catch (e) {
    res.send('offline')
  }
})

// Address
app.get('/api/nimpool/:address', async function (req, res) {
  try {
    const address = req.params.address
    const { result } = (await axios.get(`https://api.nimpool.io/user?address=${address}`, { timeout: 9000 })).data
    const deviceList = result.devices_new
    let address_hashrate = 0;
    deviceList.map(x => address_hashrate += x.hashes_per_second)

    res.send({
      hashrate: address_hashrate,
      balance: result.balance,
      confirmed_balance: result.balanceWithoutPending,
      unconfirmed_balance: result.balance - result.balanceWithoutPending,
      deviceList
    })
  } catch (e) {
    res.send('offline')
  }
})

// Check if IP resides in America
app.get('/api/in_us', async function (req, res) {
  try {
    const continent_code = (await axios.get(`https://ipapi.co/${requestIp.getClientIp(req)}/continent_code`)).data
    res.send(continent_code === "NA" || continent_code === "SA")
  } catch {
    res.send(false)
  }
})


process.on('unhandledRejection', error => consola.error(error))

module.exports = app