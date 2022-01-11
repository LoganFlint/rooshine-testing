<template>
  <Filter
    v-for="(filterGroup, key) in state.filterGroups"
    :key="key"
    :filter-items="filterGroup.filters"
    :title="filterGroup.name"
    :open="filterGroup.open"
    @toggle="filterGroup.open = !filterGroup.open"
    @update-filters="updateLots"
  />

  <MainButton
    label="clear"
    class="py-1.5 w-36 mt-4"
    @click="resetFilters"
  />
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import type { Lot } from "../../../../api/lot";

export interface FilterItem {
	name: string,
	selected: boolean,
}

export interface FilterGroup {
	name: string,
	open: boolean,
	filters: { [key: string]: FilterItem }
}

const props = defineProps({
	lots: { type: Array as PropType<Array<Lot>>, default: [] as Array<Lot> },
	modelValue: { type: Boolean, default: false }
});
const emit = defineEmits({ "lotsUpdated": (lots: Array<Lot>) => lots, "update:modelValue": Boolean });

watch(() => props.modelValue, () => {
	if (props.modelValue === true) resetFilters();
});

watch(() => props.lots, () => {
	const countries: { [key: string]: FilterItem } = {};
	const distilleries: { [key: string]: FilterItem } = {};
	const age: { [key: string]: FilterItem } = {};
	const type: { [key: string]: FilterItem } = {};
	const size: { [key: string]: FilterItem } = {};
	const availability: { [key: string]: FilterItem } = {};

	for (const lot of props.lots) {
		countries[lot.barrel.distilleryLocation] = {
			name: lot.barrel.distilleryLocation,
			selected: state.filterGroups.country.filters[lot.barrel.distilleryLocation]?.selected ?? false
		}
		distilleries[lot.barrel.distilleryName] = {
			name: lot.barrel.distilleryName,
			selected: state.filterGroups.distilleries.filters[lot.barrel.distilleryName]?.selected ?? false
		}
		if (lot.barrel.age !== "") {
			age[lot.barrel.age] = {
				name: lot.barrel.age,
				selected: state.filterGroups.age.filters[lot.barrel.age]?.selected ?? false
			}
		}
		type[lot.barrel.type] = {
			name: lot.barrel.type,
			selected: state.filterGroups.type.filters[lot.barrel.type]?.selected ?? false
		}
		if (lot.barrel.sizeMl) {
			size[lot.barrel.sizeMl] = {
				name: `${lot.barrel.sizeMl / 10}cl`,
				selected: state.filterGroups.size.filters[lot.barrel.sizeMl]?.selected ?? false
			}
		}
		availability[lot.barrel.bottlesRemaining] = {
			name: lot.barrel.bottlesRemaining.toString(),
			selected: state.filterGroups.availability.filters[lot.barrel.bottlesRemaining.toString()]?.selected ?? false
		}
	}
	state.filterGroups.country.filters = countries;
	state.filterGroups.distilleries.filters = distilleries;
	state.filterGroups.age.filters = age;
	state.filterGroups.type.filters = type;
	state.filterGroups.size.filters = size;
	state.filterGroups.availability.filters = availability;
});

const state = reactive<{ filterGroups: { [key: string]: FilterGroup } }>({
	filterGroups: {
		country: {
			name: "Country",
			open: false,
			filters: {}
		},
		region: {
			name: "Region",
			open: false,
			filters: {}
		},
		distilleries: {
			name: "Distilleries",
			open: false,
			filters: {}
		},
		age: {
			name: "Age",
			open: false,
			filters: {}
		},
		type: {
			name: "Type",
			open: false,
			filters: {}
		},
		size: {
			name: "Size",
			open: false,
			filters: {}
		},
		availability: {
			name: "Availability",
			open: false,
			filters: {}
		}
	},
});

function updateLots() {
	const countries = getFilteredItems(state.filterGroups.country.filters);
	const distilleries = getFilteredItems(state.filterGroups.distilleries.filters);
	const age = getFilteredItems(state.filterGroups.age.filters);
	const type = getFilteredItems(state.filterGroups.type.filters);
	const size = getFilteredItems(state.filterGroups.size.filters);
	const availability = getFilteredItems(state.filterGroups.availability.filters);

	emit("lotsUpdated", props.lots.filter((lot, index, lots) => {
		if (
			(countries.length === 0 || countries.includes(lot.barrel.distilleryLocation)) &&
			(distilleries.length === 0 || distilleries.includes(lot.barrel.distilleryName)) &&
			(age.length === 0 || age.includes(lot.barrel.age)) &&
			(type.length === 0 || type.includes(lot.barrel.type)) &&
			//eslint-disable-next-line
			(size.length === 0 || size.includes(`${lot.barrel.sizeMl! / 10}cl`)) &&
			(availability.length === 0 || availability.includes(lot.barrel.bottlesRemaining.toString()))
		) return lots.indexOf(lot) == index;
	}));
}

function getFilteredItems(filters: { [key: string]: FilterItem } = {}): string[] {
	const active = Object.values(filters).filter((item) => item.selected);
	const items = [] as string[];
	for (const filter of active) {
		items.push(filter.name);
	}
	return items;
}

function resetFilters(): void {
	for (const filterGroup of Object.values(state.filterGroups)) {
		for (const filterItems of Object.values(filterGroup.filters)) {
			filterItems.selected = false;
		}
	}
	emit("update:modelValue");
	updateLots();
}

</script>
