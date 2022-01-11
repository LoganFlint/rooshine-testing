<template>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 right-0 bottom-0"
    @click="close"
  />
  <div>
    <div
      :class="[
        'absolute rounded cursor pointer',
        {
          'opacity-100 translate-y-0': isOpen,
          'opacity-0 -translate-y-4 invisible': !isOpen,
        },
      ]"
    >
      <div class="relative right-[380px] top-2 transition-all duration-300 transform z-10 rounded font-source text-xl">
        <TextInput  
          v-model="searchItem"
          class="w-80 bg-speedOfLight"
          placeholder="Search"
          input-type="text"
          autocomplete="off"  
          @keydown.enter="search(searchItem)"
        />
        <div
          :class="[
            {
              'hidden': searchItem.length === 0,
              'bg-white shadow-md pl-5 pt-5 relative z-50 pb-4': searchItem.length >= 1
            },
          ]"
        >
          {{ searchItem }} 
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "../../../router"
defineProps({
    modelValue: { type: String, default: null },
    isOpen: { type: Boolean, default: false },
})

const emit = defineEmits(["close"])

const searchItem = ref<string>("")

function close() {
    emit("close")
}

async function search(search: string) {
  search = searchItem.value 
  emit("close", search)
  await router.push({ name: "live.auction", params: { search: search } })
  searchItem.value = ""
}

</script>
