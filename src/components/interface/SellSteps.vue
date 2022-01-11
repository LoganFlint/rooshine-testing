<template>
  <div class="bg-speedOfLight rounded h-auto max-w-5xl pl-7 pt-7 pr-9 pb-10 mb-9">
    <div class="font-serif font-bold flex items-center pb-6">
      <div class="text-5xl text-planetOfTheApes pr-8">
        {{ number }}
      </div>
      <div class="text-2xl">
        {{ title }}
      </div>
      <img
        v-if="currentVisible"
        class="w-6 h-3 ml-auto cursor-pointer"
        src="../../assets/arrow_up.svg"
        alt="arrow down"
        @click="changeVisible"
      >
      <img
        v-else
        class="ml-auto w-6 h-3 cursor-pointer"
        src="../../assets/arrow_down.svg"
        alt="arrow up"
        @click="changeVisible"
      >
    </div>
    <div
      :class="[
        'flex flex-col',
        {
          hidden: !currentVisible,
        },
      ]"
    >
      <div class="flex font-source text-xl pl-14">
        <div class="pr-12">
          <div class="flex max-w-sm">
            {{ description }}
          </div>
          <div class="pt-6 w-full">
            <a
              v-if="link"
              class="text-planetOfTheApes text-lg"
              :href="link"
            >Click Here</a>
            {{ linkDescription }}
          </div>
        </div>

        <img
          v-if="image"
          class="h-72 max-w-md ml-auto"
          :src="image"
          alt="example image"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  number: { type: Number, default: 1 },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  link: { type: String, default: "" },
  linkDescription: { type: String, default: "" },
  image: { type: String, default: null },
});

onMounted(() => {
  alwaysOpen()
});

const currentVisible = ref(false);

function changeVisible(): void {
  currentVisible.value = !currentVisible.value
}

function alwaysOpen(): void {
  if (props.number === 1) {
    currentVisible.value = !currentVisible.value
  }
}

</script>
