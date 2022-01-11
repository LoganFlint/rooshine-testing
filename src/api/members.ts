export interface AdminMember {
    /** number of times logged in  */
    visits: number
    /** name of member */
    memberName: string
    /** members email */
    memberEmail: string
    /** date account was last used...? */
    lastVisited: Date
    /** Lot review status */
    type: 'BUYER' | 'BUYER & SELLER' | 'SELLER'
    /** numer of lots linked to the account  */
    lots: number
    /** total amount spent on auctions  */
    spent: string | null
    /** number of auctions won  */
    wins: number

    /**  .... */
    balance: string | null
    /** number of bids placed...?  */
    bids: number
    /** money made off of user...   */
    revenue: string | null
}

export interface SortingObject {
    sortingString: "ascending" | "descending" | "clear"
}

