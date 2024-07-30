<script lang="ts" setup>
import Loading from '~/components/common/loading.vue'

onMounted(() => {
  window.addEventListener( 'pageshow', function (evt) {
    if (evt.persisted) {
      reloadNuxtApp()
    }
  } , false,)
})
</script>

<template>
  <NuxtLayout>
    <Loading />
    <NuxtPage/>
  </NuxtLayout>
</template>

