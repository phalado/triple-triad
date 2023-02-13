export default interface CardQueenInterface {
  place: string
  name: string
  special: number[]
  win: number
  loose: number
  tie: number
  balambTown: number[]
  dollet: number[]
  delingCity: number[]
  fishermansHorizon: number[]
  shumiVillage: number[]
  winhill: number[]
  esthar: number[]
  [index: string]: number | number[] | string
}