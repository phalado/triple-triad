const Images: { [key: string]: any } = {
  player0: require('../contents/img/player0.png'),
  player1: require('../contents/img/player1.png'),
  player2: require('../contents/img/player2.png'),
  cardBack: require('../contents/img/card-back.png'),
  win: require('../contents/img/winResult.png'),
  loose: require('../contents/img/looseResult.png'),
  tie: require('../contents/img/tieResult.png'),
  plus: require('../contents/img/plusOne.png'),
  minus: require('../contents/img/minusOne.png'),
  rank0: require('../contents/img/rank0.png'),
  rank1: require('../contents/img/rank1.png'),
  rank2: require('../contents/img/rank2.png'),
  rank3: require('../contents/img/rank3.png'),
  rank4: require('../contents/img/rank4.png'),
  rank5: require('../contents/img/rank5.png'),
  rank6: require('../contents/img/rank6.png'),
  rank7: require('../contents/img/rank7.png'),
  rank8: require('../contents/img/rank8.png'),
  rank9: require('../contents/img/rank9.png'),
  rank10: require('../contents/img/rankA.png'),
  turn1: require('../contents/img/turn1.png'),
  turn2: require('../contents/img/turn2.png'),
  board: require('../contents/img/board-mat.jpg'),
  fire: require('../contents/img/fire.gif'),
  water: require('../contents/img/water.gif'),
  ice: require('../contents/img/ice.gif'),
  wind: require('../contents/img/wind.gif'),
  poison: require('../contents/img/poison.gif'),
  thunder: require('../contents/img/thunder.gif'),
  earth: require('../contents/img/earth.gif'),
  holy: require('../contents/img/holy.gif'),
  plusSp: require('../contents/img/plusSpecial.png'),
  same: require('../contents/img/sameSpecial.png'),
  combo: require('../contents/img/comboSpecial.png'),
  explore: require('../contents/img/scenes/worldMap.jpeg'),
  randomGame: require('../contents/img/scenes/randomBoard.png'),
  quickGame: require('../contents/img/scenes/quickGame.png'),
  options: require('../contents/img/scenes/options.png'),
  changeRules: require('../contents/img/scenes/rulesScreen.png'),
  deckScreen: require('../contents/img/scenes/deckScreen.jpg'),
  classroom: require('../contents/img/scenes/classroom.jpg'),
  balambGarden: require('../contents/img/scenes/balambGarden.jpg'),
  balambTown: require('../contents/img/scenes/balambTown.png'),
  fishermansHorizon: require('../contents/img/scenes/fishermanHorizon.jpg'),
  dollet: require('../contents/img/scenes/dollet.jpg'),
  delingCity: require('../contents/img/scenes/delingCity.png'),
  timberManiacs: require('../contents/img/scenes/timberManiacs.jpeg'),
  galbadiaGarden: require('../contents/img/scenes/galbadiaGarden.jpg'),
  winhill: require('../contents/img/scenes/winhill.jpg'),
  trabiaGarden: require('../contents/img/scenes/trabiaGarden.jpg'),
  edeasHouse: require('../contents/img/scenes/edeasHouse.jpg'),
  shumiVillage: require('../contents/img/scenes/shumiVillage.jpg'),
  esthar: require('../contents/img/scenes/esthar.jpg'),
  ufo: require('../contents/img/ufo.png'),
  hamburguerIcon: require('../contents/img/hamburguer-icon-white.png'),
  ptbr: require('../contents/img/brasil.png'),
  eng: require('../contents/img/usa.png'),
  1: require('../contents/img/cards/001.png'),
  2: require('../contents/img/cards/002.png'),
  3: require('../contents/img/cards/003.png'),
  4: require('../contents/img/cards/004.png'),
  5: require('../contents/img/cards/005.png'),
  6: require('../contents/img/cards/006.png'),
  7: require('../contents/img/cards/007.png'),
  8: require('../contents/img/cards/008.png'),
  9: require('../contents/img/cards/009.png'),
  10: require('../contents/img/cards/010.png'),
  11: require('../contents/img/cards/011.png'),
  12: require('../contents/img/cards/012.png'),
  13: require('../contents/img/cards/013.png'),
  14: require('../contents/img/cards/014.png'),
  15: require('../contents/img/cards/015.png'),
  16: require('../contents/img/cards/016.png'),
  17: require('../contents/img/cards/017.png'),
  18: require('../contents/img/cards/018.png'),
  19: require('../contents/img/cards/019.png'),
  20: require('../contents/img/cards/020.png'),
  21: require('../contents/img/cards/021.png'),
  22: require('../contents/img/cards/022.png'),
  23: require('../contents/img/cards/023.png'),
  24: require('../contents/img/cards/024.png'),
  25: require('../contents/img/cards/025.png'),
  26: require('../contents/img/cards/026.png'),
  27: require('../contents/img/cards/027.png'),
  28: require('../contents/img/cards/028.png'),
  29: require('../contents/img/cards/029.png'),
  30: require('../contents/img/cards/030.png'),
  31: require('../contents/img/cards/031.png'),
  32: require('../contents/img/cards/032.png'),
  33: require('../contents/img/cards/033.png'),
  34: require('../contents/img/cards/034.png'),
  35: require('../contents/img/cards/035.png'),
  36: require('../contents/img/cards/036.png'),
  37: require('../contents/img/cards/037.png'),
  38: require('../contents/img/cards/038.png'),
  39: require('../contents/img/cards/039.png'),
  40: require('../contents/img/cards/040.png'),
  41: require('../contents/img/cards/041.png'),
  42: require('../contents/img/cards/042.png'),
  43: require('../contents/img/cards/043.png'),
  44: require('../contents/img/cards/044.png'),
  45: require('../contents/img/cards/045.png'),
  46: require('../contents/img/cards/046.png'),
  47: require('../contents/img/cards/047.png'),
  48: require('../contents/img/cards/048.png'),
  49: require('../contents/img/cards/049.png'),
  50: require('../contents/img/cards/050.png'),
  51: require('../contents/img/cards/051.png'),
  52: require('../contents/img/cards/052.png'),
  53: require('../contents/img/cards/053.png'),
  54: require('../contents/img/cards/054.png'),
  55: require('../contents/img/cards/055.png'),
  56: require('../contents/img/cards/056.png'),
  57: require('../contents/img/cards/057.png'),
  58: require('../contents/img/cards/058.png'),
  59: require('../contents/img/cards/059.png'),
  60: require('../contents/img/cards/060.png'),
  61: require('../contents/img/cards/061.png'),
  62: require('../contents/img/cards/062.png'),
  63: require('../contents/img/cards/063.png'),
  64: require('../contents/img/cards/064.png'),
  65: require('../contents/img/cards/065.png'),
  66: require('../contents/img/cards/066.png'),
  67: require('../contents/img/cards/067.png'),
  68: require('../contents/img/cards/068.png'),
  69: require('../contents/img/cards/069.png'),
  70: require('../contents/img/cards/070.png'),
  71: require('../contents/img/cards/071.png'),
  72: require('../contents/img/cards/072.png'),
  73: require('../contents/img/cards/073.png'),
  74: require('../contents/img/cards/074.png'),
  75: require('../contents/img/cards/075.png'),
  76: require('../contents/img/cards/076.png'),
  77: require('../contents/img/cards/077.png'),
  78: require('../contents/img/cards/078.png'),
  79: require('../contents/img/cards/079.png'),
  80: require('../contents/img/cards/080.png'),
  81: require('../contents/img/cards/081.png'),
  82: require('../contents/img/cards/082.png'),
  83: require('../contents/img/cards/083.png'),
  84: require('../contents/img/cards/084.png'),
  85: require('../contents/img/cards/085.png'),
  86: require('../contents/img/cards/086.png'),
  87: require('../contents/img/cards/087.png'),
  88: require('../contents/img/cards/088.png'),
  89: require('../contents/img/cards/089.png'),
  90: require('../contents/img/cards/090.png'),
  91: require('../contents/img/cards/091.png'),
  92: require('../contents/img/cards/092.png'),
  93: require('../contents/img/cards/093.png'),
  94: require('../contents/img/cards/094.png'),
  95: require('../contents/img/cards/095.png'),
  96: require('../contents/img/cards/096.png'),
  97: require('../contents/img/cards/097.png'),
  98: require('../contents/img/cards/098.png'),
  99: require('../contents/img/cards/099.png'),
  100: require('../contents/img/cards/100.png'),
  101: require('../contents/img/cards/101.png'),
  102: require('../contents/img/cards/102.png'),
  103: require('../contents/img/cards/103.png'),
  104: require('../contents/img/cards/104.png'),
  105: require('../contents/img/cards/105.png'),
  106: require('../contents/img/cards/106.png'),
  107: require('../contents/img/cards/107.png'),
  108: require('../contents/img/cards/108.png'),
  109: require('../contents/img/cards/109.png'),
  110: require('../contents/img/cards/110.png'),
};

export default Images
