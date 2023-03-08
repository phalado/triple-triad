import AchievementsInterface from "./AchievementsInterface"
import CardObjectInterface from "./CardObjectInterface"
import DecksInterface from "./DecksInterface"
import GameOptionsInterface from "./GameOptionsInterface"
import { NpcsInterface } from "./NpcsInterface"
import PreLoadedSoundsInterface from "./PreLoadedSounds"
import RulesInterface from "./RulesInterface"

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
  cardQueen: CardObjectInterface,
  gameOptions: GameOptionsInterface,
  achievements: AchievementsInterface
}