<template>
  <div class="container">
    <div class="progress">
      <div :class="loadStart ? 'progress-value' : ''"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      loadStart: (state) => state.loadStart,
    }),
  },
};
</script>

<style>
.container {
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0);
  display: flex;
  padding: 0;
  margin: 0;
  position: fixed;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 20px;
  width: 100vw !important;
  max-width: 100vw !important;
  /* background-color: white; */
}

.progress {
  background: rgb(255, 255, 255);
  justify-content: flex-start;
  border-radius: 100px;
  align-items: center;
  position: relative;
  padding: 0 5px;
  display: flex;
  height: 0;
  width: 100vw;
}

.progress-value {
  animation: load 10s normal forwards;
  box-shadow: 0 10px 40px -10px rgb(107, 107, 107);
  border-radius: 100px;
  background: rgb(100, 100, 100);
  height: 5px;
  width: 0;
  animation-iteration-count: infinite;
}

@keyframes load {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
