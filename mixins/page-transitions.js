/**
 * page-transitions.js mixin
 * regenrek.com
 */

import { store, mutations } from "~/store/transitions.js";

const enterSplashScreenTransition = [
  {
    targets: ".splashScreen",
    translateY: "0",
    opacity: 1,
    easing: "easeInExpo"
  },
  {
    targets: ".splashScreen h1",
    translateY: "0",
    opacity: 0,
    duration: 100,
    easing: "easeOutExpo"
  },
  {
    targets: ".splashScreen h1",
    translateY: "0",
    opacity: 1,
    duration: 500,
    easing: "easeInExpo",
    direction: "alternate"
  },
  {
    targets: ".splashScreen h1",
    translateY: "0",
    opacity: 0,
    duration: 1000,
    delay: 1500,
    easing: "easeOutExpo"
  },
  {
    targets: ".splashScreen",
    translateY: "-100%",
    delay: 100,
    duration: 600,
    easing: "easeInOutQuad"
    // not working (like autoAlpha in gsap) -> using store instead
    // visibility: "hidden"
  }
];

/*const leaveSplashScreenTransition = {
  targets: ".splashScreen",
  translateY: "-100%",
  opacity: 0,
  duration: 500,
  delay: 2000
};*/

const enterPageTransition = {
  targets: ".pageTransScreen",
  opacity: 0,
  easing: "easeOutSine",
  duration: 800,
  delay: 500
};

const leavePageTransition = {
  targets: ".pageTransScreen",
  opacity: 1,
  easing: "easeOutSine",
  duration: 200
};

const PageTransitions = (enterChild, leaveChild) => ({
  transition: {
    mode: "out-in",
    css: false,
    beforeEnter(el) {
      /*if (store.isInitialPageLoad) {
        console.info("beforeEnter");
        this.$anime(enterSplashScreenTransition);
      }*/
    },
    enter(el, done) {
      let opt = {};
      console.info("check if isInitialPageLoad", store.isInitialPageLoad);
      if (store.isInitialPageLoad) {
        console.info("show SplashScreen");
        opt = enterSplashScreenTransition;
        mutations.initalPageLoadDone();
      } else {
        console.info("show Page Transition");
        opt = enterPageTransition;
      }

      if (Array.isArray(opt)) {
        console.info("opt is an array lets create a timeline...");
        let tl = this.$anime.timeline({ autoPlay: false });
        if (enterChild !== undefined) {
          opt[opt.length - 1].complete = () => {
            console.info("HERE STOP");
            mutations.hideSplashScreen();
            mutations.enablePageTransition(false);
            enterChild(el, done);
          };
        } else {
          opt[opt.length - 1].complete = () => {
            mutations.hideSplashScreen();
            mutations.enablePageTransition(false);
            done();
          };
        }
        for (const anim of opt) {
          tl.add(anim);
        }
        tl.play();
      } else {
        if (enterChild !== undefined) {
          opt.complete = () => {
            mutations.enablePageTransition(false);
            enterChild(el, done);
          };
        } else {
          opt.complete = () => {
            mutations.enablePageTransition(false);
            done();
          };
        }
        this.$anime(opt);
      }
    },
    leave(el, done) {
      let opt = {};
      if (!store.isInitialPageLoad) {
        console.info("hide page transitions");
        opt = leavePageTransition;
        /*console.info("hide Splashscreen");
        opt = leaveSplashScreenTransition;
        mutations.initalPageLoadDone();*/
      }
      if (leaveChild !== undefined) {
        opt.complete = () => {
          mutations.enablePageTransition(true);
          leaveChild(el, done);
        };
      } else {
        opt.complete = () => {
          mutations.enablePageTransition(true);
          done();
        };
      }
      this.$anime(opt);
    }
  }
});

export default PageTransitions;
