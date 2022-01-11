<template>
  <div>
    <div class="relative">
      <div
        name="click-carousel"
        tag="div"
        class="border border-unicornSilver flex w-[550px] h-[500px]"
      >
        <img
          id="imageCarousel"
          class="object-contain m-auto"
          draggable="false"
          :src="currentImg"
          alt="image carousel"
        >
      </div>
      <div
        class="flex absolute top-1/2 -left-5 border-unicornSilver border rounded-full w-10 h-10 items-center justify-center bg-white cursor-pointer"
        :class="{ 'opacity-50': state.currentIndex === 0 }"
        @click="prev"
      >
        &#10094;
      </div>
      <div
        class="flex absolute top-1/2 -right-5 border border-unicornSilver rounded-full w-10 h-10 items-center justify-center bg-white cursor-pointer"
        :class="{
          'opacity-50': images && state.currentIndex === images.length - 1,
        }"
        @click="next"
      >
        &#10095;
      </div>

      <div class="flex absolute -bottom-4 left-5">
        <div class="flex mx-auto my-4">
          <div
            v-for="index in images.keys()"
            :key="index"
          >
            <div
              :class="{
                'mr-1.5 mb-5 w-3 h-3 cursor-pointer border border-black  rounded-full': true,
                'bg-white': index !== state.currentIndex,
                'bg-black': index === state.currentIndex,
              }"
              @click="setIndex(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue"

export default defineComponent({
	props: {
		images: { type: Array as PropType<Array<string>>, default: [] as Array<string> },
	},
	setup(props) {
		const state = reactive({
			timer: null,
			currentIndex: 0,
			initialXPosition: null,
		})
		const currentImg = computed(() => {
			return props.images ? props.images[Math.abs(state.currentIndex) % props.images.length] : ""
		})
		function prev() {
			if (state.currentIndex === 0) return
			state.currentIndex = (state.currentIndex - 1) % props.images.length
		}
		function next() {
			if (state.currentIndex === props.images.length - 1) return
			state.currentIndex = (state.currentIndex + 1) % props.images.length
		}
		function setIndex(index: number) {
			state.currentIndex = index
		}
		return { currentImg, state, setIndex, prev, next }
	},
})
</script>
