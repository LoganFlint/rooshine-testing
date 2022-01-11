<template>
  <div>
    <img
      class="absolute h-96 w-screen object-cover"
      :src="currentImg"
      alt="image"
    >

    <div
      :class="[
        'absolute flex',
        {
          'w-full justify-center align-bottom bottom-10': review,
          'right-24 bottom-16': !review,
        },
      ]"
    >
      <div
        v-for="index of images.keys()"
        :key="index"
      >
        <div
          :class="[
            ' cursor-pointer h-1 w-11 bg-white mr-1.5 ',
            {
              'opacity-50': index !== currentIndex,
            },
          ]"
          @click="setIndex(index)"
        />
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import type { PropType } from "vue";

export default defineComponent({
  props: {
    images: { type: Array as PropType<string[]>, required: true },
    review: Boolean,
  },
  emits: ["changeIndexTo"],

  setup(props, { emit }) {
    const currentIndex = ref(0);

    const currentImg = computed(() => props.images[currentIndex.value]);

    function setIndex(index: number) {
      currentIndex.value = index;
      emit("changeIndexTo", index);
    }

    return { currentImg, currentIndex, setIndex };
  },
});
</script>
