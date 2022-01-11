<template>
  <div>
    <div
      :class="[
        ' py-3',
        'appearance-none outline-none rounded',
        'flex flex-col justify-center',
        'letterspacing relative',
        {
          'border-planetOfTheApes': error,
        },
      ]"
      :tabindex="0"
      @blur="state.showDropdown = false"
    >
      <div
        class="flex items-center justify-between ml-4 h-11 bg-white"
        @click="state.showDropdown = !state.showDropdown"
      >
        <!-- default nothing selected -->

        <div
          v-if="selected == false"
          :class="{ ' font-source font-semibold ': !selected }"
        >
          Choose Payment
        </div>
        <!-- Card option -->

        <div
          v-if="selected == true && selectedAbbrev.type === 'Card'"
          :class="[
            'flex items-center',
            {
              'font-source font-semibold': !selected,
              'font-source font-semibold': selected,
            },
          ]"
        >
          <img
            src="../../../../assets/cards.svg"
            alt="card payments"
            class="h-5 w-5 mr-4"
          >
          <div class="font-source">
            <div class="font-semibold">
              {{ selectedAbbrev.network }}
            </div>
            <div class="text-sm">
              ***{{ selectedAbbrev.last4 }}
            </div>
          </div>
        </div>
        <!-- Bank option -->
        <div
          v-if="selected == true && selectedAbbrev.type === 'Bank'"
          :class="[
            'flex items-center',
            {
              'font-source font-semibold': !selected,
              'font-source font-semibold': selected,
            },
          ]"
        >
          <img
            src="../../../../assets/bank.svg"
            alt="bank"
            class="h-5 w-5 mr-4"
          >
          <div class="font-source">
            <div class="font-semibold">
              {{ returnTrimmed(selectedAbbrev.institutionName) }}
            </div>
            <div class="text-sm">
              {{ selectedAbbrev.redactedAccountNumber }}
            </div>
          </div>
        </div>
        <div class="bg-planetOfTheApes p-3 rounded-full">
          <img
            src="../../../../assets/arrow_down_white.svg"
            class="m-auto"
            alt="down arrow"
          >
        </div>
      </div>

      <div
        v-if="newUser"
        class="relative"
      >
        <div
          v-if="!mobile"
          :class="[
            'w-72  absolute right-0 shadow-2xl mt-4 max-h-44',
            'transition-all duration-300 transform z-10 ',
            'bg-white rounded',
            {
              'opacity-100 translate-y-0 ': state.showDropdown,
              'opacity-0 -translate-y-4 invisible': !state.showDropdown,
            },
          ]"
        >
          <div class="pt-2 px-2 flex flex-col items-center">
            <div
              class="bg-speedOfLight h-24 text-center px-10 py-6"
            >
              No previous payment methods saved.
            </div>
            <div @click="goToProfile">
              <a
                class="text-planetOfTheApes pt-6 pb-7"
                href="#"
              >+ Add a Payment Method</a>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="relative"
      >
        <!-- dropp down selections  -->
        <div
          v-if="!mobile"
          :class="[
            'w-80  absolute right-0 shadow-2xl mt-4 max-h-44 overflow-y-scroll',
            'transition-all duration-300 transform z-10 ',
            'bg-white rounded',
            {
              'opacity-100 translate-y-0 ': state.showDropdown,
              'opacity-0 -translate-y-4 invisible': !state.showDropdown,
            },
          ]"
        >
          <div>
            <div
              v-for="(option, i) in state.cards"
              :key="i"
              class="flex items-center j border-b border-unicornSilver pb-4 pt-5 pr-5 pl-6 cursor-pointer"
              @click="handleClickOption(i)"
            >
              <img
                v-if="option.type === 'Bank'"
                class="mr-4 w-5 h-5"
                src="../../../../assets/bank.svg"
                alt="bank"
              >
              <img
                v-if="option.type === 'Card'"
                class="mr-4 w-5 h-5"
                src="../../../../assets/cards.svg"
                alt="bank"
              >

              <div class="flex flex-col mr-10">
                <div
                  v-if="option.type === 'Card'"
                  class="font-semibold"
                >
                  {{ option.network }}
                </div>
                <div
                  v-if="option.type === 'Bank'"
                  class="font-semibold"
                >
                  {{ returnTrimmed(option.institutionName) }}
                </div>
                <div
                  v-if="option.type === 'Card'"
                  class="text-sm"
                >
                  {{ option.last4 }}
                </div>
                <div
                  v-if="option.type === 'Bank'"
                  class="text-sm"
                >
                  {{ option.redactedAccountNumber }}
                </div>
              </div>
              <div
                v-if="selectedItem == i"
                class="rounded-3xl ml-auto bg-speedOfLight px-5 py-2"
              >
                selected
              </div>
            </div>
            <div
              class="flex justify-center items-center"
              @click="goToProfile"
            >
              <a
                class="text-planetOfTheApes pt-6 pb-7"
                href="#"
              >+ Add a Payment Method</a>
            </div>
          </div>
        </div>
      </div>
      <!-- this only shows on a actual mobile device -->
      <select
        v-if="mobile"
        class="absolute top-0 right-0 left-0 bottom-0 w-full opacity-0"
        :value="selected"
        @change="handleChangeNativeSelect"
      >
        <option
          v-for="(option, i) of Object.keys(state.cards)"
          :key="i"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { CardPayment } from "../../../../api/payments";
import { useStore } from "../../../../store";

// import usePlatform from "../../../hooks/platform";
import router from "../../../../router";
import type { PropType } from "vue";
import { onBeforeRouteUpdate } from "vue-router";

const props = defineProps({
  modelValue: { type: Object as PropType<CardPayment>, required: true },
  error: Boolean,
  newUser: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const store = useStore();

onMounted(async () => {
  // mobile.value = await usePlatform();
  state.cards = await store.getPaymentMethods()
});

const state = reactive({
  indexOfSelected: 0,
  showDropdown: false,
  cards:
    [{
      type: "",
      cardId: "",
      network: "",
      last4: "",
      expMonth: null,
      expYear: null,
      createdAt: "",
      updatedAt: null,
      bankAccountId: "",
      institutionName: "",
      redactedAccountNumber: "",
    }] as CardPayment[],
});

const mobile = ref(false);
const selectedItem = ref();
const selected = ref<boolean>(false);
const selectedAbbrev = ref();

onBeforeRouteUpdate(() => {
  selected.value = false;
});

function handleClickOption(i: number): void {
  state.indexOfSelected = i;
  state.showDropdown = false;
  selected.value = true;
  selectedItem.value = Object.keys(state.cards)[i];
  selectedAbbrev.value = Object.values(state.cards)[i];
  emit("update:modelValue", selectedAbbrev.value);
}

function handleChangeNativeSelect(event: Event): void {
  const value = (event.target as HTMLSelectElement).value;
  const index = Object.keys(state.cards).findIndex(
    (option) => option === value
  );
  handleClickOption(index);
}

async function goToProfile(): Promise<void> {
  await router.push({ name: "add.payment" });
}

let truncate = " ...";

function returnTrimmed(name: string) {
  if (name.length > 12) {
    var maxLength = 8;
    var trimmedString = name.substr(0, maxLength);
    return (trimmedString = trimmedString
      .substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
      )
      .concat(truncate));
  } else {
    return name;
  }
}

watch(
  () => props.modelValue,
  () => {
    selectedAbbrev.value = props.modelValue;
    emit("update:modelValue", selectedAbbrev.value);
  }
);

</script>
