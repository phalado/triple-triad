import Sound from 'react-native-sound';

const Sounds = {
  gameTheme: require('../contents/sounds/gameSound.mp3'),
  cardTurn: require('../contents/sounds/sound-turn.wav'),
};

const gameMusic = new Sound(Sounds.gameTheme, Sound.MAIN_BUNDLE);
gameMusic.setVolume(0.2);
gameMusic.setPan(1);
gameMusic.setNumberOfLoops(-1);
const gameMusicPlay = () => gameMusic.play();
const gameMusicStop = () => gameMusic.stop();


const turnCard = new Sound(Sounds.cardTurn, Sound.MAIN_BUNDLE);
turnCard.setVolume(1);
turnCard.setPan(1);
turnCard.setNumberOfLoops(-1);
const turnCardPlay = () => turnCard.play();
const turnCardStop = () => turnCard.stop();

export {
  gameMusicPlay, gameMusicStop, turnCardPlay, turnCardStop,
};
