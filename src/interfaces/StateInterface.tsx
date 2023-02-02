import CardInterface from "./CardInterface"
import DecksInterface from "./DecksInterface"
import { NpcsInterface } from "./NpcsInterface"
import RulesInterface from "./RulesInterface"

export default interface StateInterface {
  table: any
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
}