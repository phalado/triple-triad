import Sound from 'react-native-sound';

const imports = {
  gameTheme: require('../contents/sounds/gameSound.mp3'),
  cardTurn: require('../contents/sounds/sound-turn.wav'),
  balambGarden: require('../contents/sounds/balambGarden.mp3'),
  balambTown: require('../contents/sounds/balambTown.mp3'),
  fishermansHorizon: require('../contents/sounds/fishermansHorizon.mp3'),
};

const gameMusic = new Sound(imports.gameTheme, Sound.MAIN_BUNDLE);
const gameMusicPlay = () => gameMusic.play();
const gameMusicStop = () => gameMusic.stop();

const balambGarden = new Sound(imports.balambGarden, Sound.MAIN_BUNDLE);
const balambGardenPlay = () => balambGarden.play();
const balambGardenStop = () => balambGarden.stop();

const balambTown = new Sound(imports.balambTown, Sound.MAIN_BUNDLE);
const balambTownPlay = () => balambTown.play();
const balambTownStop = () => balambTown.stop();

const fishermansHorizon = new Sound(imports.fishermansHorizon, Sound.MAIN_BUNDLE);
const fishermansHorizonPlay = () => fishermansHorizon.play();
const fishermansHorizonStop = () => fishermansHorizon.stop();

const turnCard = new Sound(imports.cardTurn, Sound.MAIN_BUNDLE);
const turnCardPlay = () => turnCard.play();

export {
  gameMusicPlay, gameMusicStop, turnCardPlay,
  balambGardenPlay, balambGardenStop,
  balambTownPlay, balambTownStop,
  fishermansHorizonPlay, fishermansHorizonStop,
};
