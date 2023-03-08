import AchievementsInterface from "../interfaces/AchievementsInterface"

const checkAchievements = (props: {
  achievements: AchievementsInterface,
  changeAchievement: (achievement: string) => void,
  playerCards: { [card: string]: number },
  cardId: number
}) => {
  const { achievements, changeAchievement, playerCards, cardId } = props
  const cardLevel = Math.ceil(cardId / 11)
  const achievName = 'level' + String(cardLevel)

  if (!achievements[achievName].status) {
    let achiev = true;

    for (let i = ((cardLevel - 1) * 11) + 1; i <= (cardLevel * 11); i++) {
      if (!playerCards[i] || playerCards[i] < 1) achiev = false
    }

    if (achiev) changeAchievement(achievName)
  }
}

const checkMasterCollector = (props: {
  achievements: AchievementsInterface,
  changeAchievement: (achievement: string) => void,
  playerCards: { [card: string]: number },
}) => {
  const { achievements, changeAchievement, playerCards } = props

  if (
    achievements.masterCollector.status ||
    Object.keys(playerCards).length < 110 ||
    Object.values(playerCards).some((card: number) => card < 1)
  ) return

  changeAchievement('masterCollector')
}

export { checkAchievements, checkMasterCollector }
