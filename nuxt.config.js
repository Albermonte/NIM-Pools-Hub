import colors from 'vuetify/es5/util/colors'

export default {
  dev: (process.env.NODE_ENV !== 'production'),
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'NIM Pools Hub',
    title: 'NIM Pools Hub',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    script: [
      { src: 'https://ad.bitmedia.io/js/adbybm.js/5ecbb30693ee28580bb674bb', async: true },
      { src: 'https://ad.bitmedia.io/js/adbybm.js/5ecbb43593ee287b36b675b0', async: true },
      { src: 'https://ad.bitmedia.io/js/adbybm.js/5ecbb4a693ee2899f2b675f0', async: true },
      { src: 'https://ad.bitmedia.io/js/adbybm.js/5ecbb76793ee28ae0ab676f3', async: true },
      { src: 'https://ad.bitmedia.io/js/adbybm.js/5ecbb7ad93ee2861f0b6771b', async: true },
      { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', async: true, 'data-ad-client': 'ca-pub-6521406599691829' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false /* '~/components/Loading/Loading' */,
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/index.scss',
    '@nimiq/style'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~/plugins/carousel.js',
      ssr: false,
    },
    {
      src: "~/plugins/anime.js",
      ssr: false
    },
    {
      src: '~/plugins/gauge.js',
      ssr: false
    },
    {
      src: '~/plugins/notifications.js',
      ssr: false
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-vuex-localstorage',
    /* ['@nuxtjs/google-adsense', {
      id: 'ca-pub-6521406599691829',
    }], */
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  serverMiddleware: [
    '~/api/api'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
