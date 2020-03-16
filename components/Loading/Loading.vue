<template>
  <div class="load">
    <svg
      v-for="index in 4"
      :key="index"
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 64 64"
    >
      <defs>
        <radialGradient id="a" cx="46" cy="55.62" r="59.47" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ec991c" />
          <stop offset="1" stop-color="#e9b213" />
        </radialGradient>
      </defs>
      <path
        d="M63.29 29.37L50 6.62A5.35 5.35 0 0045.33 4H18.67a5.35 5.35 0 00-4.62 2.62L.71 29.37a5.19 5.19 0 000 5.25l13.34 22.75A5.34 5.34 0 0018.67 60h26.66A5.34 5.34 0 0050 57.37l13.29-22.75a5.19 5.19 0 000-5.25z"
        fill="url(#a)"
      />
    </svg>
  </div>
</template>

<style scoped>
/* https://codepen.io/zerospree/pen/aCjAz */
.load {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*change these sizes to fit into your project*/
  width: 180px;
  height: 180px;
}
.load svg {
  border: 0;
  margin: 0;
  width: 40%;
  height: 40%;
  position: absolute;
  border-radius: 50%;
  animation: spin 2s cubic-bezier(0.77, 0, 0.17, 1) infinite;
}

.load :first-child {
  animation-delay: -1.5s;
}
.load :nth-child(2) {
  animation-delay: -1s;
}
.load :nth-child(3) {
  animation-delay: -0.5s;
}

@keyframes spin {
  0%,
  100% {
    transform: translate(0);
  }
  25% {
    transform: translate(160%);
  }
  50% {
    transform: translate(160%, 160%);
  }
  75% {
    transform: translate(0, 160%);
  }
}
</style>
