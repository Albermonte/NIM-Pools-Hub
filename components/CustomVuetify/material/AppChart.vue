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
    value() {
      // eslint-disable-next-line
      const address_hashrate_array = eval(
        "this.$store.state." + this.$route.name + ".address_hashrate_array"
      );

      const address_hashrate_array_values = [];

      address_hashrate_array.map(x => {
        if (x !== 0)
          address_hashrate_array_values.push(
            Number(x.substr(0, x.indexOf(" ")))
          );
      });

      return address_hashrate_array_values;
    }
  }
};
</script>
