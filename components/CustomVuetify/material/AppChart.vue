<template>
  <v-sparkline
    auto-draw
    auto-line-width
    fill
    :value="value"
    :gradient="['#21bca5','#41a38e']"
    line-width="2"
    height="1300"
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

      if (typeof address_hashrate_array === "undefined") return [0];

      let address_hashrate_array_values = [];

      address_hashrate_array.forEach((x) => {
        if (x !== 0 && typeof x !== "undefined") {
          try {
            if (address_hashrate_array_values.length < 2) {
              address_hashrate_array_values.push(
                Number(x.substr(0, x.indexOf(" "))) - 0.1
              );
            }
            address_hashrate_array_values.push(
              Number(x.substr(0, x.indexOf(" ")))
            );
          } catch {
            // Skypool case
            address_hashrate_array_values = [...address_hashrate_array];
          }
        } else return [0];
      });
      return address_hashrate_array_values;
    },
  },
};
</script>
