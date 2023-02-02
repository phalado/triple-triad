export interface NpcDataInterface {
  name: string
  cards: number[]
  special: number[]
  win: number
  loose: number
  tie: number
}

export interface NpcInterface {
  [npc: string]: NpcDataInterface
}

export interface NpcsInterface {
  [location: string]: NpcInterface
}
