<template>
  <v-app style="background-color: #f4f4f4;">
    <v-content>
      <v-container fluid class="pa-0" style="height: 100%">
        <v-btn
          left
          text
          color="grey darken-4"
          class="ml-2"
          nuxt
          href="/"
        >
          <v-icon left>
            mdi-arrow-left
          </v-icon>Back to Hub
        </v-btn>
        <v-row align="center" justify="center" style="height: calc(100% - 110px)">
          <v-col cols="10">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
