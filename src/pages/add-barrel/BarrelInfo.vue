<template>
  <div class="h-auto ml-5 bg-speedOfLight w-[675px] px-7 pb-20">
    <div class="pt-7 pb-7 font-serif font-bold text-2xl">
      Describe the Product
    </div>
    <form @submit.prevent="goToReserve">
      <div class="pb-7">
        <div class="text-lg font-source pb-3">
          Lot Name
        </div>
        <TextInput
          v-model="state.barrel.title"
          :error="state.title.hasError"
          class="w-full bg-white"
          placeholder="Lot Name"
          :disabled="processing"
        />
        <div
          v-if="state.title.hasError"
          class="pt-1 text-sm text-planetOfTheApes"
        >
          {{ state.title.label }}
        </div>
      </div>

      <div class="pb-7">
        <div class="text-lg font-source pb-3">
          Lot Description
        </div>
        <TextInput
          v-model="state.barrel.description"
          :error="state.description.hasError"
          class="w-full bg-white"
          placeholder="Lot Description"
          :disabled="processing"
        />
        <div
          v-if="state.description.hasError"
          class="pt-1 text-sm text-planetOfTheApes"
        >
          {{ state.description.label }}
        </div>
      </div>

      <div class="pb-7">
        <div class="text-lg font-source pb-3">
          Distillery Name
        </div>
        <TextInput
          v-model="state.barrel.distilleryName"
          :error="state.distilleryName.hasError"
          class="w-full bg-white"
          placeholder="Distillery Name"
          :disabled="processing"
        />
        <div
          v-if="state.distilleryName.hasError"
          class="pt-1 text-sm text-planetOfTheApes"
        >
          {{ state.distilleryName.label }}
        </div>
      </div>

      <div class="pb-7">
        <div class="text-lg font-source pb-3">
          Distillery Location
        </div>
        <TextInput
          v-model="state.barrel.distilleryLocation"
          :error="state.distilleryLocation.hasError"
          class="w-full bg-white"
          placeholder="Distillery Location"
          :disabled="processing"
        />
        <div
          v-if="state.distilleryLocation.hasError"
          class="pt-1 text-sm text-planetOfTheApes"
        >
          {{ state.distilleryLocation.label }}
        </div>
      </div>

      <div class="flex pb-7 justify-center">
        <div class="w-full m-auto mr-8">
          <div class="text-lg font-source pb-3">
            Type
          </div>
          <SelectField
            v-model="state.barrel.type"
            :options-object="types"
            label="Select Type"
            :error="state.type.hasError"
            :disabled="processing"
          />
          <div
            v-if="state.type.hasError"
            class="pt-1 text-sm text-planetOfTheApes"
          >
            {{ state.type.label }}
          </div>
        </div>
        <div class="w-full m-auto">
          <div class="text-lg font-source pb-3">
            Age
          </div>
          <SelectField
            v-model="state.barrel.age"
            :options="yearOptions"
            label="Select Year"
            :disabled="processing"
          />

          <div
            v-if="state.age.hasError"
            class="h-7"
          />
        </div>
      </div>

      <div class="flex items-start pb-7">
        <div class="pr-8 w-full">
          <div class="text-lg font-source pb-3">
            Size
          </div>
          <TextInput
            v-model="state.barrel.sizeMl"
            :error="state.size.hasError"
            white
            placeholder="Size"
            :disabled="processing"
          />
          <div
            v-if="state.size.hasError"
            class="pt-1 text-sm text-planetOfTheApes"
          >
            {{ state.size.label }}
          </div>
        </div>
        <div class="w-full">
          <div class="text-lg font-source pb-3">
            Strength
          </div>
          <TextInput
            v-model="state.barrel.strength"
            :error="state.strength.hasError"
            :disabled="processing"
            white
            placeholder="Strength"
          />
          <div
            v-if="state.strength.hasError"
            class="pt-1 text-sm text-planetOfTheApes"
          >
            {{ state.strength.label }}
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <MainButton
          type="submit"
          label="Continue"
          class="w-60 mt-8"
          :loading="processing"
          :disabled="processing || store.user?.userId.length < 1"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import { isNumber } from "@vueuse/core"
import { useStore } from "../../store"

import api from "../../api/api"
import type { BarrelApi, BarrelPatch } from "../../api/barrel"

const props = defineProps({
  revising: { type: String, default: "false" },
  barrelId: { type: String, default: "" },
  barrelPatch: { type: Object as PropType<BarrelPatch>, default: undefined }
});

const emit = defineEmits(["continue", "updateBarrelInfo"]);
const store = useStore()

if (store.user.userId === "") {
  void store.getCurrentUser();
}

const state = reactive({
  assetFiles: [] as string[],
  assetFileProgress: [] as number[],
  title: { hasError: false, label: "Lot Name is required" },
  description: { hasError: false, label: "Lot Description is required" },
  distilleryName: { hasError: false, label: "Distillery Name is required" },
  distilleryLocation: {
    hasError: false,
    label: "Distillery Location is required",
  },
  type: { hasError: false, label: "Type is required" },
  age: { hasError: false, label: "Age is required" },
  strength: { hasError: false, label: "Strength is required" },
  size: { hasError: false, label: "Size requires a valid number" },
  barrel: {
    title: props.barrelPatch?.title ?? "",
    description: props.barrelPatch?.description ?? "",
    type: props.barrelPatch?.type ?? "",
    distilleryLocation: props.barrelPatch?.distilleryLocation ?? "",
    distilleryName: props.barrelPatch?.distilleryName ?? "",
    age: props.barrelPatch?.age ?? "",
    strength: props.barrelPatch?.strength ?? "",
    sizeMl: props.barrelPatch?.sizeMl ?? "",
    bottles: {},
  } as BarrelApi,
  revising: props.revising == "true"
})

const types = ref({
  Islay: "Islay",
  Malt: "Malt",
  Speyside: "Speyside",
  Highland: "Highland",
});

const yearOptions = generateYearOptions();

function generateYearOptions(): string[] {
  const yearOptions = [] as string[];

  for (let i = 1990; i <= ((new Date()).getFullYear()); i++) {
    yearOptions.push(`${i}`);
  }

  return yearOptions;
}

function continueToNext(barrelId: string) {
  emit("updateBarrelInfo", state.barrel);
  emit("continue", barrelId, "create-barrel.info")
}

function checkError() {
  let hasError = false
  state.title.hasError = state.barrel.title?.length < 1
  hasError = hasError || state.title.hasError
  state.description.hasError = state.barrel.description?.length < 1
  hasError = hasError || state.description.hasError
  state.distilleryName.hasError = state.barrel.distilleryName?.length < 1
  hasError = hasError || state.distilleryName.hasError
  state.distilleryLocation.hasError = state.barrel.distilleryLocation?.length < 1
  hasError = hasError || state.distilleryLocation.hasError
  state.type.hasError = state.barrel.type?.length < 1
  hasError = hasError || state.type.hasError
  state.age.hasError = state.barrel.age?.length < 1
  hasError = hasError || state.age.hasError
  state.strength.hasError = state.barrel.strength?.length < 1
  hasError = hasError || state.strength.hasError

  if (state.barrel.sizeMl == null) {
    state.size.hasError = true
  } else {
    if (!isNumber(state.barrel.sizeMl) && !isNaN(Number.parseInt(state.barrel.sizeMl))) {
      state.barrel.sizeMl = Number.parseInt(state.barrel.sizeMl)
      state.size.hasError = isNaN(state.barrel.sizeMl) || state.barrel.sizeMl <= 0
    } else {
      // it still might be a number
      state.size.hasError = !isNumber(state.barrel.sizeMl)
    }
  }
  hasError = hasError || state.size.hasError
  if (hasError) throw new Error("missing values")
}

const error = ref(false)
const processing = ref(false)

async function goToReserve() {
  if (!processing.value && store.user.userId !== "") {
    try {
      checkError()
      processing.value = true
      state.barrel.bottles = {}

      const barrelPatch = {
        title: state.barrel.title,
        description: state.barrel.description,
        distilleryName: state.barrel.distilleryName,
        distilleryLocation: state.barrel.distilleryLocation,
        type: state.barrel.type,
        age: state.barrel.age,
        sizeMl: state.barrel.sizeMl,
      }

      const barrel = state.revising ? await api.editBarrel(props.barrelId, { body: barrelPatch }) : await api.createBarrel({
        body: state.barrel,
      })
      
      continueToNext(barrel.barrelId)
    } catch (e) {
      error.value = true
    } finally {
      processing.value = false
    }
  }
}

</script>
