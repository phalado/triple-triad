import CardInterface from "./CardInterface"
import DecksInterface from "./DecksInterface"
import { NpcsInterface } from "./NpcsInterface"
import PreLoadedSoundsInterface from "./PreLoadedSounds"
import RulesInterface from "./RulesInterface"
import TableInterface from "./TableInterface"

export default interface StateInterface {
  table: TableInterface
  cards: {
    player1Cards: CardInterface[]
    player2Cards: CardInterface[]
  }
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
}