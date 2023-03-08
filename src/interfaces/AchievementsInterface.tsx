export interface AchievementInterface {
  status: boolean
  popup: boolean
  title: string
  description: string
}

export default interface AchievementsInterface {
  [achievement: string]: AchievementInterface
}
