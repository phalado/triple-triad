import Sound from 'react-native-sound';

const imports = {
  gameTheme: require('../contents/sounds/gameSound.mp3'),
  winTheme: require('../contents/sounds/winTheme.mp3'),
  looseTheme: require('../contents/sounds/looseTheme.mp3'),
  cardTurn: require('../contents/sounds/sound-turn.wav'),
  special: require('../contents/sounds/sound-special.wav'),
  cardSound: require('../contents/sounds/sound-card.wav'),
  balambGarden: require('../contents/sounds/balambGarden.mp3'),
  balambTown: require('../contents/sounds/balambTown.mp3'),
  fishermansHorizon: require('../contents/sounds/fishermansHorizon.mp3'),
  delingCity: require('../contents/sounds/delingCity.mp3'),
  timberManiacs: require('../contents/sounds/timberManiacs.mp3'),
  dollet: require('../contents/sounds/dollet.mp3'),
  galbadiaGarden: require('../contents/sounds/galbadiaGarden.mp3'),
  winhill: require('../contents/sounds/winhill.mp3'),
  trabiaGarden: require('../contents/sounds/trabiaGarden.mp3'),
  esthar: require('../contents/sounds/esthar.mp3'),
  edeasHouse: require('../contents/sounds/edeasHouse.mp3'),
};

const gameMusic = new Sound(imports.gameTheme, Sound.MAIN_BUNDLE);
const gameMusicPlay = () => gameMusic.play();
const gameMusicStop = () => gameMusic.stop();

const winTheme = new Sound(imports.gameTheme, Sound.MAIN_BUNDLE);
const winThemePlay = () => winTheme.play();
const winThemeStop = () => winTheme.stop();

const looseTheme = new Sound(imports.gameTheme, Sound.MAIN_BUNDLE);
const looseThemePlay = () => looseTheme.play();
const looseThemeStop = () => looseTheme.stop();

const turnCard = new Sound(imports.cardTurn, Sound.MAIN_BUNDLE);
const turnCardPlay = () => turnCard.play();

const specialSound = new Sound(imports.special, Sound.MAIN_BUNDLE);
const specialSoundPlay = () => specialSound.play();

const cardSound = new Sound(imports.cardSound, Sound.MAIN_BUNDLE);
const cardSoundPlay = () => cardSound.play();

const balambGarden = new Sound(imports.balambGarden, Sound.MAIN_BUNDLE);
const balambGardenPlay = () => balambGarden.play();
const balambGardenStop = () => balambGarden.stop();

const balambTown = new Sound(imports.balambTown, Sound.MAIN_BUNDLE);
const balambTownPlay = () => balambTown.play();
const balambTownStop = () => balambTown.stop();

const fishermansHorizon = new Sound(imports.fishermansHorizon, Sound.MAIN_BUNDLE);
const fishermansHorizonPlay = () => fishermansHorizon.play();
const fishermansHorizonStop = () => fishermansHorizon.stop();

const delingCity = new Sound(imports.delingCity, Sound.MAIN_BUNDLE);
const delingCityPlay = () => delingCity.play();
const delingCityStop = () => delingCity.stop();

const timberManiacs = new Sound(imports.timberManiacs, Sound.MAIN_BUNDLE);
const timberManiacsPlay = () => timberManiacs.play();
const timberManiacsStop = () => timberManiacs.stop();

const dollet = new Sound(imports.dollet, Sound.MAIN_BUNDLE);
const dolletPlay = () => dollet.play();
const dolletStop = () => dollet.stop();

const galbadiaGarden = new Sound(imports.galbadiaGarden, Sound.MAIN_BUNDLE);
const galbadiaGardenPlay = () => galbadiaGarden.play();
const galbadiaGardenStop = () => galbadiaGarden.stop();

const winhill = new Sound(imports.winhill, Sound.MAIN_BUNDLE);
const winhillPlay = () => winhill.play();
const winhillStop = () => winhill.stop();

const trabiaGarden = new Sound(imports.trabiaGarden, Sound.MAIN_BUNDLE);
const trabiaGardenPlay = () => trabiaGarden.play();
const trabiaGardenStop = () => trabiaGarden.stop();

const esthar = new Sound(imports.esthar, Sound.MAIN_BUNDLE);
const estharPlay = () => esthar.play();
const estharStop = () => esthar.stop();

const edeasHouse = new Sound(imports.edeasHouse, Sound.MAIN_BUNDLE);
const edeasHousePlay = () => edeasHouse.play();
const edeasHouseStop = () => edeasHouse.stop();

export {
  turnCardPlay, specialSoundPlay, cardSoundPlay,
  gameMusicPlay, gameMusicStop,
  winThemePlay, winThemeStop,
  looseThemePlay, looseThemeStop,
  balambGardenPlay, balambGardenStop,
  balambTownPlay, balambTownStop,
  fishermansHorizonPlay, fishermansHorizonStop,
  delingCityPlay, delingCityStop,
  timberManiacsPlay, timberManiacsStop,
  dolletPlay, dolletStop,
  galbadiaGardenPlay, galbadiaGardenStop,
  winhillPlay, winhillStop,
  trabiaGardenPlay, trabiaGardenStop,
  estharPlay, estharStop,
  edeasHousePlay, edeasHouseStop,
};
