export default interface RulesInterface {
  [location: string]: {
    open: boolean
    plus: boolean
    same: boolean
    elemental: boolean
    sameWall: boolean
    sudenDeath: boolean
    random: boolean
  }
}
