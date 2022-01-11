<template>
  <SiteHeader />
  <router-view v-slot="{ Component }">
    <transition
      enter-active-class="transition-opacity duration-300 ease-in-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
    >
      <div>
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
