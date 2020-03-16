<template>
  <div class="progress-indicator">
    <div
      v-for="thisStep in progressSteps"
      :key="thisStep"
      class="indicator"
      :class="thisStep <= step ? 'active' : ''"
    />
  </div>
</template>

<script>
export default {
  props: {
    numberSteps: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 1
    }
  },
  computed: {
    progressSteps () {
      const list = []
      for (let i = 1; i <= this.numberSteps; i++) { list.push(i) }
      return list
    }
  }
}
</script>

<style scoped>
.page-header {
  position: relative;
  width: 100%;
}

.page-header-back-button {
  font-size: 3rem;
  position: absolute;
  left: 4rem;
  padding-top: 0.25rem;
  opacity: 0.4;
  transition: opacity 0.3s var(--nimiq-ease), transform 0.3s var(--nimiq-ease);
  color: inherit;
}

.page-header-back-button svg {
  display: block;
}

.page-header-back-button:hover,
.page-header-back-button:focus {
  opacity: 1;
  transform: translate3D(-0.375rem, 0, 0);
  outline: none;
}

@media (max-width: 450px) {
  .page-header-back-button,
        /* Don't move button left on mobile */
        .page-header-back-button:hover,
        .page-header-back-button:focus {
    left: 3rem;
    transform: none;
  }
}

.page-header-back-button::after {
  content: "";
  display: block;
  position: absolute;
  left: -1.5rem;
  top: -1.5rem;
  right: -1.5rem;
  bottom: -1.5rem;
}

.progress-indicator {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  position: absolute;
  left: 0;
  top: 0;
}

.progress-indicator .indicator {
  flex-grow: 1;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: #e5e5e5;
  margin: 0.5rem;
}

.progress-indicator .indicator.active {
  background: #24bdb6;
}

.page-header.has-progress-indicator h1,
.page-header.has-progress-indicator .page-header-back-button {
  margin-top: 1rem;
}
</style>
