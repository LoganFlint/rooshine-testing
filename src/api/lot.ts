import type { Barrel, Bottle } from "./barrel"

export interface Lot {
  /** name of the auction */
  name: string
  /** unique lot number for auction */
  lotNumber: number
  /** date object when the auction will start */
  startDate: string
  /** date object when the auction will end */
  endDate: string
  /** image of the auction */
  images: Array<string>
  /** this is the barrel the lot was created from */
  barrel: Barrel
  /** group of bottles included in lot */
  bottles: { [key: number]: Bottle }
  /** contains bid info for highest bid */
  highestBid: Bid
  /** an array of all the bids */
  bids: Array<Bid>
  /** userId of who made the Lot */
  userId: string
  /** Lot has closed */
  sold: boolean
  /** minimum bid price */
  minPrice: number
  /** starting bid price */
  startPrice: number
}

export interface AdminLot {
  /** price of bottle */
  price: number
  /** barrel token */
  token?: number
  /** name of the auction */
  productName?: string
  /** name of the seller */
  sellerName: string
  /** name of the buyer */
  buyerName?: string
  /** unique lot number for auction */
  lotId: string
  /** number of bottles in the auction */
  qty: number
  /** bottle number in lot */
  bottleNumber?: number
  /** number of number of bids placed on a listed auction...? */
  bids?: number
  /** date object was submitted for auction */
  dateSubmitted: Date | undefined
  /** Lot review status */
  type: 'SUBMITTED' | 'APPROVED' | 'DENIED' | 'LISTED' | 'UNDER REVIEW' | 'SOLD' | 'REQUESTED' | 'PENDING'
}

export interface Bid {
  /** date instance when the bid happened */
  date: string
  /** user who made the bid */
  userName: string
  /** bid amount in ISV */
  amount: number
  /** number of bottles bid upon */
  purchased: number
  /** userId of who made the bid */
  userId: string
}

/** Transfers barrel properties from barrel to barrel but skips the lots property to avoid circular logic */
function copyBarrelWithoutLots(from: Barrel, to: Barrel) {
  Object.entries(from).forEach(value => {
    if (value.length == 2) {
      if (value[0] === "lots") {
        ((to as unknown) as { lots: Array<Lot> }).lots = []
      } else {
        ((to as unknown) as { [key: string]: string })[value[0]] = value[1]
      }
    }
  })
}

/** Transfers lot properties from lot to lot, but for the barrel property, copy the barrel properties but **NOT** the lots, to avoid circular logic */
export function removeLotInfiniteNesting(from: Lot, to: Lot): void {
  Object.entries(from).forEach(value => {
    if (value.length == 2) {
      if (value[0] === "barrel") {
        ((to as unknown) as { barrel: { barrelId: string } }).barrel = { barrelId: "" }
        copyBarrelWithoutLots(value[1], (((to as unknown) as { [key: string]: string })["barrel"] as unknown) as Barrel)
      } else {
        ((to as unknown) as { [key: string]: string })[value[0]] = value[1]
      }
    }
  })
}
