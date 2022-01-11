<template>
  <router-view
    :current-index="currentIndex"
    @continue="continueToNextStep"
    @go-back="goBackAStep"
    @close="close"
  />
</template>

<script setup lang="ts">

import { onBeforeRouteUpdate } from "vue-router"
import router from "../../router"

const props = defineProps({
  addPayment: Boolean,
});

const emit = defineEmits(["close"]);

/** update currentIndex on forward/back navigation */
onBeforeRouteUpdate(to => {
  if (to.name && currentIndex.value !== routes.indexOf(to.name.toString())) currentIndex.value = routes.indexOf(to.name.toString())
})

/** correct currentIndex from a reload */
onMounted(() => {
  if (router.currentRoute.value.name != null && router.currentRoute.value.name !== routes[currentIndex.value])
    currentIndex.value = routes.indexOf(router.currentRoute.value.name.toString());
})

let currentIndex = ref(0);
const routes = ["marketing", "sign.in", "sign.up"];

async function continueToNextStep(routeAdd: number) {
  currentIndex.value += routeAdd
  await router.push({ name: routes[currentIndex.value] })
}

async function goBackAStep(routeSub: number) {
  currentIndex.value -= routeSub
  await router.push({ name: routes[--currentIndex.value] })
}

async function close() {
  emit("close")
  await router.push({ name: "marketing" })
}

watch(
  () => props.addPayment,
  async () => {
    if (props.addPayment) {
      currentIndex.value = 0
      await router.push({ name: routes[currentIndex.value] })
    }
  }
)

</script>
