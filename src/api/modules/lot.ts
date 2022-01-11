// import axios from "axios"
import { useStore } from "../../store";

import type { Lot, Bid } from "../lot"
import lot1 from "../../assets/live_auction_img.png"
import lot2 from "../../assets/highlights2.png"
import lot3 from "../../assets/highlights3.png"
import lot4 from "../../assets/highlights4.png"
import lot5 from "../../assets/live_auction5.png"
import lot6 from "../../assets/live_auction6.png"
import lot7 from "../../assets/live_auction7.png"
import lot8 from "../../assets/live_auction8.png"
import { testBarrels } from "./barrel"


// export async function createLot({
// 	barrelId,
// 	userId,
// 	title,
// 	description
// }: {
// 	barrelId: string,
// 	userId: string,
// 	title: string,
// 	description: string,
// }): Promise<string> {
// 	try {
// 		const body = `
//       ${barrelId}
//       ${userId}
//       ${title}
//       ${description}`
// 		const response = await axios.post(`/api/v1/barrel`, eval(body))
// 		console.log("success")
// 		return response.data
// 	} catch (e) {
// 		console.log(e)
// 		throw e
// 	}
// }

export function getLot(lotNumber: number): Promise<Lot> {
	return new Promise<Lot>((resolve, reject) => {
		const retLots = testLots.filter((lot) => lot.lotNumber === lotNumber)
		if (retLots.length > 0) {
			resolve(retLots[0])
		} else {
			reject(
				{
					message: `no lots found with lotNumber ${lotNumber}`,
					lots: retLots
				}
			)
		}
	})
}

export function getLots(): Promise<Array<Lot>> {
	return new Promise<Array<Lot>>((resolve, reject) => {
		if (testLots.length > 0) {
			// populate the barrels with the lots
			testLots.forEach(lot => {
				// find matching barrels to find our barrel we belong to
				lot.barrel.lots.push(lot)
			})
		} else {
			reject(
				{
					message: `no lots found, we only have ${testLots.length}`,
					lots: testLots
				}
			)
		}
		resolve(testLots)
	})
}

//TODO: Update this function when backend is available
export async function submitBidOnBottle(bid: number, lotNumber: number, bottleIndex: number): Promise<Bid> {
	const store = useStore();
	const user = await store.getCurrentUser();

	if (user.email === "") throw new Error("User is not logged in! Cannot place a bid.");

	const hasLot = testLots.find((lot) => lot.lotNumber = lotNumber) ? true : false;
	const lotIndex = testLots.findIndex((lot) => lot.lotNumber = lotNumber);
	if (!hasLot) throw new Error(`Lot number ${lotNumber} not found.`);

	if(testLots[lotIndex].bottles[bottleIndex]) {
		if (testLots[lotIndex].bottles[bottleIndex].sold === true) throw new Error(`Bottle index ${bottleIndex} has already been purchased.`);
		const highestBid = testLots[lotIndex].bottles[bottleIndex].highestBid;
		if (highestBid.amount < bid) {
			highestBid.amount = bid;
			highestBid.userId = user.userId;
			highestBid.userName = user.displayName;
			highestBid.date = (new Date()).toISOString();
			testLots[lotIndex].bottles[bottleIndex].highestBid = highestBid;
		} else {
			throw new Error(`${bid} is less than the current highest bid, ${highestBid.amount}, on bottle index ${bottleIndex}`);
		}
	} else {
		throw new Error(`Bottle index ${bottleIndex} not found in lot ${lotNumber}.`);
	}

	return testLots[lotIndex].bottles[bottleIndex].highestBid;
}

const endDate = new Date()
const startDate = new Date()
const startDateString = startDate.toISOString()
startDate.setTime(startDate.getTime() + 10000)
endDate.setTime(startDate.getTime() + (1 * 60000))
const endDateString = endDate.toISOString()
const bidDate = new Date()
bidDate.setTime(bidDate.getTime() - 10000)
const bidDateString = bidDate.toISOString()

export const testBids: Array<Bid> = [
	{
		amount: 200850,
		userName: "Logan F.",
		purchased: 2,
		date: bidDateString,
		userId: "beeba440-ffab-11eb-b995-7bd1268c2648",
	},
	{
		amount: 0,
		userName: "Jared M.",
		purchased: 3,
		date: bidDateString,
		userId: "aed45c92-36be-11ec-9b35-e39b6bc739b0",
	},
	{
		amount: 2000,
		userName: "Austin B.",
		purchased: 7,
		date: bidDateString,
		userId: "1701d7d6-076c-11ec-97bb-93401e32c3ca",
	},
	{
		amount: 15475,
		userName: "Austin B.",
		purchased: 4,
		date: bidDateString,
		userId: "1701d7d6-076c-11ec-97bb-93401e32c3ca",
	},
	{
		amount: 200850,
		userName: "Jared M.",
		purchased: 2,
		date: bidDateString,
		userId: "aed45c92-36be-11ec-9b35-e39b6bc739b0",
	},
	{
		amount: 15475,
		userName: "Logan F.",
		purchased: 7,
		date: bidDateString,
		userId: "beeba440-ffab-11eb-b995-7bd1268c2648",
	},
	{
		amount: 2000,
		userName: "Austin B.",
		purchased: 12,
		date: bidDateString,
		userId: "1701d7d6-076c-11ec-97bb-93401e32c3ca",
	},
	{
		amount: 15000,
		userName: "Logan F.",
		purchased: 9,
		date: bidDateString,
		userId: "beeba440-ffab-11eb-b995-7bd1268c2648",
	}
]

//const testLots: Array<Lot> = []


const testLots: Array<Lot> = [
	{
		name: "Old Malt Cask Ardbeg 32 Year Old 1967",
		lotNumber: 72197415,
		startDate: startDateString,
		endDate: endDateString,
		images: [lot1, lot2],
		barrel: testBarrels[0],
		highestBid: testBids[0],
		bids: [testBids[0], testBids[1], testBids[2]],
		userId: "beeba440-ffab-11eb-b995-7bd1268c2648",
		sold: true,
		minPrice: 900,
		startPrice: 90,
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
				index: 2,
				sold: false,
				highestBid: testBids[2]
			},
			3: {
				index: 3,
				sold: false,
				highestBid: testBids[3]
			},
			4: {
				index: 4,
				sold: false,
				highestBid: testBids[4]
			},
			5: {
				index: 5,
				sold: false,
				highestBid: testBids[6]
			},
			6: {
				index: 6,
				sold: false,
				highestBid: testBids[7]
			},
			7: {
				index: 7,
				sold: false,
				highestBid: testBids[0]
			},
			8: {
				index: 8,
				sold: false,
				highestBid: testBids[1]
			},
			39: {
				index: 39,
				sold: false,
				highestBid: testBids[2]
			},
			40: {
				index: 40,
				sold: false,
				highestBid: testBids[3]
			},
			41: {
				index: 41,
				sold: false,
				highestBid: testBids[4]
			},
			42: {
				index: 42,
				sold: false,
				highestBid: testBids[5]
			},
			43: {
				index: 43,
				sold: false,
				highestBid: testBids[6]
			},
		},
	},
	{
		name: "Macallan 10 Year Old Sherry Oak",
		lotNumber: 72197416,
		startDate: startDateString,
		endDate: endDateString,
		images: [lot2, lot3],
		barrel: testBarrels[1],
		highestBid: testBids[1],
		bids: [testBids[1]],
		userId: "1701d7d6-076c-11ec-97bb-93401e32c3ca",
		sold: true,
		minPrice: 70,
		startPrice: 7,
		bottles: {
			42: {
				index: 42,
				sold: true,
				highestBid: testBids[0]
			},
			51: {
				index: 51,
				sold: true,
				highestBid: testBids[1]
			},
			82: {
				index: 82,
				sold: false,
				highestBid: testBids[2]
			},
		},
	},
	{
		name: "Glenmorangie 1993 Burr Oak Reserve",
		lotNumber: 72197417,
		startDate: startDateString,
		endDate: endDateString,
		images: [lot3, lot4],
		barrel: testBarrels[2],
		highestBid: testBids[2],
		bids: [testBids[2]],
		userId: "aed45c92-36be-11ec-9b35-e39b6bc739b0",
		sold: false,
		minPrice: 500,
		startPrice: 50,
		bottles: {
			19: {
				index: 19,
				sold: true,
				highestBid: testBids[0]
			},
			20: {
				index: 20,
				sold: true,
				highestBid: testBids[1]
			},
			22: {
				index: 22,
				sold: false,
				highestBid: testBids[2]
			},
		},
	},
	{
		name: "Bunnahabhain 40 Year Old",
		lotNumber: 72197418,
		startDate: startDateString,
		endDate: endDateString,
		images: [lot4, lot5],
		barrel: testBarrels[1],
		highestBid: testBids[3],
		bids: [testBids[3]],
		userId: "1701d7d6-076c-11ec-97bb-93401e32c3ca",
		sold: true,
		minPrice: 450,
		startPrice: 150,
		bottles: {
			5: {
				index: 5,
				sold: true,
				highestBid: testBids[0]
			},
			9: {
				index: 9,
				sold: true,
				highestBid: testBids[1]
			},
			22: {
				index: 22,
				sold: false,
				highestBid: testBids[2]
			},
		},
	},
	{
		name: "Old Malt Cask Ardbeg 32 Year Old 1967",
		lotNumber: 72197419,
		startDate: startDateString,
		endDate: endDateString,
		images: [lot5, lot6],
		barrel: testBarrels[2],
		highestBid: testBids[4],
		bids: [testBids[4]],
		userId: "aed45c92-36be-11ec-9b35-e39b6bc739b0",
		sold: false,
		minPrice: 200,
		startPrice: 100,
		bottles: {
			55: {
				index: 55,
				sold: true,
				highestBid: testBids[0]

			},
			77: {
				index: 77,
				sold: true,
				highestBid: testBids[1]
			},
			99: {
				index: 99,
				sold: false,
				highestBid: testBids[2]
			},
		},
	},
	{
		name: "Macallan 10 Year Old Sherry Oak",
		lotNumber: 72197420,
		startDate: startDateString,
		endDate: endDateString,
		images: [lot6, lot7],
		barrel: testBarrels[2],
		highestBid: testBids[5],
		bids: [testBids[5]],
		userId: "6c4df26e-2702-11ec-9006-2706cc957012",
		sold: true,
		minPrice: 2000,
		startPrice: 2000,
		bottles: {
			50: {
				index: 50,
				sold: true,
				highestBid: testBids[0]
			},
			61: {
				index: 61,
				sold: true,
				highestBid: testBids[1]
			},
			72: {
				index: 72,
				sold: false,
				highestBid: testBids[2]
			},
		},
	},
	{
		name: "Glenmorangie 1993 Burr Oak Reserve",
		lotNumber: 72197421,
		startDate: startDateString,
		endDate: endDateString,
		images: [lot7, lot7],
		barrel: testBarrels[2],
		highestBid: testBids[6],
		bids: [testBids[6]],
		userId: "1701d7d6-076c-11ec-97bb-93401e32c3ca",
		sold: false,
		minPrice: 400,
		startPrice: 200,
		bottles: {
			60: {
				index: 60,
				sold: true,
				highestBid: testBids[0]
			},
			81: {
				index: 81,
				sold: true,
				highestBid: testBids[1]
			},
			92: {
				index: 92,
				sold: false,
				highestBid: testBids[2]
			},
		},
	},
	{
		name: "Bunnahabhain 40 Year Old",
		lotNumber: 72197422,
		startDate: startDateString,
		endDate: endDateString,
		images: [lot8, lot1],
		barrel: testBarrels[2],
		highestBid: testBids[7],
		bids: [testBids[7]],
		userId: "aed45c92-36be-11ec-9b35-e39b6bc739b0",
		sold: true,
		minPrice: 200,
		startPrice: 20,
		bottles: {
			20: {
				index: 20,
				sold: true,
				highestBid: testBids[0]
			},
			41: {
				index: 41,
				sold: true,
				highestBid: testBids[1]
			},
			92: {
				index: 92,
				sold: false,
				highestBid: testBids[2]
			},
		},
	},
]


// const testLots: Array<Lot> = [
// 	{
// 		name: "Old Malt Cask Ardbeg 32 Year Old 1967",
// 		lotNumber: 72197415,
// 		startDate: startDateString,
// 		endDate: endDateString,
// 		images: [lot1, lot2],
// 		barrel: testBarrels[0],
// 		highestBid: testBids[0],
// 		bids: [testBids[0], testBids[1], testBids[2]],
// 		userId: "beeba440-ffab-11eb-b995-7bd1268c2648",
// 		sold: true,
// 		minPrice: 900,
// 		startPrice: 90,
// 		bottles: {
// 			0: {
// 				index: 0,
// 				sold: true,
// 				highestBid: testBids[0]
// 			},
// 			1: {
// 				index: 1,
// 				sold: true,
// 				highestBid: testBids[1]
// 			},
// 			2: {
// 				index: 2,
// 				sold: false,
// 				highestBid: testBids[2]
// 			},
// 			3: {
// 				index: 3,
// 				sold: false,
// 				highestBid: testBids[3]
// 			},
// 		},
// 	},
// ]