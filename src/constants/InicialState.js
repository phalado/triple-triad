export default {
  cards: {
    play1Cards: [],
    play2Cards: [],
  },
  table: [
    [[null, null, null], [null, null, null], [null, null, null]],
    [[null, null, null], [null, null, null], [null, null, null]],
    [[null, null, null], [null, null, null], [null, null, null]],
  ],
  rules: {
    custom: {
      open: true,
      plus: false,
      same: false,
      elemental: false,
      sameWall: false,
      sudenDeath: false,
      random: false,
    },
    balambGarden: {
      open: true,
      plus: false,
      same: false,
      elemental: false,
      sameWall: false,
      sudenDeath: false,
      random: false,
    },
    balambTown: {
      open: true,
      plus: false,
      same: false,
      elemental: false,
      sameWall: false,
      sudenDeath: false,
      random: false,
    },
    delingCity: {
      open: false,
      plus: false,
      same: true,
      elemental: false,
      sameWall: false,
      sudenDeath: false,
      random: false,
    },
    galbadiaGarden: {
      open: false,
      plus: false,
      same: true,
      elemental: false,
      sameWall: false,
      sudenDeath: false,
      random: false,
    },
    timber: {
      open: false,
      plus: false,
      same: true,
      elemental: false,
      sameWall: false,
      sudenDeath: false,
      random: false,
    },
    dollet: {
      open: false,
      plus: false,
      same: false,
      elemental: true,
      sameWall: false,
      sudenDeath: false,
      random: true,
    },
    fishermansHorizon: {
      open: false,
      plus: false,
      same: false,
      elemental: true,
      sameWall: false,
      sudenDeath: true,
      random: false,
    },
    shumiVillage: {
      open: false,
      plus: true,
      same: false,
      elemental: false,
      sameWall: false,
      sudenDeath: false,
      random: true,
    },
    trabiaGarden: {
      open: false,
      plus: true,
      same: false,
      elemental: false,
      sameWall: false,
      sudenDeath: false,
      random: true,
    },
    winhill: {
      open: false,
      plus: false,
      same: false,
      elemental: true,
      sameWall: true,
      sudenDeath: false,
      random: false,
    },
    edeasHouse: {
      open: false,
      plus: false,
      same: false,
      elemental: true,
      sameWall: true,
      sudenDeath: false,
      random: false,
    },
  },
  decks: {
    player: {
      deck1: [1, 2, 4, 6, 7],
      deck2: [1, 2, 4, 6, 7],
      deck3: [1, 2, 4, 6, 7],
      deck4: [1, 2, 4, 6, 7],
      deck5: [1, 2, 4, 6, 7],
    },
    custom: {
      deck1: Array(5).fill(1),
      deck2: Array(5).fill(2),
      deck3: Array(5).fill(3),
      deck4: Array(5).fill(4),
      deck5: Array(5).fill(5),
    },
  },
  playerCards: {},
  streak: [0, 0, 0, 0],
  npcs: {
    balambGarden: {
      student1: {
        name: 'Student 1',
        cards: [1, 2, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      player1: {
        name: 'Player 1',
        cards: [1, 2],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      passerbyStudent: {
        name: 'Passerby 1',
        cards: [1, 2, 3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      student2: {
        name: 'Student 2',
        cards: [1, 2, 3, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      student3: {
        name: 'Student 3',
        cards: [1, 3, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      kadowaki: {
        name: 'Dr. Kadowaki',
        cards: [1, 2, 3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      doorman: {
        name: 'Doorman',
        cards: [1, 2, 3, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      student4: {
        name: 'Student 4',
        cards: [1, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      student5: {
        name: 'Student 5',
        cards: [1, 2, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      sittingStudent: {
        name: 'Sitting student',
        cards: [1, 2, 3, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      zell: {
        name: 'Zell',
        cards: [1, 2, 4, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      waitress: {
        name: 'Waitress',
        cards: [1, 2, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      waitressSon: {
        name: 'Waitress Son',
        cards: [1, 3, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      quistisGroupie1: {
        name: 'Quistis Groupie 1',
        cards: [1, 3, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      quistisGroupie2: {
        name: 'Quistis Groupie 2',
        cards: [2, 5],
        special: [104],
        win: 0,
        loose: 0,
        tie: 0,
      },
      librarian: {
        name: 'Librarian',
        cards: [1, 2, 3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      nida: {
        name: 'Nida',
        cards: [1, 2, 3, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      runningBoy: {
        name: 'Runinng Boy',
        cards: [1, 2, 3, 5],
        special: [81],
        win: 0,
        loose: 0,
        tie: 0,
      },
      cid: {
        name: 'Cid',
        cards: [1, 2, 3, 5],
        special: [90],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    cardClub: {
      jack: {
        name: 'CC Jack',
        cards: [3, 4, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      joker: {
        name: 'CC Magician Joker',
        cards: [1, 2, 3, 4, 5, 6, 7],
        special: [91],
        win: 0,
        loose: 0,
        tie: 0,
      },
      club: {
        name: 'CC Knight Club',
        cards: [3, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      diamond: {
        name: 'CC Princess Diamond',
        cards: [3, 4, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      spade: {
        name: 'CC Prince Spade',
        cards: [3, 4, 6, 7],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      heart: {
        name: 'CC Queen of Heart - Xu',
        cards: [3, 5, 6, 7],
        special: [89],
        win: 0,
        loose: 0,
        tie: 0,
      },
      kadowaki: {
        name: 'Dr. Kadowaki',
        cards: [4, 5, 6, 7],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      king: {
        name: 'CC Master King - Quistis',
        cards: [1, 2, 3, 4, 5, 6, 7],
        special: [80],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    balambTown: {
      girl: {
        name: 'Girl in  entrance',
        cards: [1, 3, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      boy: {
        name: 'Boy in Zell\'s house',
        cards: [1, 3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      stationChief: {
        name: 'Station Chief',
        cards: [1, 2],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      gardenStudent: {
        name: 'Garden Student',
        cards: [3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      womanWithDog: {
        name: 'Woman with dog',
        cards: [1, 2, 3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      hotelOwner: {
        name: 'Hotel owner',
        cards: [4, 5],
        special: [93],
        win: 0,
        loose: 0,
        tie: 0,
      },
      hotelOwnerDaughter: {
        name: 'Hotel owner daughter',
        cards: [1, 4, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      maDincht: {
        name: 'Ma Dincht - Zell\'s mother',
        cards: [1, 2, 4, 5],
        special: [106],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    cardQueen: {
      place: 'balambTown',
      name: 'Queen of Cards',
      special: [],
      win: 0,
      loose: 0,
      tie: 0,
      balambTown: [1, 2],
      dollet: [1, 2, 3, 4],
      delingCity: [1, 2, 3, 4, 5],
      fishermansHorizon: [1, 2, 3, 4, 5],
      shumiVillage: [1, 2],
      winhill: [1, 2, 3, 4, 5, 6],
      esthar: [1, 2, 3, 4, 5, 6, 7],
    },
    dollet: {
      oldMan1: {
        name: 'Old man in bar',
        cards: [2, 3, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      oldMan2: {
        name: 'Old man in square',
        cards: [1, 3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      barman: {
        name: 'Barman',
        cards: [2],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      cardQueenSon: {
        name: 'Card Queen\'s Son',
        cards: [1, 2, 3, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      manInSquare: {
        name: 'Man in the Square',
        cards: [3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      carRenter: {
        name: 'Car Renter',
        cards: [4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      hotelEmployee: {
        name: 'Hotel employee',
        cards: [2, 3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      girlInTheBeach: {
        name: 'Girl in the Beach',
        cards: [1, 2],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      youngWoman: {
        name: 'Young Woman',
        cards: [1, 2, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      womanBuying: {
        name: 'Woman buying',
        cards: [1],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      barOwner: {
        name: 'Barman',
        cards: [1, 2, 3, 4],
        special: [86],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    delingCity: {
      stationChief: {
        name: 'Station Chief',
        cards: [1, 2, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      youngWoman: {
        name: 'Young Woman',
        cards: [1, 2],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      oldMan: {
        name: 'Old Man Logan',
        cards: [1, 2, 3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      oldLady: {
        name: 'Old Lady Logana',
        cards: [1, 2, 3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      manInBlack: {
        name: 'Man in black Will Smith',
        cards: [1, 2, 3, 4, 5, 6, 7],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      waitress: {
        name: 'Waitress Penny',
        cards: [1],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      carawayGuard: {
        name: 'Caraway mansion guard',
        cards: [1, 2, 3, 4],
        special: [87, 88],
        win: 0,
        loose: 0,
        tie: 0,
      },
      caraway: {
        name: 'General Caraway',
        cards: [1, 2, 3, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    galbadiaGarden: {
      Student1: {
        name: 'Student 1',
        cards: [1, 2, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      student2: {
        name: 'Student 2',
        cards: [1, 2, 3, 4, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      student3: {
        name: 'Student 3',
        cards: [1, 2, 3, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      peTeacher: {
        name: 'P. E. Teacher',
        cards: [1, 2],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      student4: {
        name: 'Student 4',
        cards: [1, 2],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      student5: {
        name: 'Student 5',
        cards: [1, 2, 3, 4, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      youngStudent: {
        name: 'Young Student',
        cards: [1, 2, 3, 4, 5],
        special: [94],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    timber: {
      wattsGroupie: {
        name: 'Watts groupie',
        cards: [1],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      barOwner: {
        name: 'Bar owner',
        cards: [1, 3, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      hotelOwner: {
        name: 'Hotel owner',
        cards: [4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      girlInBridge: {
        name: 'Girl in the bridge',
        cards: [1],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      drunkMan: {
        name: 'Drunk man',
        cards: [1, 2, 3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      oldWoman: {
        name: 'Old woman',
        cards: [1, 2, 3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      youngWoman: {
        name: 'Young woman',
        cards: [1, 2],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      guard1: {
        name: 'Guard 1',
        cards: [1, 2, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      guard2: {
        name: 'Guard 2',
        cards: [2, 3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      sittingLady: {
        name: 'Sitting lady',
        cards: [2, 3, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      soupOperaAdicted: {
        name: 'Soup opera adicted',
        cards: [1, 2],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      youngMan: {
        name: 'Youn man',
        cards: [1, 2, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      citizen: {
        name: 'Drunk man',
        cards: [1, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    fishermansHorizon: {
      flo: {
        name: 'Flo',
        cards: [1, 2, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      boy: {
        name: 'Boy - Kratos\' Son',
        cards: [1, 2, 3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      youngMan: {
        name: 'Young man',
        cards: [1, 4, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      mecanic: {
        name: 'Mecanic',
        cards: [1, 2, 4, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      fisherman: {
        name: 'Fisherman',
        cards: [1, 6, 7],
        special: [99],
        win: 0,
        loose: 0,
        tie: 0,
      },
      martine: {
        name: 'Martine',
        cards: [1, 2, 3, 4, 5, 6, 7],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      dobe: {
        name: 'Mayor Dobe',
        cards: [1, 2, 4, 5, 6],
        special: [83],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    shumiVillage: {
      scultor: {
        name: 'Scultor',
        cards: [3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      artist: {
        name: 'Artist',
        cards: [1, 2, 6, 7],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      busyShumi: {
        name: 'Busy Shumi',
        cards: [4, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      tamedShumi: {
        name: 'Tamed Shumi',
        cards: [1, 2, 4, 6, 7],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      villagerShumi1: {
        name: 'Villager Shumi 1',
        cards: [1, 2, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      villagerShumi2: {
        name: 'Villager Shumi 2',
        cards: [1, 2, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      villagerShumi3: {
        name: 'Villager Shumi 3',
        cards: [1, 2, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    trabiaGarden: {
      singer: {
        name: 'Singer',
        cards: [1, 3, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      teacher: {
        name: 'Teacher',
        cards: [1, 3, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      technical: {
        name: 'Technical',
        cards: [3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      sleepingStudent: {
        name: 'Sleeping Student',
        cards: [1, 2, 3],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      basketballFanatic: {
        name: 'Basketball Fanatic',
        cards: [2, 3, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      assistantChief: {
        name: 'Assistant Chief',
        cards: [1, 2, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      studant: {
        name: 'Studant',
        cards: [1, 3, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      chocokid: {
        name: 'Chocokid',
        cards: [2, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      seed1: {
        name: 'Seed 1',
        cards: [1, 2, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      seed2: {
        name: 'Seed 2',
        cards: [1, 2, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      selphieFriend: {
        name: 'Selphie Friend',
        cards: [1, 2, 3, 4, 5],
        special: [103],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    winhill: {
      salesman: {
        name: 'Salesman',
        cards: [1, 2, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      man: {
        name: 'Man',
        cards: [1, 3, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      chatelain: {
        name: 'Chatelain',
        cards: [3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      citizen: {
        name: 'Citizen',
        cards: [1, 3, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      hotelOwner: {
        name: 'Hotel owner',
        cards: [1, 2, 4],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      oldman: {
        name: 'Oldman',
        cards: [1, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      fakeStudent: {
        name: 'Fake student',
        cards: [1, 3, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      littleGirl: {
        name: 'Little Girl',
        cards: [6, 7],
        special: [92],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    edeasHouse: {
      chocoboy: {
        name: 'Chocoboy',
        cards: [1, 2],
        special: [82],
        win: 0,
        loose: 0,
        tie: 0,
      },
      watts: {
        name: 'Watts',
        cards: [1, 4, 5],
        special: [79],
        win: 0,
        loose: 0,
        tie: 0,
      },
      edea: {
        name: 'Edea',
        cards: [1, 2, 3, 4, 5, 6, 7],
        special: [108],
        win: 0,
        loose: 0,
        tie: 0,
      },
      cid: {
        name: 'Cid',
        cards: [1, 2, 3, 4, 5, 6, 7],
        special: [109],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
    esthar: {
      presidentialAide: {
        name: 'Presidential aide',
        cards: [3, 4, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      citizen1: {
        name: 'Citizen Kane',
        cards: [1, 2, 3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      soldier1: {
        name: 'Soldier 1',
        cards: [3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      soldier2: {
        name: 'Soldier 2',
        cards: [2, 3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      researcher: {
        name: 'Researcher',
        cards: [1, 2, 3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      odinesAssistant: {
        name: 'Odine\'s assistant',
        cards: [4, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      soldierReading: {
        name: 'Soldier reading a magazine',
        cards: [4, 5, 6],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      citizen2: {
        name: 'Citizen Kane West',
        cards: [1, 2, 3, 5, 6, 7],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      soldierShopping: {
        name: 'Soldier shopping',
        cards: [3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      sentinel: {
        name: 'Sentinel',
        cards: [1, 2, 3, 4, 5],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      oldman1: {
        name: 'Oldman 1',
        cards: [4, 5, 6, 7],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      soldier3: {
        name: 'Soldier 3',
        cards: [1, 2, 6, 7],
        special: [],
        win: 0,
        loose: 0,
        tie: 0,
      },
      odine: {
        name: 'Odine',
        cards: [3, 4, 5, 6],
        special: [100],
        win: 0,
        loose: 0,
        tie: 0,
      },
      laguna: {
        name: 'Laguna',
        cards: [1, 2, 3, 4, 5, 6],
        special: [110],
        win: 0,
        loose: 0,
        tie: 0,
      },
      piet: {
        name: 'Piet',
        cards: [1, 2, 5, 6],
        special: [95],
        win: 0,
        loose: 0,
        tie: 0,
      },
      ellone: {
        name: 'Ellone',
        cards: [1, 2, 6],
        special: [102],
        win: 0,
        loose: 0,
        tie: 0,
      },
    },
  },
  events: {
    caraway: true,
    jack: true,
    joker: true,
    club: true,
    diamond: true,
    spade: true,
    heart: true,
    kadowaki: true,
    king: true,
  },
};
