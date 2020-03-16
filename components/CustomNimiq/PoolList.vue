<template>
  <form action data-vv-scope="account">
    <v-responsive class="mx-auto">
      <input :value="selectPool" type="hidden" data-vv-name="type" />

      <v-item-group v-model="selectedPool" class="mb-6">
        <v-row dense justify="center">
          <v-col v-for="(pool, i) in poolList" :key="i" sm="8" md="4" lg="3">
            <v-item>
              <template v-slot="{ active, toggle }">
                <v-col class="text-center">
                  <v-card
                    max-width="250"
                    min-width="230"
                    min-height="65"
                    :class="active ? 'light-blue--text text--darken-3' : 'grey--text'"
                    class="mx-auto d-flex flex-column align-center v-card--account"
                    outlined
                    @click="toggle"
                  >
                    <v-card-text class="d-flex justify-center align-center">
                      <img
                        :src="pool.icon"
                        alt="avatar"
                        style="width: 35px; height: 35px; margin-right: 5px; border-radius: 50px"
                      />
                      <div
                        class="pl-3 text-uppercase subtitle-2 text--primary"
                        v-text="pool.displayName"
                      />
                    </v-card-text>
                    <v-card-actions class="px-3 d-flex justify-space-between" style="width: 100%">
                      <v-chip
                        outlined
                        small
                        :color="pool.message ==='Preferred' ? 'purple accent-3' : ''"
                        class="font-weight-regular"
                      >
                        <v-icon left small style="margin-right: 2px !important">mdi-circle-medium</v-icon>
                        {{ pool.message }}
                      </v-chip>
                      <v-chip
                        v-if="pool.status === 'online'"
                        color="green darken-2"
                        class="font-weight-light"
                        outlined
                        small
                      >
                        <v-icon left small>mdi-transit-connection-variant</v-icon>Online
                      </v-chip>
                      <v-chip
                        v-else-if="pool.status === 'offline'"
                        color="red darken-2"
                        class="font-weight-light"
                        outlined
                        small
                      >
                        <v-icon left small>mdi-transit-connection-variant</v-icon>Offline
                      </v-chip>
                      <v-chip v-else outlined small>
                        <v-icon left small>mdi-transit-connection-variant</v-icon>Checking
                      </v-chip>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </template>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-responsive>
  </form>
</template>

<script>
export default {
  data: () => ({
    selectedPool: null,
    poolList: [
      {
        icon: '/nimpool.png',
        name: 'nimpool',
        displayName: 'NimPool',
        message: 'Preferred',
        status: ''
      },
      {
        icon: '/urp.jpg',
        name: 'urp',
        displayName: 'URP Best',
        message: 'Lowest Fees',
        status: ''
      },
      {
        icon: '/siriuspool.png',
        name: 'SiriusPool',
        displayName: 'SiriusPool',
        message: 'Low Hashrate',
        status: ''
      }
    ]
  }),
  computed: {
    selectPool () {
      console.log(this.selectedPool) // eslint-disable-line no-console
      return this.selectedPool
    }
  },
  async mounted () {
    const ipContinent = (await this.$axios.$get('https://ipapi.co/continent_code/'))
    let region
    if (ipContinent !== 'US') { region = 'eu' } else { region = 'us' }

    this.poolList.map(async (x) => {
      if (x.name === 'nimpool') {
        x.status = (await this.$axios.$get(`/api/isOnline/${x.name}` + region))
          ? 'online'
          : 'offline'
        x.displayName = `${x.displayName} (${region.toUpperCase()})`
      } else {
        x.status = (await this.$axios.$get(`/api/isOnline/${x.name}`))
          ? 'online'
          : 'offline'
      }
    })
  }
}
</script>

<style lang="sass">
.v-card.v-card.v-card--account
  border-color: currentColor
  .v-icon
    color: inherit
</style>
