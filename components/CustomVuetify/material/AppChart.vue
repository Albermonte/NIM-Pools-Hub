<template>
  <v-sparkline
    fill
    :value="value"
    :gradient="['#21bca5','#41a38e']"
    line-width="2"
    height="1480"
    width="10000"
    smooth="300"
  />
</template>

<script>
export default {
  computed: {
    value () {
      // eslint-disable-next-line
      return eval(
        'this.$store.state.' + this.$route.name + '.address_hashrate_array'
      )
    }
  }
}
</script>
