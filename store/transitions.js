import Vue from "vue";

export const store = Vue.observable({
  isInitialPageLoad: true,
  splashScreenEnabled: true,
  pageTransitionEnabled: false
});

export const mutations = {
  initalPageLoadDone() {
    store.isInitialPageLoad = false;
  },
  hideSplashScreen() {
    store.splashScreenEnabled = false;
  },
  enablePageTransition(yesno) {
    store.pageTransitionEnabled = yesno;
  }
};
