<template>
  <div class="header w-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      height="0"
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feComposite
            in="SourceGraphic"
            in2="goo"
            operator="atop"
          />
        </filter>
      </defs>
    </svg>
    <div class="drip">
      <div class="droplet" />
      <div
        id="droplet2"
        class="droplet2"
        :class="[
          { 'dripit': dripit }
        ]"
      />
      <div class="drop" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn, useTimeoutFn } from '@vueuse/core'

useIntervalFn(function () {
  dripit.value = false
  useTimeoutFn(() => {
    dripit.value = true
  }, 1000)
}, 4000)

const dripit = ref(true)

</script>

<style>
/*SVG DRIP STYLES*/
:root {
  --drip-color: #e09201;
  --drip-left: 1rem;
  --drip-opacity: 0.5;
}
div.header {
  left: 0;
  height: 2.5rem;
  width: 0rem;
  position: relative;
  opacity: var(--drip-opacity);
}
div.header .drip {
  position: absolute;
  background: var(--drip-color);
  width: 5.525rem;
  height: 25%;
  bottom: 0.125rem;
  left: 0;
  cursor: pointer;
  filter: url("#goo");
}
div.header .drip .drop {
  position: absolute;
  top: 0;
  left: calc(var(--drip-left) + 1.75rem);
  width: 1.875rem;
  height: 5rem;
  border-radius: 50%;
  background: var(--drip-color);
  transition: all 0.4s ease;
}
div.header .drip .drop:hover {
  height: 120px;
}
div.header .drip .droplet {
  position: absolute;
  top: 0;
  left: var(--drip-left);
  width: 1.25rem;
  height: 3.638rem;
  border-radius: 50%;
  background: var(--drip-color);
  transition: all 0.4s ease;
  -webkit-animation: droplet 1.4s 0.4s cubic-bezier(0.895, 0.03, 0.685, 0.22) 1;
  animation: droplet 1.4s 0.4s cubic-bezier(0.895, 0.03, 0.685, 0.22) 1;
}
div.header .drip .droplet:hover {
  top: 1.25rem;
  width: 2.5rem;
  left: var(--drip-left);
  -webkit-animation: reset;
  animation: reset;
}
div.header .drip .droplet2 {
  position: absolute;
  top: 1.25rem;
  left: calc(var(--drip-left) + 1.875rem);
  width: 1.25rem;
  height: 2.188rem;
  border-radius: 50%;
  z-index: 3;
  background: var(--drip-color);
  transition: all 0.4s ease;
}
div.header .drip .droplet2.dripit {
  -webkit-animation: droplet 1s 0.6s cubic-bezier(0.895, 0.03, 0.685, 0.22) 1;
  animation: droplet 1s 0.6s cubic-bezier(0.895, 0.03, 0.685, 0.22) 1;
}

/*header*/
@-webkit-keyframes drop {
  0% {
    transform: translate(0, 0);
  }
  50% {
    height: 2.5rem;
    width: 2.5rem;
  }
  100% {
    transform: translate(0, 34.375rem);
  }
}
@keyframes drop {
  0% {
    transform: translate(0, 0);
  }
  50% {
    height: 2.5rem;
    width: 2.5rem;
  }
  100% {
    transform: translate(0, 34.375rem);
  }
}
@-webkit-keyframes droplet {
  0% {
    transform: translate(0, 0);
  }
  50% {
    height: 1.875rem;
    width: 1.875rem;
  }
  100% {
    transform: translate(0, 43.75rem);
  }
}
@keyframes droplet {
  0% {
    transform: translate(0, 0);
  }
  50% {
    height: 1.875rem;
    width: 1.875rem;
  }
  100% {
    transform: translate(0, 43.75rem);
  }
}
</style>

