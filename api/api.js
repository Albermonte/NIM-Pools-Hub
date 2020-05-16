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
    return (await axios.get('https://icemining.ca/api/currencies', { timeout: 5000 })).data.NIM.hashrate > 0;
  } catch{
    if (retry) return isIceminingOnline(false);
    return false;
  }
}

const isUrpOnline = async retry => {
  try {
    return (await axios.get('https://urp.best:2053/', { timeout: 5000 })).data.hashrate > 0;
  } catch{
    if (retry) return isUrpOnline(false);
    return false;
  }
}

const isNimpooleuOnline = async retry => {
  try {
    const res = (await axios.get('https://api.nimpool.io/status', { timeout: 5000 })).data.result
    return res.eu.core;
  } catch {
    if (retry) return isNimpooleuOnline(false);
    return false;
  }
}

const isNimpoolusOnline = async retry => {
  try {
    const res = (await axios.get('https://api.nimpool.io/status', { timeout: 5000 })).data.result
    return res.us.core;
  } catch {
    if (retry) return isNimpoolusOnline(false);
    return false;
  }
}

const isNimpoolapOnline = async retry => {
  try {
    const res = (await axios.get('https://api.nimpool.io/status', { timeout: 5000 })).data.result
    return res.ap.core;
  } catch {
    if (retry) return isNimpoolapOnline(false);
    return false;
  }
}

const isSiriuspoolOnline = async retry => {
  try {
    return (await axios.get('https://siriuspool.net/stats_refr.php', { timeout: 5000 })).data.pool_hashrate > 0
  } catch {
    if (retry) return isSiriuspoolOnline(false);
    return false;
  }
}

const isSkypoolOnline = async retry => {
  try {
    return (await axios.get('https://api.nimiq.skypool.xyz/api/v1/pool/poolProfile', { timeout: 5000 })).data.data.hashrate > 0
  } catch {
    if (retry) return isSkypoolOnline(false);
    return false;
  }
}

const isBlankpoolOnline = async retry => {
  try {
    const { clientCounts, averageHashrate } = (await axios.get('https://mine.blank.drawpad.org/api/pool/stats', { timeout: 5000 })).data
    return clientCounts.total > 0 || averageHashrate > 0;
  } catch {
    if (retry) return isBlankpoolOnline(false);
    return false;
  }
}

const isBalkanpoolOnline = async retry => {
  try {
    const { clientCounts, averageHashrate } = (await axios.get('https://pool.balkanminingpool.com/api/pool/stats', { timeout: 5000 })).data
    return clientCounts.total > 0 || averageHashrate > 0;
  } catch {
    if (retry) return isBalkanpoolOnline(false);
    return false;
  }
}

// Nimiq Stats

app.get('/api/stats/nimiq', async function (req, res) {
  try {
    const stats = (await axios.get(`https://api.nimiqx.com/network-stats/?api_key=${process.env.nimiqx_api}`, { timeout: 9000 })).data
    const hs_year = (await axios.get(`https://api.nimiqx.com/hashrate/year?api_key=${process.env.nimiqx_api}`, { timeout: 9000 })).data
    const { usd } = (await axios.get(`https://api.nimiqx.com/price/usd?api_key=${process.env.nimiqx_api}`, { timeout: 9000 })).data

    let top_hashrate = 0
    hs_year.forEach(x => {
      if (x.hashrate > top_hashrate) top_hashrate = x.hashrate
    })

    res.send({
      hashrate: parseHashrate(stats.hashrate),
      top_hashrate: parseHashrate(top_hashrate),
      hashrateComplete: stats.hashrate,
      top_hashrateComplete: top_hashrate,
      height: stats.height,
      nim_day_kh: stats.nim_day_kh,
      price: usd
    })
  } catch (e) {
    console.log(e)
    res.send('offline')
  }
})


// Pool Stats

app.get('/api/stats/nimpool', async function (req, res) {
  try {
    const { result } = (await axios.get('https://api.nimpool.io/pool', { timeout: 5000 })).data
    res.send({
      hashrate: parseHashrate((result.work_per_second || 0) * Math.pow(2, 16)),
      hashrateComplete: Number(((result.work_per_second || 0) * Math.pow(2, 16)).toFixed(0)),
      miners: result.users_online,
      workers: result.devices_online,
      pool_fee: '1%'
    })
  } catch (e) {
    res.send('offline')
  }
})

app.get('/api/stats/blankpool', async function (req, res) {
  try {
    const stats = (await axios.get('https://mine.blank.drawpad.org/api/pool/stats', { timeout: 5000 })).data
    const pool_fee = (await axios.get('https://mine.blank.drawpad.org/api/pool/config', { timeout: 5000 })).data.fees
    res.send({
      hashrate: parseHashrate(stats.averageHashrate),
      hashrateComplete: Number(stats.averageHashrate.toFixed(0)),
      miners: stats.clientCounts.total,
      workers: null,
      blocksMined: stats.blocksMined.total,
      pool_fee
    })
  } catch (e) {
    res.send('offline')
  }
})

app.get('/api/stats/balkanpool', async function (req, res) {
  try {
    const stats = (await axios.get('https://pool.balkanminingpool.com/api/pool/stats', { timeout: 8000 })).data
    const pool_fee = (await axios.get('https://pool.balkanminingpool.com/api/pool/config', { timeout: 9000 })).data.fees
    res.send({
      hashrate: parseHashrate(stats.averageHashrate),
      hashrateComplete: Number(stats.averageHashrate.toFixed(0)),
      miners: stats.clientCounts.total,
      workers: null,
      blocksMined: stats.blocksMined.total,
      pool_fee
    })
  } catch (e) {
    console.log(e)
    res.send('offline')
  }
})

app.get('/api/stats/siriuspool', async function (req, res) {
  try {
    const stats = (await axios.get('https://siriuspool.net/stats_refr.php', { timeout: 5000 })).data
    res.send({
      hashrate: parseHashrate(stats.pool_hashrate),
      hashrateComplete: Number(stats.pool_hashrate.toFixed(0)),
      miners: stats.connected_users,
      workers: null,
      blocksMined: stats.pool_blocks_mined,
      pool_fee: '1%'
    })
  } catch (e) {
    console.log(e)
    res.send('offline')
  }
})

app.get('/api/stats/skypool', async function (req, res) {
  try {
    const stats = (await axios.get('https://api.nimiq.skypool.xyz/api/v1/pool/poolProfile', { timeout: 5000 })).data.data
    const { blocks } = (await axios.get(`https://api.nimiqx.com/account/NQ48 8CKH BA24 2VR3 N249 N8MN J5XX 74DB 5XJ8?api_key=${process.env.nimiqx_api}`, { timeout: 7000 })).data
    res.send({
      hashrate: parseHashrate(stats.hashrate),
      hashrateComplete: Number(stats.hashrate.toFixed(0)),
      miners: stats.addressNumber,
      workers: null,
      blocksMined: blocks,
      pool_fee: '~1%'
    })
  } catch (e) {
    console.log(e)
    res.send('offline')
  }
})

app.get('/api/stats/icemining', async function (req, res) {
  try {
    const { NIM } = (await axios.get('https://icemining.ca/api/currencies', { timeout: 5000 })).data
    const { blocks } = (await axios.get(`https://api.nimiqx.com/account/NQ04 XEHA A84N FXQ4 DPPE 82PG QS63 TH1X XCHQ?api_key=${process.env.nimiqx_api}`, { timeout: 7000 })).data
    res.send({
      hashrate: parseHashrate(NIM.hashrate),
      hashrateComplete: Number(NIM.hashrate.toFixed(0)),
      miners: NIM.workers,
      workers: null,
      blocksMined: blocks,
      pool_fee: '1.25%'
    })
  } catch (e) {
    console.log(e)
    res.send('offline')
  }
})

// Address Stats
app.get('/api/nimpool/:address', async function (req, res) {
  try {
    const address = req.params.address
    const { result } = (await axios.get(`https://api.nimpool.io/user?address=${address}`, { timeout: 5000 })).data

    let address_hashrate = 0;

    const deviceList = []
    if (result.devices_new)
      result.devices_new.map(x => {
        address_hashrate += x.hashes_per_second
        deviceList.push({
          deviceName: x.device_id,
          deviceId: x.device_id,
          hashrate: parseHashrate(x.hashes_per_second),
          total_shares: x.shares
        })
      })

    res.send({
      address_hashrate: parseHashrate(address_hashrate),
      balance: parseBalance(result.balance),
      confirmed_balance: parseBalance(result.balanceWithoutPending),
      unconfirmed_balance: parseBalance(result.balance - result.balanceWithoutPending),
      deviceList
    })
  } catch (e) {
    console.log(e)
    res.send('offline')
  }
})

app.get('/api/blankpool/:address', async function (req, res) {
  try {
    const address = req.params.address
    const info = (await axios.get(`https://mine.blank.drawpad.org/api/miner/${address}`, { timeout: 5000 })).data

    if (info.general === null) {
      res.send('Not found')
      return
    }

    const address_hashrate_array = []
    info.hashrate.map(x => {
      if (x.avgHR) address_hashrate_array.push(parseHashrate(x.avgHR))
      else address_hashrate_array.push(parseHashrate(0))
    })

    const deviceList = []
    if (info.devices)
      info.devices.map(x => {
        deviceList.push({
          deviceName: x.deviceID,
          deviceId: x.deviceID,
          hashrate: parseHashrate(x.stats1.hash),
          total_shares: x.stats24.shares
        })
      })

    res.send({
      address_hashrate: parseHashrate(info.hashrate[info.hashrate.length - 1].avgHR || 0),
      address_hashrate_array,
      balance: parseBalance(info.balance.owed),
      confirmed_balance: parseBalance(info.balance.earned - info.balance.payedOut),
      unconfirmed_balance: parseBalance(info.balance.earned - info.balance.payedOut - info.balance.owed) < 0 ? 0 : parseBalance(info.balance.earned - info.balance.payedOut - info.balance.owed),
      deviceList
    })
  } catch (e) {
    console.log(e)
    res.send('offline')
  }
})

app.get('/api/balkanpool/:address', async function (req, res) {
  try {
    const address = req.params.address
    const info = (await axios.get(`https://pool.balkanminingpool.com/api/miner/${address}`, { timeout: 9000 })).data

    if (info.general === null) {
      res.send('Not found')
      return
    }

    const address_hashrate_array = []
    info.hashrate.map(x => {
      if (x.avgHR) address_hashrate_array.push(parseHashrate(x.avgHR))
      else address_hashrate_array.push(parseHashrate(0))
    })

    const deviceList = []
    if (info.devices)
      info.devices.map(x => {
        deviceList.push({
          deviceName: x.deviceID,
          deviceId: x.deviceID,
          hashrate: parseHashrate(x.stats1.hash),
          total_shares: x.stats24.shares
        })
      })

    res.send({
      address_hashrate: parseHashrate(info.hashrate[info.hashrate.length - 1].avgHR || 0),
      address_hashrate_array,
      balance: parseBalance(info.balance.owed),
      confirmed_balance: parseBalance(info.balance.earned - info.balance.payedOut),
      unconfirmed_balance: parseBalance(info.balance.earned - info.balance.payedOut - info.balance.owed) < 0 ? 0 : parseBalance(info.balance.earned - info.balance.payedOut - info.balance.owed),
      deviceList
    })
  } catch (e) {
    console.log(e)
    res.send('offline')
  }
})

app.get('/api/siriuspool/:address', async function (req, res) {
  try {
    const address = req.params.address
    const { id } = (await axios.get(`https://siriuspool.net/api/user/get_id/${address}`, { timeout: 5000 })).data
    const { ballance, confirmed } = (await axios.get(`https://siriuspool.net/api/user/get_ballance/${id}`, { timeout: 5000 })).data
    const deviceListArray = (await axios.get(`https://siriuspool.net/api/devices/${id}`, { timeout: 5000 })).data.devices

    let address_hashrate = 0;
    const deviceList = []
    if (deviceListArray)
      deviceListArray.map(x => {
        address_hashrate += x.hashes_per_second
        deviceList.push({
          deviceName: x.dev_name,
          deviceId: x.device_id,
          hashrate: parseHashrate(x.hashes_per_second),
          total_shares: x.shares
        })
      })

    res.send({
      hashrate: parseHashrate(address_hashrate),
      address_hashrate: parseHashrate(address_hashrate),
      balance: parseBalance(ballance * 1e5), //Needs to be * 1e5 because it's on NIM and not Luna like all the rest 
      confirmed_balance: parseBalance(confirmed * 1e5),
      unconfirmed_balance: parseBalance(ballance * 1e5 - confirmed * 1e5) < 0 ? 0 : parseBalance(ballance * 1e5 - confirmed * 1e5),
      deviceList
    })
  } catch (e) {
    if (e.response.status === 404) {
      res.send('Not found')
    } else {
      console.log(e)
      res.send('offline')
    }
  }
})

app.get('/api/skypool/:address', async function (req, res) {
  try {
    const address = req.params.address
    const { data, code } = (await axios.get(`https://api.nimiq.skypool.xyz/api/v1/pool/profile?address=${address}`, { timeout: 8000 })).data
    if (code === -1) {
      res.send('Not found')
      return
    }

    const address_hashrate_array = [];
    data.hashAndTimestamp.map(x => {
      address_hashrate_array.push(parseHashrate(parseFloat(((x.accepts + x.expired) / (20 * 60)))))
    })

    const deviceList = []
    data.workers.map((x, index) => {
      deviceList.push({
        deviceName: x.name,
        deviceId: index,
        hashrate: parseHashrate(parseFloat((x.totalAccepts + x.totalExpired) / (24 * 60 * 60)).toFixed(2)),
        total_shares: 'Unknown'
      })
    })

    res.send({
      address_hashrate: address_hashrate_array[address_hashrate_array.length - 1] || 0,
      address_hashrate_array,
      balance: parseBalance(data.balance),
      confirmed_balance: 0,
      unconfirmed_balance: 0,
      deviceList
    })

  } catch (e) {
    console.log(e)
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

// Parse Hasrate

const parseHashrate = (number) => {
  number = Number(number)
  const hs_length = number.toFixed(0).toString().length
  let hashrate = 0
  if (hs_length <= 6) hashrate = Number((number / 1e3).toFixed(2)) + ' kH/s'
  else if (hs_length > 6 && hs_length <= 9) hashrate = Number((number / 1e6).toFixed(2)) + ' MH/s'
  else if (hs_length > 9 && hs_length <= 12) hashrate = Number((number / 1e9).toFixed(2)) + ' GH/s'
  else if (hs_length > 12 && hs_length <= 15) hashrate = Number((number / 1e12).toFixed(2)) + ' TH/s'
  else hashrate = Number((number).toFixed(2)) + ' H/s'

  return hashrate
}

const parseBalance = (number) => {
  if(typeof(number) === 'undefined') return 0
  return Number((parseFloat(number) / 1e5).toFixed(1))
}


process.on('unhandledRejection', error => consola.error(error))

module.exports = app