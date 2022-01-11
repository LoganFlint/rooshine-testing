<template>
  <router-view
    name="profileModal"
    :route-data="routeData"
    @continue="continueNext"
    @go-back="goBackAStep"
    @close="close"
  />
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import type { Lot } from "../../api/lot";
import type { Barrel } from "../../api/barrel";
import type { RouteNameData } from "../../pages/profile/Profile.vue";
import router from "../../router";

export interface RouteData {
	route: string
	data?: {
		barrel: Barrel
		lot: Lot
	}
}

const props = defineProps({
	dataObj: { type: Object as PropType<RouteNameData>, required: true },
	openTrigger: { type: Boolean, default: false },
});

const lot = ref(props.dataObj.data?.lot);

const routeData = reactive<RouteData>({
	route: "profile",
});

class RouteOption {
	constructor(name: string, routesParam: Array<string>, parentIndex: number) {
		this.routes = routesParam
		this.name = name
		this.parentIndex = parentIndex
	}
	isActive = false
	index = 0
	routes: Array<string>
	name: string
	parentIndex: number
}

class RouteOptions {
	/** adds an option to the list of options */
	addOption(name: string, newRoute: Array<string>) {
		this.options.push(new RouteOption(name, newRoute, this.options.length))
	}

	/** selects index's option, and deselects all others */
	selectRouteOption(selectIndex: number) {
		this.options.forEach((option, index) => {
			option.isActive = selectIndex === index
		})
		this.activeOption = selectIndex
	}

	/** finds the option by finding the option containing the route name, and updates state, doesn't push route */
	async selectOptionByRoute(routeName: string) {
		const matches = this.options.filter(option => option.routes.includes(routeName))
		if (matches.length > 0) {
			const option = matches[0] // use the first match
			this.selectRouteOption(option.parentIndex)
			await this.setActiveStep(option.routes.indexOf(routeName), false)
			this.updateStateRouteFromIndex()
		}
	}

	/** finds the option by name, and updates state */
	activateOptionByName(optionName: string) {
		this.options.forEach((option, index) => {
			if (option.name === optionName) {
				this.selectRouteOption(index)
			}
		})
	}

	/** moves the active route index */
	async moveActiveRoute(amount: number) {
		this.options[this.activeOption].index += amount
		await this.updateRoute()
	}

	/** gets route string from the selected option */
	getRouteFromActiveOption() {
		const option = this.getSelectedOption()
		return option.routes[option.index]
	}

	/** gets current option based on what's selected */
	getSelectedOption() {
		return this.options[this.activeOption]
	}

	/** updates our route and pushes it to reflect what is selected */
	async updateRoute() {
		if (this.options[this.activeOption].isActive) {
			const selectedRoute = this.getRouteFromActiveOption()
			if (router.currentRoute.value.name?.toString() !== selectedRoute) {
				await router.push({ name: selectedRoute })
			}
			this.updateStateRouteFromIndex()
		}
	}

	/** updates the state.route with the active route */
	updateStateRouteFromIndex() {
		routeData.route = this.getRouteFromActiveOption()
	}

	/** sets currently active option's route */
	async setActiveStep(index: number, pushRoute: boolean) {
		this.getSelectedOption().index = index
		if (pushRoute) await this.updateRoute()
	}

	/** indicates which option is selected */
	activeOption = 0
	/** array of RouteOptions */
	options: Array<RouteOption> = []
}

const routeOptions = new RouteOptions()
routeOptions.addOption("addPaymentModal", ["profile", "add.payment", "add.payment.bank", "add.payment.card"])
routeOptions.addOption("addLotModal", ["profile", "add.lot.bottles", "add.lot.details", "add.lot.confirm", "add.lot.confirmation"])
routeOptions.addOption("changePasswordModal", ["profile", "profile.change.password", "profile.change.password.confirm"])

onBeforeRouteLeave(async (to, from, next) => {
	const newRoute = to.name ? to.name.toString() : ""
	await routeOptions.selectOptionByRoute(newRoute)
	next()
})

/** correct paymentIndex from a reload */
onMounted(async () => {
	if (router.currentRoute.value.name != null) {
		const currentRoute = router.currentRoute.value.name
		await routeOptions.selectOptionByRoute(currentRoute.toString())
	} else {
		routeOptions.selectRouteOption(0)
		await routeOptions.updateRoute()
	}
})

async function continueNext(routeAdd: number, lotObj: Lot | null) {
	if (lotObj && lot.value && routeData.data) {
		transferXtoY(lotObj, routeData.data.lot as Lot)
	}
	await routeOptions.moveActiveRoute(routeAdd)
}

async function goBackAStep(routeSub: number, lotObj: Lot | null) {
	if (lotObj && lot.value && routeData.data) {
		transferXtoY(lotObj, routeData.data.lot as Lot)
	}
	await routeOptions.moveActiveRoute(-routeSub)
}

function transferXtoY(x: Lot, y: Lot) {
	// transfer properties from object to ours (preserving anything prexisting, but not brought in)
	Object.entries(x).forEach(value => {
		if (value.length == 2) {
			((y as unknown) as { [key: string]: string })[value[0]] = value[1]
		}
	})
}

async function close() {
	routeOptions.selectRouteOption(0)
	await routeOptions.setActiveStep(0, true)
}

watch(
	() => router.currentRoute.value.name,
	async () => {
		if (router.currentRoute.value.name) {
			await routeOptions.selectOptionByRoute(router.currentRoute.value.name.toString())
		}
	}
)

watch(
	() => props.openTrigger,
	async () => {
		routeData.data = props.dataObj.data
		lot.value = props.dataObj.data?.lot
		routeOptions.activateOptionByName(props.dataObj.routeName)
		await routeOptions.setActiveStep(1, true)
	}
)

</script>
