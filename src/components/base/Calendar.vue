<template>
  <div class="select-none w-64 h-72">
    <div class="w-full font-bold justify-center flex mb-2">
      <img
        class="m-auto p-4"
        src="../../assets/arrow_left.svg"
        alt="left"
        @click.exact="previousMonth"
        @click.shift="multiMonthSelectPrevious"
      >
      <div class="m-auto">
        {{ state.monthLabel }}
      </div>
      <img
        class="m-auto p-4 rotate-180"
        src="../../assets/arrow_left.svg"
        alt="right"
        @click.exact="nextMonth"
        @click.shift="multiMonthSelectNext"
      >
    </div>
    <div class="w-full flex">
      <div
        v-for="(day, i) in weekday"
        :key="buildWeekdayKey(i, day)"
        class="w-full text-center mb-2"
      >
        <div class="w-full">
          {{ day.substring(0, 2) }}
        </div>
      </div>
    </div>

    <div class="flex grid grid-cols-7 gap-2">
      <div
        v-for="(day, i) in days"
        :key="i"
      >
        <div
          class="rounded-lg transition-all duration-300 hover:cursor-pointer text-center"
          :class="{
            'text-lunarRock': day.selection !== 'current',
            'bg-planetOfTheApes text-white': day.selected && ((!state.multiMonthSelect.selecting && (isFirstSelected(i) || isLastSelected(i))) || ((state.multiMonthSelect.selecting && goingForward() && isLastSelected(i)) || (state.multiMonthSelect.selecting && goingBackward() && isFirstSelected(i)))),
            'bg-deliriousDonkey text-black':day.selected && ((!state.multiMonthSelect.selecting && !isFirstSelected(i) && !isLastSelected(i)) || ((state.multiMonthSelect.selecting && goingForward() && !isLastSelected(i) || (state.multiMonthSelect.selecting && goingBackward() && !isFirstSelected(i)))))
          }"
          @click="handleSelectDate($event, i)"
        >
          <div class="rounded">
            {{ day.day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue";

interface Day {
  day: number,
  selection: string,
  selected: boolean
}

interface Range {
  start: Date,
  end: Date
}

const props = defineProps({
  range: Boolean,
  start: { type: Date, default: new Date() },
  end: { type: Date, default: new Date() },
  modelValue: { type: Object as PropType<Range>, default: undefined }
});

const emit = defineEmits(["update:modelValue", "startDate", "endDate"]);

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const state = reactive({
  range: props.modelValue? props.modelValue : {
    start: props.start,
    end: props.end
  } as Range,
  monthLabel: `${months[(new Date()).getMonth()]} ${(new Date()).getFullYear()}`,
  firstSelected: -1,
  secondSelected: -1,
  clickCount: 0,
  dayIndices: [] as Day[],
  firstDay: new Date(),
  lastDay: new Date(),
  monthIndex: 0,
  previousMonthIndex: 0,
  nextMonthIndex: 0,
  year: 0,
  displacement: 0,
  postDisplacement: 0,
  multiMonthSelect: {
    selecting: false,
    originalMonthIndex: 0,
    originalDate: new Date()
  }
});

const days = computed(() => {
  state.monthIndex = months.indexOf(state.monthLabel.split(" ")[0]);
  state.previousMonthIndex = state.monthIndex == 0 ? 11 : state.monthIndex - 1;
  state.nextMonthIndex = state.monthIndex == 11 ? 0 : state.monthIndex + 1;
  state.year = Number(state.monthLabel.split(" ")[1]);

  if (!state.multiMonthSelect.selecting) state.multiMonthSelect.originalMonthIndex = state.monthIndex;

  const currentDayCount = new Date(state.year, state.monthIndex + 1, 0).getDate();

  const previousDayCount = new Date(state.year, state.previousMonthIndex + 1, 0).getDate();

  state.firstDay = new Date(state.year, state.monthIndex, 1);
  state.lastDay = new Date(state.year, state.monthIndex, currentDayCount);

  state.displacement = state.firstDay.getDay();
  state.postDisplacement = 6 - state.lastDay.getDay();

  state.dayIndices = [] as Day[];

  for (let i = state.displacement; i > 0; i--) {
    state.dayIndices.push({
      day: Number(previousDayCount - (i - 1)),
      selection: "previous",
      selected: false
    });
  }

  for (let i = 1; i <= currentDayCount; i++) {
    state.dayIndices.push({
      day: i,
      selection: "current",
      selected: false
    });
  }

  for (let i = 1; i <= state.postDisplacement; i++) {
    state.dayIndices.push({
      day: i,
      selection: "next",
      selected: false
    });
  }

  return state.dayIndices;
});

watch(() => state.multiMonthSelect.selecting, () => {
  if (state.multiMonthSelect.selecting == false) {
    state.multiMonthSelect.originalMonthIndex = state.monthIndex;
  }
});

function buildWeekdayKey(index: number, day: string): string {
  return `${day}:${index}`;
}

function multiMonthSelectPrevious(): void {
  previousMonth();
  state.multiMonthSelect.selecting = true;
}

function multiMonthSelectNext(): void {
  nextMonth();
  state.multiMonthSelect.selecting = true;
}

function previousMonth(): void {
  if(state.clickCount == 1) state.multiMonthSelect.selecting = true;
  state.monthIndex = state.monthIndex == 0 ? 11 : state.monthIndex - 1;
  state.previousMonthIndex = state.monthIndex == 0 ? 11 : state.monthIndex - 1;
  state.nextMonthIndex = state.nextMonthIndex == 0 ? 11 : state.nextMonthIndex - 1;

  if (state.monthIndex == 11) state.year--;
  state.monthLabel = `${months[state.monthIndex]} ${state.year}`;
}

function nextMonth(): void {
  if(state.clickCount == 1) state.multiMonthSelect.selecting = true;
  state.monthIndex = state.monthIndex == 11 ? 0 : state.monthIndex + 1;
  state.previousMonthIndex = state.monthIndex == 11 ? 0 : state.monthIndex - 1;
  state.nextMonthIndex = state.nextMonthIndex == 11 ? 0 : state.nextMonthIndex + 1;

  if (state.monthIndex == 0) state.year++;
  state.monthLabel = `${months[state.monthIndex]} ${state.year}`;
}

function handleSelectDate(e: MouseEvent, index: number): void {
  const monthSelection = getMonthSelection(index);

  if(props.range && days.value[index].selected && (days.value[index].day == state.range.start.getDate() || days.value[index].day == state.range.end.getDate()) || state.clickCount >= 2) {
    for(let i = 0; i < days.value.length; i++) {
      days.value[i].selected = false;
    }
    state.range.start = new Date();
    state.range.end = new Date();
    state.clickCount = 0;
    state.firstSelected = -1;
    state.secondSelected = -1;
    state.multiMonthSelect.selecting = false;
    return;
  }

  if (props.range) {
    state.clickCount++;
    const selected = days.value[index].selected;

    if (state.multiMonthSelect.selecting) {
      if ((state.range.start.getMonth() < state.monthIndex && state.year == state.multiMonthSelect.originalDate.getFullYear()) || state.year > state.multiMonthSelect.originalDate.getFullYear()) {
        selectMultipleDays(0, index, selected);
        endDate(monthSelection, index);
        state.range.start = state.multiMonthSelect.originalDate;
      }
      if ((state.range.start.getMonth() > state.monthIndex && state.year == state.multiMonthSelect.originalDate.getFullYear()) || state.year < state.multiMonthSelect.originalDate.getFullYear()) {
        selectMultipleDays(index, days.value.length - 1, selected);
        startDate(monthSelection, index);
        state.range.end = state.multiMonthSelect.originalDate;
      }
    } else {
      if(state.clickCount == 1) {
        state.firstSelected = index;
        state.secondSelected = state.firstSelected;
      }
      if(state.clickCount == 2) state.secondSelected = index;
      let lower = state.firstSelected;
      let higher = state.secondSelected;
      selectMultipleDays(lower, higher, selected);
      startDate(getMonthSelection(lower), lower);
      endDate(monthSelection, higher);
      state.multiMonthSelect.originalDate = state.range.start;
    }
  } else {
    state.multiMonthSelect.selecting = false;
    days.value[index].selected = !days.value[index].selected;
    state.multiMonthSelect.selecting = false;
    startDate(monthSelection, index);
    state.range.end = state.range.start;
    state.multiMonthSelect.originalDate = state.range.start;
    selectSingleDay(index);
  }

  if(props.range) {
    emit("update:modelValue", state.range);
    emit("startDate", state.range.start);
    emit("endDate", state.range.end);
  }
  else emit("startDate", state.range.start);
}

function selectMultipleDays(lower: number, higher: number, selected: boolean): void {
  for (let i = lower; i <= higher; i++) {
    days.value[i].selected = !selected;
  }
}

function selectSingleDay(index: number): void {
  for (let i = 0; i < days.value.length; i++) {
    if (i !== index) days.value[i].selected = false;
  }
}

function getMonthSelection(index: number): string {
  const dayCount = (new Date(state.year, state.monthIndex + 1, 0).getDate());
  if (state.displacement > index) {
    return "previous";
  } else if ((dayCount + (state.displacement - 1)) < index) {
    return "next"
  } else {
    return "current"
  }
}

function startDate(monthSelection: string, index: number): void {
  switch (monthSelection) {
    case "previous":
      state.range.start = new Date(state.previousMonthIndex == 11 ? state.year - 1 : state.year, state.previousMonthIndex, days.value[index].day);
      break
    case "next":
      state.range.start = new Date(state.nextMonthIndex == 0 ? state.year + 1 : state.year, state.nextMonthIndex, days.value[index].day);
      break;
    default:
      state.range.start = new Date(state.year, state.monthIndex, days.value[index].day);
  }
}

function endDate(monthSelection: string, index: number): void {
  switch (monthSelection) {
    case "previous":
      state.range.end = new Date(state.previousMonthIndex == 11 ? state.year - 1 : state.year, state.previousMonthIndex, days.value[index].day);
      break
    case "next":
      state.range.end = new Date(state.nextMonthIndex == 0 ? state.year + 1 : state.year, state.nextMonthIndex, days.value[index].day);
      break;
    default:
      state.range.end = new Date(state.year, state.monthIndex, days.value[index].day);
  }
}

function isFirstSelected(index: number): boolean {
  for(let i = 0; i < days.value.length; i++) {
    if(days.value[i].selected) return i == index;
  }
  return false;
}

function isLastSelected(index: number): boolean {
  if(index == days.value.length - 1) return selectedLastIndex();
  for(let i = 0; i < days.value.length - 1; i++) {
    if(days.value[i].selected && !days.value[i + 1].selected) {
      return i == index;
    }
  }
  return false;
}

function selectedLastIndex(): boolean {
  return days.value[days.value.length - 1].selected;
}

function goingForward(): boolean {
  if(!state.multiMonthSelect.selecting) return false;
  return (state.multiMonthSelect.originalDate.getMonth() < state.monthIndex) || (state.multiMonthSelect.originalDate.getMonth() > state.monthIndex && state.multiMonthSelect.originalDate.getFullYear() < state.year);
}

function goingBackward(): boolean {
  if(!state.multiMonthSelect.selecting) return false;
  return (state.multiMonthSelect.originalDate.getMonth() > state.monthIndex) || (state.multiMonthSelect.originalDate.getMonth() < state.monthIndex && state.multiMonthSelect.originalDate.getFullYear() > state.year);
}

</script>
