<template>
  <div
    data-cy="admin-members-list-table"
    class="py-6"
  >
    <table class="cursor-default w-full border border-unicornSilver rounded">
      <thead class="w-full bg-unicornSilver">
        <tr class="pr-4 bg-opacity-30 text-left font-source font-semibold text-xs h-10">
          <th
            class="pl-4 cursor-pointer"
            @click="sortMembersList"
          >
            <div class="flex items-center">
              <div class="pr-1">
                MEMBER
              </div>
              <img
                class="transition-all duration-300 w-1.5 h-1"
                :class="{
                  '-rotate-180': state.sortBy !== 'ascending'
                }"
                src="../../../../assets/arrow_down_table.svg"
                alt="down arrow"
              >
            </div>
          </th>
          <th>TYPE</th>
          <!-- <th>LAST VISIT</th> -->
          <th>BALANCE</th>
          <!-- <th>VISITS</th> -->
          <th>BIDS</th>
          <th>WINS</th>
          <!-- <th>SPENT</th> -->
          <!-- <th>LOTS</th> -->
          <th>REVENUE</th>
          <th />
        </tr>
      </thead>
      <tbody
        v-for="(member, i) in paginated"
        :key="i"
        class="border-b border-unicornSilver text-left hover:bg-speedOfLight"
      >
        <tr
          class="h-12 font-source text-sm pl-4"
          @click="handleRedirect(member.userId)"
        >
          <td class="pl-4">
            <div>{{ member.displayName }}</div>
            <div data-cy="admin-member-email" class="font-light">
              {{ member.email }}
            </div>
          </td>

          <td class="text-[11px] font-semibold ml-auto">
            <div
              :class="[
                'text-center mr-5 py-0.5 whitespace-nowrap rounded-full',
                {
                  'bg-wildPrimrose w-14': member.kind?.status == 'buyer',
                  'bg-purpleIllusion w-14': member.kind?.status == 'seller',
                  'bg-mountainMint w-24': member.kind?.status == 'buyer & seller',
                },
              ]"
            >
              {{ member.kind?.status }}
            </div>
          </td>

          <!-- <td>
            <div class="flex items-center">
              <div>
                {{ member.lastVisited.toDateString().substr(4, 3) }}
                {{ member.lastVisited.getDate() }}
                {{ member.lastVisited.getFullYear() }}
              </div>
              <div class="px-1">
                at
              </div>
              <div>{{ member.lastVisited.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) }}</div>
            </div>
          </td> -->
          <td>{{ member.stats?.balance }}</td>
          <!-- <td>{{ member.visits }}</td> -->
          <td>{{ member.stats?.bidCount }}</td>
          <td>{{ member.stats?.bidWins }}</td>
          <!-- <td>{{ member.spent }}</td> -->
          <!-- <td>{{ member.lots }}</td> -->
          <td>{{ member.stats?.revenue }}</td>
          <td>
            <img
              src="../../../../assets/right_chevron.svg"
              alt="right chevron"
            >
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="pt-6 pb-10 font-source font-light text-sm flex justify-between items-center"
    >
      <div>{{ calculateItem }} of {{ state.members.length }}</div>
      <div class="flex items-center">
        <div
          class="items-center flex transition-all duration-300"
          :class="{
            'opacity-100': state.current !== 0,
            'opacity-50': state.current == 0
          }"
        >
          <img
            class="w-3 h-3 mr-2 cursor-pointer"
            src="../../../../assets/double_left.svg"
            alt="double-left chevron"
            @click="first"
          >
          <img
            class="mr-2"
            src="../../../../assets/arrow_left.svg"
            alt="arrow right"
            @click="previous"
          >
        </div>
        <div
          v-for="i in state.pageNumber"
          :key="i"
        >
          <div
            class="transition-all duration-300 mr-4 cursor-pointer"
            :class="{
              'text-planetOfTheApes font-semibold border border-planetOfTheApes px-2 py-1': state.current + 1 == i
            }"
            @click="selectPageNumbers(i)"
          >
            {{ i }}
          </div>
        </div>
        <div
          class="items-center flex transition-all duration-300"
          :class="{
            'opacity-100': state.current !== state.last,
            'opacity-50': state.current == state.last
          }"
        >
          <img
            class="rotate-180 mr-2"
            src="../../../../assets/arrow_left.svg"
            alt="arrow right"
            @click="next"
          >
          <img
            class="w-3 h-3 cursor-pointer"
            src="../../../../assets/double_right.svg"
            alt="double-right chevron"
            @click="last"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import router from "../../../../router"
import type { PropType } from "vue";
import type { User } from "../../../../api/user";
import api from "../../../../api/api";

  onMounted(async () => {
    state.members = await api.getAllUsers();
    pageNumbers();
  });

const props = defineProps({ modelValue: { type: Array as PropType<Array<User>>, required: true } });

const state = reactive({
  sortBy: "ascending" || "descending" || "clear",
  members: [] as User[],
  pageSize: 10,
  current: 0,
  previous: -1,
  next: 1,
  first: 0,
  last: 0,
  pageNumber: [] as number[],
  /** possibly be of use when back end has their pagination going for us  */
  // startIndex: 0,
  // endIndex: 0,
})

const emit = defineEmits(["sorted"])

function pageNumbers() {

    state.pageNumber = Array.from(
      { length: Math.ceil(state.members.length / 10) },
      (_, i) => i + 1
    );
    state.last = state.pageNumber.length - 1;
  }


function selectPageNumbers(index: number) {
  state.current = index -= 1
  state.next = index += 1
  state.previous = index -= 1
}

const paginated = computed(() => {
  return state.members.slice(
    state.current * state.pageSize,
    state.current * state.pageSize + state.pageSize
  ) as User[];
});

  const calculateItem = computed(() => {
    const startIndex = (state.current * state.pageSize) + 1;
    return `${startIndex} - ${startIndex + (paginated.value.length - 1)}`;
  })

  function previous(): void {
    if (state.current == 0) return;
    else if (state.previous == 0) {
      state.current -= 1;
      state.previous = -1;
      state.next -= 1;
    } else {
      state.current -= 1;
      state.previous -= 1;
      state.next -= 1;
    }
  }

  function next(): void {
    if (state.current == state.last) return;
    if (state.next == state.last) {
      state.current += 1;
      state.previous += 1;
      state.next = state.last;
    } else {
      state.current += 1;
      state.previous += 1;
      state.next += 1;
    }
  }

  function first(): void {
    state.current = 0;
    state.previous = -1;
    state.next = 1;
  }

  function last(): void {
    state.current = state.last;
    state.previous = state.current - 1;
    state.next = state.last;
  }

function sortMembersList(): void {
  switch (state.sortBy) {
    case "ascending":
      state.members = state.members.sort((current, next) => (current.displayName > next.displayName) ? 1 : ((next.displayName > current.displayName) ? -1 : 0));
      state.sortBy = "descending"
      emit("sorted", state.members);
      break;
    case "descending":
      state.members = state.members.sort((current, next) => (current.displayName < next.displayName) ? 1 : ((next.displayName < current.displayName) ? -1 : 0));
      state.sortBy = "clear";
      emit("sorted", state.members);
      break;
    case "clear":
      state.members = props.modelValue;
      state.sortBy = "ascending";
      emit("sorted", state.members);
      break;
    default:
      throw new Error("There is an issue in sortMembersList");
  }
}

async function handleRedirect(userId: string) {
  await router.push({ name: "admin.member.info", params: { userId: userId } })
}

</script>
