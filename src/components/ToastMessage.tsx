//@ts-nocheck
import React, { useEffect, useState } from "react";
import ToastManager, { Toast } from 'toastify-react-native'
import Texts from "../constants/Texts";
import AchievementsInterface from "../interfaces/AchievementsInterface";
import GameOptionsInterface from "../interfaces/GameOptionsInterface";
import CSSSizes from "../constants/CSSSizes";

const ToastMessage = (props: {
  gameOptions: GameOptionsInterface,
  achievements: AchievementsInterface
  changeAchievementPopup: (achiev: string) => void
}) => {
  const getAchievement = () => Object.keys(achievements)
    .find((key: string) => achievements[key].status && !achievements[key].popup)

  const { gameOptions, achievements, changeAchievementPopup } = props;
  const [texts] = useState(Texts[(gameOptions.language as 'eng' | 'ptbr')])
  const [achievement, setAchievement] = useState(getAchievement())
  const { ScreenWidth, ScreenHeight } = CSSSizes

  const notify = () => Toast.success(`
    ${texts.achievUnlocked}:
    ${texts[achievements[achievement].title]}
  `);

  useEffect(() => {
    if (achievement === undefined) return

    if (achievements[achievement].popup) {
      const newAchievement = getAchievement()
      if (newAchievement !== undefined) setAchievement(newAchievement)
      return
    }

    notify()
    changeAchievementPopup(achievement)
  }, [achievement])

  return (
    <ToastManager
      height={ScreenHeight / 2}
      width={ScreenWidth / 2}
      animationIn={'slideInLeft'}
      animationOut={'slideOutRight'}
      duration={600000}
    />
  )
}

export default ToastMessage;
