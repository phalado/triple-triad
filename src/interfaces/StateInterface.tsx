import CardInterface from "./CardInterface"
import CardObjectInterface from "./CardObjectInterface"
import DecksInterface from "./DecksInterface"
import { NpcsInterface } from "./NpcsInterface"
import PreLoadedSoundsInterface from "./PreLoadedSounds"
import RulesInterface from "./RulesInterface"
import TableInterface from "./TableInterface"

export default interface StateInterface {
  decks: {
    player: DecksInterface
    custom: DecksInterface
  }
  events: { [event: string]: boolean }
  streak: number[]
  npcs: NpcsInterface
  playerCards: { [card: string]: number }
  rules: RulesInterface
  preLoadedSounds: PreLoadedSoundsInterface
  cardQueen: CardObjectInterface
}