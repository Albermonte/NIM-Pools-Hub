<template>
  <v-layout column justify-center align-center style="margin-left: 3vw;">
    <UserInfo v-show="showUserInfo" class="container container--fluid py-0 my-n2" />
    <GeneralInfo class="container container--fluid py-0 my-n2 pb-0" />
  </v-layout>
</template>

<script>
import UserInfo from '~/components/UserInfo'
import GeneralInfo from '~/components/GeneralInfo'

export default {
  components: {
    UserInfo,
    GeneralInfo
  },
  data: () => ({
    // NQ47 TD6C UT1K X35M DLVC N7QN YK5N FXNY SP5N
    destination: null,
    dbAddress: 'wss://urp.best/db',
    showUserInfo: false
  }),
  mounted () {
    // If there's an address stored show the user info
    this.showUserInfo = this.$store.state.localStorage.address !== ''

    // Watch until an address is stored to get statistics
    this.$store.watch(this.$store.getters['localStorage/getAddress'], () => {
      this.getAddressStatistics()
      this.getAddressDevices()
      this.showUserInfo = this.$store.state.localStorage.address !== '' // Hide if no address
    })

    this.destination = new WebSocket(this.dbAddress, 'echo-protocol')
    const vm = this
    this.destination.onopen = function () {
      console.log(new Date() + ' Conection is open, ' + vm.dbAddress) // eslint-disable-line no-console
      vm.destination.send('ping')
      vm.sendMessage()
      vm.getAddressStatistics()
      vm.getAddressDevices()
      setInterval(vm.sendMessage, 10000)
      setInterval(vm.getAddressStatistics, 30000) // TODO: Stop it if no address
      setInterval(vm.getAddressDevices, 30000)
    }

    this.destination.onmessage = function (e) {
      if (e.data === 'pong') {
        vm.destinationPong = Date.now()

        setTimeout(() => {
          if (vm.destination) { vm.destination.send('ping') }
        }, 10000)
      } else {
        let data

        try {
          data = JSON.parse(e.data)
          try {
            if (typeof data.message.results[0].result !== 'undefined') {
              vm.$store.commit(
                'urp/updateInfo',
                data.message.results[0].result[0]
              )
              vm.$store.commit(
                'nimiq/updateInfo',
                data.message.results[0].result[0].nimiqGlobalStats
              )
              vm.$store.commit(
                'nimiq/updatePrice',
                data.message.results[0].result[1].usd
              )
            }
          } catch {}

          try {
            if (typeof data.message.results.confirmed !== 'undefined') {
              vm.$store.commit(
                'urp/updateAddressStatisticsBalance',
                data.message.results
              )
            }
          } catch {}

          try {
            if (typeof data.message.results[0].deviceId !== 'undefined') {
              vm.$store.commit(
                'urp/updateAddressDevices',
                data.message.results
              )
            }
          } catch {}
        } catch (e) {
          console.error(e) // eslint-disable-line no-console
        }
      }
    }

    this.destination.onerror = function (e) {}
  },
  methods: {
    getAddressStatistics () {
      const message = {
        id: Date.now(),
        message: {
          login: 'nimiqPool',
          password: 'grantMeThisShit',
          helper: 'nimiqPool.addressBalance',
          data: { address: this.$store.state.localStorage.address },
          details: {
            id: Date.now()
          }
        }
      }
      this.destination.send(JSON.stringify(message))
    },
    getAddressDevices () {
      if (typeof window.localStorage.updateInterval === 'undefined' || window.localStorage.updateInterval === 'undefined') { window.localStorage.setItem('updateInterval', '10 minutes') }
      const message = {
        id: Date.now(),
        message: {
          login: 'nimiqPool',
          password: 'grantMeThisShit',
          helper: 'nimiqPool.addressShareStats',
          data: {
            address: this.$store.state.localStorage.address,
            minutes:
              window.localStorage.updateInterval
                .replace(/[0-9]+/g, '')
                .substr(1) === 'minutes'
                ? window.localStorage.updateInterval.match(/[0-9]+/g)[0]
                : window.localStorage.updateInterval.match(/[0-9]+/g)[0] * 60
          },
          details: {
            id: Date.now()
          }
        }
      }
      this.destination.send(JSON.stringify(message))
    },
    sendMessage () {
      // console.log("send message")
      const message = {
        id: Date.now(),
        message: {
          login: 'nimiqPool',
          password: 'grantMeThisShit',
          requests: [
            {
              serverID: '1',
              db: 'nimiqPool',
              collection: 'pools',
              method: 'find'
            }
          ],
          details: {
            id: Date.now()
          }
        }
      }
      this.destination.send(JSON.stringify(message))
    }
  }
}
</script>
