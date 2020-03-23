<template>
  <form action data-vv-scope="account">
    <v-responsive class="mx-auto">
      <input :value="selectPool" type="hidden" data-vv-name="type" />

      <v-item-group v-model="selectedPool" class="mb-6">
        <v-row dense justify="center">
          <v-col
            v-for="(pool, i) in poolList"
            :key="i"
            sm="8"
            md="4"
            lg="3"
            style="max-width: 280px;"
          >
            <v-item>
              <template v-slot="{ active, toggle }">
                <v-col class="text-center">
                  <v-tooltip color="var(--nimiq-blue)" top>
                    <template v-slot:activator="{ on }">
                      <v-card
                        max-width="250"
                        min-width="230"
                        min-height="65"
                        :class="active ? 'light-blue--text text--darken-3' : 'grey--text'"
                        class="d-flex flex-column align-center v-card--account"
                        outlined
                        @click="toggle"
                        v-on="on"
                        :disabled="pool.status === 'offline'"
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
                        <v-card-actions
                          class="px-3 d-flex justify-space-between"
                          style="width: 100%"
                        >
                          <v-chip
                            outlined
                            small
                            :color="pool.message ==='Recommended' ? 'purple accent-3' : ''"
                            class="font-weight-regular"
                          >
                            <v-icon
                              left
                              small
                              style="margin-right: 2px !important"
                            >mdi-circle-medium</v-icon>
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
                    </template>
                    <span class="white--text text-center" v-html="pool.extras.join('<br>')"></span>
                  </v-tooltip>
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
    selectPool: 0,
    selectedPool: null,
  }),
  computed: {
    poolList () {
      return this.$store.state.poolList
    }
  },
  updated() {
    //console.log(this.poolList[this.selectedPool]); // eslint-disable-line no-console
    if (this.selectedPool !== undefined)
      this.$root.$emit("poolURL", this.poolList[this.selectedPool].url);
    else this.$root.$emit("poolURL", null);
  }
};
</script>

<style lang="sass">
.v-card.v-card.v-card--account
  border-color: currentColor
  .v-icon
    color: inherit
</style>
