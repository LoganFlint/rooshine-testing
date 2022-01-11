import type { Lot, Bid } from "./lot"

export interface Barrel extends BarrelApi {
	/** unique barrel ID */
	barrelId: string
	/** user who created the barrel's userId */
	userId: string

	// BarrelApi stuff goes here

	/** array of index and UUID's for the images */
	authMedia?: Array<[string, string | null]>
	/** array of index and UUID's for the images */
	media: Array<[number, string]>
	/** date barrel was uploaded to our database */
	createdAt: string
	/** approval status, indicating if it has been approved by a reviewer */
	approved: boolean

	// TODO to be ADDED by backend below here:

	/** the array of lots that were created from this barrel */
	lots: Array<Lot>
	/** total number of bottels the barrel contains */
	bottleCount: number
	/** of the total bottles, how many remain */
	bottlesRemaining: number
	/** array of reviews issued by reviewers indicating wether the barrel should be approved */
	reviews: Array<Review>
	/** array of images **DEPRECATED** (will be deleted once media uploading works) */
	images?: BarrelImages
	/** indicates the approval status of this barrel **DEPRECATED** (will be deleted once backend offers all options) */
	status: "approved" | "denied" | "pending"
}

export interface Review {
	reviewerComment: string
	reviewerName: string,
}

export interface BarrelImages {
	front: string | null
	back: string | null
	additional: Array<string | null>
}

export interface BarrelApi {
	/** name of the barrel */
	title: string
	/** description of the barrel */
	description: string
	/** distillery name, where barrel was made */
	distilleryName: string
	/** distillery location, where barrel was made */
	distilleryLocation: string
	/** type of barrel */
	type: string
	/** "age" aka "year" barrel was made */
	age: string
	/** size of barrel in Milliliters */
	sizeMl: number | null
	/** "strength" aka "percent alcohol" of the barrel */
	strength: string

	// TODO to be ADDED by backend below here:
	/** group of bottles included in barrel */
	bottles?: { [key: number]: Bottle } 
}

export interface Bottle {
	/** the bottle's number or location */
	index: number
	/** whether the bottle is available or sold */
	sold: boolean,
	/** highest bid on individual bottle */
	highestBid: Bid
}

export interface AdminBarrelStatus {
  status: "approved" | "denied" | "requested" | "delivered"
}

export interface BarrelPatch {
	title?: string | null,
    description?: string | null,
    distilleryName?: string| null,
    distilleryLocation?: string| null,
    type?: string| null,
    age?: string| null,
    sizeMl?: number| null,
    reservePrice?: number | null,
	strength?: string | null
}

export interface CurrentBarrel{
  /** unique barrel id */
  barrelId: string
  /** unique user id who is connected to barrel */
	userId: string
  /** user who owns barrel */
	userFullName: string
  /** barrel title */
	title: string
  /** barrel status "approved" | "denied" | "requested" | "delivered" */
	status: string
  /** when barrel was created */
	createdAt: string | number
  /** when and if barrel was updated */
	updatedAt: string
}


