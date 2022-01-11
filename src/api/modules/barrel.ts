import axios from "axios"
import type { Barrel, BarrelPatch, BarrelApi, CurrentBarrel } from "../barrel"
import type { Bid } from "../lot";
import { useStore } from "../../store"

export interface BarrelData {
	barrels: CurrentBarrel[],
	next: string
}

// get all barrels from API  
export async function getBarrel(): Promise<BarrelData> {
	const { data } = await axios.get("/api/v1/barrel")
	return { barrels: data.barrels, next: data.next } as BarrelData
}

export interface BarrelFromAPI {
	barrelId: string
	userId: string
	title: string
	description: string
	distilleryName: string
	distilleryLocation: string
	type: string
	age: string
	sizeMl: number
	strength: string
	media: [],
	createdAt: string
	updatedAt: string
	mintedBarrelId?: string
  status: string
}

export interface MintedBarrelToken {
	"mintedBarrelId": string
}

export async function approveBarrel(barrelId: string): Promise<MintedBarrelToken> {
	const store = useStore()
	const { data } = await axios.put(`/api/v1/barrel/${barrelId}/approve`)
	store.barrelToken = data
	return data
}

// get barrel by ID for admin NO restrictions
export async function getBarrelById(barrelId: string): Promise<BarrelFromAPI> {
	const { data } = await axios.get(`/api/v1/barrel/${barrelId}`)
	return data
}

// any is defined by the definition of how the catch works
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logResponseToConsole = (reason: any) => {
	console.log("data:", `"${reason.response.data}"`)
	console.log("catch", reason)
}

export async function createBarrel({ body }: { body: BarrelApi }): Promise<Barrel> {
	return new Promise((resolve, reject) => {
		axios.post(`/api/v1/barrel`, body).then(response =>
			resolve(response.data)
		).catch(reason => {
			logResponseToConsole(reason)
			reject(reason)
		})
	})
}

export async function editBarrel(barrelId: string, { body }: { body: BarrelPatch }): Promise<Barrel> {
	console.log("Barrel ID: ", barrelId);
	return new Promise((resolve, reject) => {
		axios.patch(`/api/v1/barrel/${barrelId}`, body).then(response =>
			resolve(response.data)
		).catch(reason => {
			logResponseToConsole(reason)
			reject(reason)
		})
	})
}

// note: this any is due to the definition of axios.post
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function uploadMedia(file: File, barrelId: string, slotNum: number, onProgress: ((progressEvent: any) => void) | undefined = undefined): Promise<string> {
	return new Promise((resolve, reject) => {
		axios.post(`/api/v1/barrel/${barrelId}/media/${slotNum}`, file, { headers: { 'Content-Type': file.type }, onUploadProgress: onProgress })
			.then(response => {
				resolve(response?.data?.mediaId)
			})
			.catch(reason => {
				reject(reason)
			})
	})
}

export function deleteMedia(barrelId: string, mediaId: string): Promise<void> {
	return axios.delete(`/api/v1/barrel/${barrelId}/media/${mediaId}`)
}


export function deleteAuthDocs(barrelId: string, authenticationId: string): Promise<void> {
	return axios.delete(`/api/v1/barrel/${barrelId}/authentication/${authenticationId}`)
}

// note: this any is due to the definition of axios.post
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function uploadAuthDocs(file: File, barrelId: string, onProgress: ((progressEvent: any) => void) | undefined = undefined): Promise<string> {
	return new Promise((resolve, reject) => {
		axios.post(`/api/v1/barrel/${barrelId}/authentication`, file, { headers: { 'Content-Type': file.type }, onUploadProgress: onProgress })
			.then(response => {
				resolve(response?.data?.authenticationId)
			})
			.catch(reason => {
				reject(reason)
			})
	})
}

export function setAuthDocDesc(barrelId: string, authId: string, notes: string | null): Promise<void> {
	return axios.post(`/api/v1/barrel/${barrelId}/authentication/${authId}`, { memo: notes })
}

/** duplicate of getBarrel, but this one hits the API */
export async function getBarrelInfo(barrelId: string): Promise<Barrel> {
	return new Promise((resolve, reject) => {
		axios.get(`/api/v1/barrel/${barrelId}`)
			.then(({ data }) => resolve(data))
			.catch(reason => {
				reject(reason)
			})
	})
}

// export function getBarrel(barrelId: string): Promise<Barrel> {
// 	return new Promise<Barrel>((resolve, reject) => {
// 		const retBarrel = testBarrels.filter((barrel) => barrel.barrelId === barrelId)
// 		if (retBarrel.length > 0) {
// 			resolve(retBarrel[0])
// 		} else {
// 			reject(
// 				{
// 					message: `no lots found with barrelId ${barrelId}`,
// 					lots: retBarrel
// 				}
// 			)
// 		}
// 	})
// }

export function getBarrels(): Promise<Array<Barrel>> {
	return new Promise<Array<Barrel>>((resolve, reject) => {
		if (testBarrels.length > 0)
			resolve(testBarrels)
		else
			reject(
				{
					message: `no lots found, we only have ${testBarrels.length}`,
					lots: testBarrels
				}
			)
	})
}

//TODO: This throws a CORS issue
export function getMediaURL(barrelId: string, mediaId: string): void {
	console.log("Barrel ID: ", barrelId);
	console.log("Media ID: ", mediaId);
	//const { data } = await axios.get(`/api/v1/barrel/${barrelId}/media/${mediaId}`);
}

export const testBids: Array<Bid> = [
	{
		amount: 200850,
		userName: "Logan F.",
		purchased: 2,
		date: (new Date()).toISOString(),
		userId: "beeba440-ffab-11eb-b995-7bd1268c2648",
	},
	{
		amount: 0,
		userName: "Jared M.",
		purchased: 3,
		date: (new Date()).toISOString(),
		userId: "aed45c92-36be-11ec-9b35-e39b6bc739b0",
	},
	{
		amount: 2000,
		userName: "Austin B.",
		purchased: 7,
		date: (new Date()).toISOString(),
		userId: "1701d7d6-076c-11ec-97bb-93401e32c3ca",
	},
	{
		amount: 15475,
		userName: "Austin B.",
		purchased: 4,
		date: (new Date()).toISOString(),
		userId: "1701d7d6-076c-11ec-97bb-93401e32c3ca",
	},
	{
		amount: 200850,
		userName: "Jared M.",
		purchased: 2,
		date: (new Date()).toISOString(),
		userId: "aed45c92-36be-11ec-9b35-e39b6bc739b0",
	},
	{
		amount: 15475,
		userName: "Logan F.",
		purchased: 7,
		date: (new Date()).toISOString(),
		userId: "beeba440-ffab-11eb-b995-7bd1268c2648",
	},
	{
		amount: 2000,
		userName: "Austin B.",
		purchased: 12,
		date: (new Date()).toISOString(),
		userId: "1701d7d6-076c-11ec-97bb-93401e32c3ca",
	},
	{
		amount: 15000,
		userName: "Logan F.",
		purchased: 9,
		date: (new Date()).toISOString(),
		userId: "beeba440-ffab-11eb-b995-7bd1268c2648",
	}
]

export const testBarrels: Array<Barrel> = [
	{
		barrelId: "7972fb2a-1bda-11ec-81c2-7f449df00c91",
		userId: "4ff59856-4638-11ec-a21d-5342e8b49250",
		title: "Macallan 10 Year Old Sherry Oak",
		description: "Web Roo Jared from Logan's Account",
		distilleryName: "The Malt Whiskey Trail",
		distilleryLocation: "Scotland",
		type: "Highland",
		age: "",
		sizeMl: 700,
		strength: "25",
		media: [],
		createdAt: "2021-09-22T19:22:49+00:00",
		approved: true,
		status: "approved",
		images: {
			front: "/src/assets/highlights2.png",
			back: "/src/assets/highlights3.png",
			additional: [
				"/src/assets/highlights4.png",
				"/src/assets/live_auction5.png",
				"/src/assets/live_auction_img.png",
			],
		},
		lots: [],
		bottleCount: 130,
		bottlesRemaining: 12,
		bottles: {
			0: {
				index: 0,
				sold: true,
				highestBid: testBids[0]
			},
			1: {
				index: 1,
				sold: true,
				highestBid: testBids[1]
			},
			2: {
				index: 3,
				sold: false,
				highestBid: testBids[2]
			},
		},
		reviews: [],
	},
	{
		barrelId: "7983fb2a-1bda-11ec-81c2-7f449df00c91",
		userId: "beeba440-ffab-11eb-b995-7bd1268c2648",
		title: "Old Malt Cask Ardbeg 32 Year Old 1967",
		description: "Web Roo Jared from Logan's Account",
		distilleryName: "Ardbeg",
		distilleryLocation: "Scotland",
		type: "Speyside",
		age: "",
		sizeMl: 900,
		strength: "60",
		media: [],
		createdAt: "2021-09-22T19:22:49+00:00",
		approved: true,
		status: "approved",
		images: {
			front: "",
			back: "",
			additional: [],
		},
		lots: [],
		bottleCount: 19,
		bottlesRemaining: 12,
		bottles: {
			12: {
				index: 12,
				sold: true,
				highestBid: testBids[0]
			},
			30: {
				index: 30,
				sold: false,
				highestBid: testBids[1]
			},
		},
		reviews: [],
	},
	{
		barrelId: "7972fb2a-1bda-11ec-81c2-7f449df00c91",
		userId: "beeba440-ffab-11eb-b995-7bd1268c2648",
		title: "Bunnahabhain 40 Year Old",
		description: "Web Roo Jared from Logan's Account",
		distilleryName: "Aurora Spirit",
		distilleryLocation: "Norway",
		type: "Islay",
		age: "",
		sizeMl: 600,
		strength: "40",
		media: [],
		createdAt: "2021-09-22T19:22:49+00:00",
		approved: false,
		status: "pending",
		images: {
			front: "",
			back: "",
			additional: [],
		},
		lots: [],
		bottleCount: 90,
		bottlesRemaining: 22,
		bottles: {
			4: {
				index: 4,
				sold: false,
				highestBid: testBids[0]
			}
		},
		reviews: [],
	},
	{
		barrelId: "7972fb2a-1bda-11ec-81c2-7f449df00c91",
		userId: "beeba440-ffab-11eb-b995-7bd1268c2648",
		title: "Glenmorangie 1993 Burr Oak Reserve",
		description: "Web Roo Jared from Logan's Account",
		distilleryName: "Ardbeg",
		distilleryLocation: "Scotland",
		type: "Highland",
		age: "",
		sizeMl: 400,
		strength: "75",
		media: [],
		createdAt: "2021-09-22T19:22:49+00:00",
		approved: false,
		status: "denied",
		images: {
			front: "",
			back: "",
			additional: [],
		},
		lots: [],
		bottleCount: 10,
		bottlesRemaining: 3,
		bottles: {
			7: {
				index: 7,
				sold: true,
				highestBid: testBids[0]
			}
		},
		reviews: [
			{
				reviewerName: "Zoe",
				reviewerComment: "Bottle images are blurry. Please upload higher resolution images in JPEG or PNG  Formats."
			}],
	},]
