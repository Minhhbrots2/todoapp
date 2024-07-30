<script setup>
const loading = ref(false)
const nuxtApp = useNuxtApp()

if (!nuxtApp.$startLoading) {
  nuxtApp.provide('startLoading', () => loading.value = true)
}

if (!nuxtApp.$stopLoading) {
  nuxtApp.provide('stopLoading', () => loading.value = false)
}
</script>
<template>
  <template v-if="loading">
    <div class="content">
      <a-spin size="large" />
    </div>
    <div class="overlay" />
  </template>
</template>

<style scoped lang="scss">
.v-progress-circular{
  z-index: 9999998;
}
.overlay{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: white;
  opacity: 0;
  z-index: 99999999;
}
.content{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    z-index: 9999999;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 6px solid #513EB3;
    border-radius: 50%;
    animation: lds-ring 1.6s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #513EB3 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.bg{
  width: 100px;
  height: 100px;
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 9999997;
  opacity: 0;
  border-radius: 12px;
  border: 1px solid #a9a9a9;
}
</style>
