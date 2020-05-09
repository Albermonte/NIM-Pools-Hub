<template>
  <v-card :height="height" :width="width" outlined style="border-radius: 8px;">
    <v-list class="pt-3 pb-1">
      <v-list-item>
        <v-list-item-avatar size="50">
          <v-img :src="`/${pool.name}.png`"></v-img>
        </v-list-item-avatar>
        <v-col class="pa-0" cols="6">
          <div class="headline">{{ pool.displayName}}</div>
        </v-col>
        <v-col class="pa-0 d-flex justify-center align-center" cols="3">
          <div class="mx-auto">
            <v-chip
              v-if="pool.status === 'online'"
              text-color="green accent-4"
              color="green lighten-5"
              class="font-weight-light"
              x-small
            >Online</v-chip>
            <v-chip
              v-else-if="pool.status === 'offline'"
              text-color="red accent-4"
              color="red lighten-5"
              class="font-weight-light"
              x-small
            >Offline</v-chip>
            <v-chip
              v-else
              text-color="blue-grey accent-4"
              color="blue-grey lighten-5"
              x-small
              class="font-weight-light"
            >Checking</v-chip>
          </div>
        </v-col>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="pt-1 pb-0">
          <v-list-item-subtitle>{{ pool.slogan }}</v-list-item-subtitle>
          <!-- <v-list-item-title>{{ pool.message + ' ' + pool.extras.join(' ') }}</v-list-item-title> -->
          <v-list-item-title>
            <v-row class="pb-0">
              <v-col class="py-0 d-flex flex-column align-center" style="max-width: 125px;">
                <div class="pt-1 headline">{{ poolFee }}</div>
                <div class="pt-1">Pool fee</div>
              </v-col>
              <v-col class="pa-0 pt-1 d-flex flex-column justify-space-around" style="height: 70px;">
                <div >{{pool.extras[1]}}</div>
                <div class="pb-2">{{pool.message}}</div>
              </v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions class="d-flex justify-center">
      <v-btn
        class="px-8"
        style="margin-bottom: -34px;"
        absolute
        bottom
        rounded
        color="primary"
        nuxt
        :to="pool.name"
      >Go!</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    pool: {
      type: Object
    },
    height: {
      type: Number,
      default: 190
    },
    width: {
      type: Number,
      default: 360
    }
  },
  computed: {
    poolFee() {
      const fee = this.pool.extras[0];
      return fee.substr(fee.indexOf(": ") + 2);
    }
  }
};
</script>

<style scoped>
.v-chip.v-size--x-small {
  border-radius: 15px;
  font-size: 14px;
  height: 28px;
}

.v-list-item__title,
.v-list-item__subtitle {
  white-space: pre-line;
}
</style>