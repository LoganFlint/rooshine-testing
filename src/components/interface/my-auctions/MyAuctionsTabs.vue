<template>
  <div class="flex flex-col">
    <div class="rounded pt-7 bg-white border border-unicornSilver flex">
      <div class="flex flex-grow justify-between items-start">
        <div class="pl-7 flex flex-col w-full">
          <div class="font-serif font-bold text-2xl pb-6">
            My Auctions
          </div>
          <div class="flex w-full justify-between">
            <div class="flex h-7">
              <NavLink
                v-for="(tabName, index) in leftTabs"
                :key="index"
                :text="tabName"
                :active="tabName.toLowerCase() === currentStep || (currentStep === '' && index === 0)"
                class="pr-5"
                @click="tabChanged(tabName)"
              />
            </div>
            <div class="pr-6">
              <NavLink
                v-if="rightTab"
                :text="rightTab"
                :active="rightTab.toLowerCase() === currentStep"
                @click="tabChanged(rightTab)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue"
import type { MyAuctionsTabOption } from "../../../api/modules/register"

const props = defineProps({
  myAuctionsSteps: { type: Array as PropType<Array<string>>, default: [] as Array<string> },
  currentStep: { type: String as PropType<MyAuctionsTabOption>, default: "" },
});

const emit = defineEmits(["tabChanged"]);

function tabChanged(tabName: string | null) {
  emit("tabChanged", tabName?.toLowerCase())
}

/** seperates every word first, then title cases each word, in each element of the array */
function titleCaseArray(tabArray: Array<string>) {
  return tabArray.map(
    name =>
      name
        .split(" ") // split by word
        .map(word => word.slice(0, 1).toUpperCase() + word.slice(1)) // title case it
        .join(" ") // join by word
  )
}

const tabs = titleCaseArray(ref(props.myAuctionsSteps).value)
const rightTab = tabs.length > 1 ? tabs[tabs.length - 1] : null

const leftTabs = tabs.length > 1 ? tabs.slice(0, tabs.length - 1) : tabs

</script>
