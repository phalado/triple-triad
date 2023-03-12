export interface LocalRulesInterface {
  open: boolean
  plus: boolean
  same: boolean
  elemental: boolean
  sameWall: boolean
  suddenDeath: boolean
  random: boolean
}

export default interface RulesInterface {
  [location: string]: LocalRulesInterface
}
