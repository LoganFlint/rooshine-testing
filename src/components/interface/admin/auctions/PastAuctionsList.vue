<template>
  <div
    data-cy="admin-past-auction-list-table"
    class="pr-10"
  >
    <table class="cursor-default w-full border border-unicornSilver rounded">
      <thead class="w-full bg-unicornSilver">
        <tr
          class="
            pr-4
            bg-opacity-30
            text-left
            font-source font-semibold
            text-xs
            h-10
          "
        >
          <th class="pl-4">
            NAME
          </th>
          <th>LOT COUNT</th>
          <th>
            <div class="flex items-center">
              <div
                class="pr-1 cursor-pointer"
                @click="sortStartDates"
              >
                START DATE
              </div>
              <img
                class="transition-all duration-300 w-1.5 h-1"
                :class="{
                  '-rotate-180': state.startDates !== 'ascending'
                }"
                src="../../../../assets/arrow_down_table.svg"
                alt="down arrow"
              >
            </div>
          </th>
          <th>
            <div
              class="flex items-center cursor-pointer"
              @click="sortEndDates"
            >
              <div class="pr-1">
                END DATE
              </div>
              <img
                class="transition-all duration-300 w-1.5 h-1"
                :class="{
                  '-rotate-180': state.endDates !== 'ascending'
                }"
                src="../../../../assets/arrow_down_table.svg"
                alt="down arrow"
              >
            </div>
          </th>
          <th>PARTICIPANTS</th>
          <th class="text-right">
            TOTAL REVENUE
          </th>
          <th />
        </tr>
      </thead>
      <tbody
        v-for="(auctions, i) in modelValue"
        :key="i"
        class="border-b border-unicornSilver text-left hover:bg-speedOfLight"
      >
        <tr
          class="h-12 font-source text-sm pl-4"
        >
          <td data-cy="past-auction-name" class="pl-4">
            {{ auctions.name }}
          </td>
          <td class="w-48">
            {{ auctions.lotCount }}
          </td>
          <td>
            {{ auctions.startDate.toDateString().substr(4, 3) }}
            {{ auctions.startDate.getDate() }}
            {{ auctions.startDate.getFullYear() }}
          </td>
          <td>
            {{ auctions.endDate.toDateString().substr(4, 3) }}
            {{ auctions.endDate.getDate() }}
            {{ auctions.endDate.getFullYear() }}
          </td>
          <td class="w-20">
            {{ auctions.participants }}
          </td>
          <td class=" text-right">
            {{ auctions.revenue }}
          </td>
          <td>
            <div class="pl-4">
              <img
                class="cursor-pointer ml-auto mr-4"
                src="../../../../assets/menu_list_button.svg"
                alt="menu button"
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

  <script setup lang="ts">
  import type { PropType } from "vue"
  import type { Auction } from "../../../../api/auction"

const emit = defineEmits(['sortedStartDates', 'sortedEndDates'])

const props = defineProps({
  modelValue: { type: Array as PropType<Array<Auction>>, required: true },
})

const state = reactive({
  startDates: "ascending" || "descending" || "clear",
  endDates: "ascending" || "descending" || "clear",
  auctions: props.modelValue
})

function sortStartDates(): void {
  switch (state.startDates) {
    case "ascending":
      state.auctions = state.auctions.sort((current, next) => (current.startDate > next.startDate) ? 1 : ((next.startDate > current.startDate) ? -1 : 0));
      state.startDates = "descending"
      emit("sortedStartDates", state.auctions);
      break;
    case "descending":
      state.auctions = state.auctions.sort((current, next) => (current.startDate < next.startDate) ? 1 : ((next.startDate < current.startDate) ? -1 : 0));
      state.startDates = "clear";
      emit("sortedStartDates", state.auctions);
      break;
    case "clear":
      state.auctions = props.modelValue;
      state.startDates = "ascending";
      emit("sortedStartDates", state.auctions);
      break;
    default:
      throw new Error("There is an issue in sortStartDates");
  }
}

function sortEndDates(): void {
  switch (state.endDates) {
    case "ascending":
      state.auctions = state.auctions.sort((current, next) => (current.endDate > next.endDate) ? 1 : ((next.endDate > current.endDate) ? -1 : 0));
      state.endDates = "descending"
      emit("sortedEndDates", state.auctions);
      break;
    case "descending":
      state.auctions = state.auctions.sort((current, next) => (current.endDate < next.endDate) ? 1 : ((next.endDate < current.endDate) ? -1 : 0));
      state.endDates = "clear";
      emit("sortedEndDates", state.auctions);
      break;
    case "clear":
      state.auctions = props.modelValue;
      state.endDates = "ascending";
      emit("sortedEndDates", state.auctions);
      break;
    default:
      throw new Error("There is an issue in sortEndDates");
  }
}
  </script>
