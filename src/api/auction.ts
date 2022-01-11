export interface Auction {
  /** name of auction */
  name: string
  /** number of bottles in auction */
  lotCount: number
  /** date auction starts */
  startDate: Date
  /** date auction will end */
  endDate: Date
  /** how many members participated in auction */
  participants?: number
  /** revenue made from past auction */
  revenue?: number
}
