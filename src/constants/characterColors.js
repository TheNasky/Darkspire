export const CHARACTER_COLORS = {
  skin: {
    pale: ["ffe4d4", "eecebf", "ddae9f"], // Very light, pink undertone
    fair: ["ffe0bd", "ecc5a1", "dbb081"], // Light, neutral undertone
    light: ["ffd5b3", "e6b592", "d49572"], // Light medium, warm undertone
    default: ["f8c090", "c88850", "b87830"], // Original
    lightTan: ["f5d6b2", "e0b89b", "cb9a7d"], // Light tan
    mediumTan: ["d1a68a", "b78b6e", "9d7052"], // Medium tan
    lightBrown: ["c2a6a1", "b09b8e", "9e857c"], // Light brown
    medium: ["e6b592", "e6b592", "c59472"], // Medium, neutral undertone
    olive: ["d4a784", "b38a64", "926c46"], // Medium, olive undertone
    tan: ["c68642", "9e6d35", "764f28"], // Medium dark, warm undertone
    brown: ["a0673f", "804d2f", "60331f"], // Dark, warm undertone
    dark: ["765038", "7a4d3a", "5e392c"], // Very dark, neutral undertone
    deep: ["4a332a", "362419", "221008"], // Deepest, cool undertone
  },

  clothes: {
    // Reds
    red: ["ff5555", "cc2929", "ff7777"],        // Pure red
    deepRed: ["cc0000", "990000", "ff0000"],    // Dark red
    burgundy: ["800020", "600018", "a00028"],    // Deep red

    // Oranges
    orange: ["ff8c00", "cc7000", "ffaa00"],     // Pure orange
    brightOrange: ["ff9933", "cc6633", "ffbb55"],    // Bright orange
    deepOrange: ["ff6600", "cc3300", "ff8800"], // Dark orange
    rust: ["b7410e", "8a310b", "e55111"],        // Deep orange

    // Yellows
    brightYellow: ["ffcc00", "cc9900", "ffee00"],    // Bright yellow
    deepYellow: ["cccc00", "999900", "ffff00"], // Dark yellow
    yellow: ["ffd700", "daa520", "fff000"],      // Pure yellow
    yellowPastel: ["fff68f", "ccc572", "fffaaf"], // Pastel yellow
    brightGold: ["ffcc66", "cc9966", "ffee88"],    // Bright gold

    // Greens
    brightGreen: ["99ff99", "66cc66", "bbffbb"],    // Bright green
    deepGreen: ["00cc00", "009900", "00ff00"], // Dark green
    green: ["50c878", "2e8b57", "60ea90"],      // Pure green
    greenPastel: ["98fb98", "79c979", "b4ffb4"], // Pastel green
    forest: ["228b22", "1a691a", "2aab2a"],      // Deep green

    // Cyans/Teals
    deepCyan: ["00cccc", "009999", "00ffff"], // Dark cyan
    cyan: ["00cccc", "009999", "00eeee"],       // Pure cyan
    cyanPastel: ["afeeee", "8cbebe", "cfffff"], // Pastel cyan
    teal: ["008080", "006060", "00a0a0"],        // Deep cyan

    // Blues
    brightSkyBlue: ["66ccff", "3399cc", "88eeff"],    // Bright sky blue
    brightBlue: ["6699ff", "3366cc", "88bbff"],    // Bright blue
    deepBlue: ["0000cc", "000099", "0000ff"], // Dark blue
    blue: ["4287f5", "2561d9", "64a9ff"],       // Pure blue
    bluePastel: ["b0e2ff", "8eb4cc", "d2f4ff"], // Pastel blue
    navy: ["000080", "000060", "0000a0"],        // Deep blue

    // Purples/Magentas
    deepPurple: ["cc00cc", "990099", "ff00ff"], // Dark purple
    purple: ["9b30ff", "7722cc", "bd52ff"],     // Pure purple
    royal: ["4b0082", "380061", "5d00a3"],       // Deep purple
    plum: ["8b008b", "680068", "ad00ad"],        // Deep magenta
    pinkPastel: ["ffb6c1", "cc919a", "ffd4db"], // Pastel pink
    hotPink: ["ff3399", "cc0066", "990033"], // Dark pink
    darkPink: ["cc0066", "990033", "ff0099"], // Dark pink
    brightLavender: ["ffccff", "cc99cc", "ffeeff"],    // Bright lavender
    lavenderPastel: ["e6e6fa", "b8b8c8", "f8f8ff"], // Pastel lavender

    white: ["ffffff", "e6e6e6", "cccccc"], // White/Gray
    lightGray: ["e6e6e6", "c2c2c2", "a8a8a8"], // Light gray
    ash: ["c2c2c2", "a6a6a6", "8a8a8a"], // Ash gray
    darkGray: ["a6a6a6", "8a8a8a", "6e6e6e"], // Dark gray
    blackGray: ["8a8a8a", "666666", "424242"], // Black gray
    veryDarkBlackGray: ["666666", "4d4d4d", "333333"], // Very dark black gray
    charcoal: ["383838", "313131", "2b2b2b"], // Soft black
  },

  hair: {
    black: ["383838", "303030", "2b2b2b"], // Natural black
    darkBrown: ["3b2417", "2a1a11", "19100b"], // Dark brown
    brown: ["6b4423", "503219", "351f0f"], // Medium brown
    lightBrown: ["8b6b4f", "695239", "473923"], // Light brown
    red: ["8b3626", "662819", "431a0c"], // Natural red
    auburn: ["5c2e1d", "451f12", "2e1407"], // Dark red
    blonde: ["e6be8a", "bf9e73", "987c5c"], // Golden blonde
    dirtyBlonde: ["f0e68c", "d1c76b", "b2a84a"], // Dirty blonde
    ashBlonde: ["c2b280", "a89f7d", "8e855a"], // Ash blonde
    platinum: ["e8e6e1", "c2c0bb", "9c9a95"], // Light blonde
    gray: ["4e4b49", "3e3b39", "2e2b29"], // Original gray
    silver: ["c0c0c0", "a6a6a6", "8c8c8c"], // Silver
    white: ["ffffff", "e6e6e6", "cccccc"], // White/Gray
    softBlack: ["4b3d3f", "3a3537", "292729"], // Soft black
    chestnut: ["7f4c3a", "6b3b32", "572a2a"], // Chestnut brown
    lightChestnut: ["d1b7a0", "b59a8c", "997d78"], // Light chestnut
  },
  cape: {
    // Reds
    red: ["ff0000", "cc0000", "ff3333"],        // Bright red
    deepRed: ["cc0000", "990000", "ff0000"],    // Dark red
    burgundy: ["800020", "600018", "a00028"],    // Deep red

    // Oranges
    orange: ["ff8c00", "cc7000", "ffaa00"],     // Pure orange
    brightOrange: ["ff9933", "cc6633", "ffbb55"],    // Bright orange
    deepOrange: ["ff6600", "cc3300", "ff8800"], // Dark orange
    rust: ["b7410e", "8a310b", "e55111"],        // Deep orange

    // Yellows
    brightYellow: ["ffcc00", "cc9900", "ffee00"],    // Bright yellow
    deepYellow: ["cccc00", "999900", "ffff00"], // Dark yellow
    yellow: ["ffff00", "cccc00", "ffff33"],     // Bright yellow
    yellowPastel: ["fff68f", "ccc572", "fffaaf"], // Pastel yellow
    brightGold: ["ffcc66", "cc9966", "ffee88"],    // Bright gold

    // Greens
    brightGreen: ["99ff99", "66cc66", "339933"], // Bright green
    deepGreen: ["00cc00", "009900", "00ff00"], // Dark green
    green: ["00ff00", "00cc00", "33ff33"],      // Bright green
    greenPastel: ["98fb98", "79c979", "b4ffb4"], // Pastel green
    forest: ["228b22", "1a691a", "2aab2a"],      // Deep green

    // Cyans/Teals
    deepCyan: ["00cccc", "009999", "00ffff"], // Dark cyan
    cyan: ["00cccc", "009999", "00eeee"],       // Pure cyan
    cyanPastel: ["afeeee", "8cbebe", "cfffff"], // Pastel cyan
    teal: ["008080", "006060", "00a0a0"],        // Deep cyan

    // Blues
    brightSkyBlue: ["66ccff", "3399cc", "88eeff"],    // Bright sky blue
    brightBlue: ["6699ff", "3366cc", "88bbff"],    // Bright blue
    deepBlue: ["0000cc", "000099", "0000ff"], // Dark blue
    blue: ["0000ff", "0000cc", "3333ff"],       // Bright blue
    bluePastel: ["ff00ff", "cc00cc", "ff33ff"],     // Bright purple
    navy: ["000080", "000060", "0000a0"],        // Deep blue

    // Purples/Magentas
    deepPurple: ["cc00cc", "990099", "ff00ff"], // Dark purple
    purple: ["ff00ff", "cc00cc", "ff33ff"],     // Bright purple
    royal: ["4b0082", "380061", "5d00a3"],       // Deep purple
    plum: ["8b008b", "680068", "ad00ad"],        // Deep magenta
    pinkPastel: ["ffb6c1", "cc919a", "ffd4db"], // Pastel pink
    hotPink: ["ff3399", "cc0066", "990033"], // Dark pink
    darkPink: ["cc0066", "990033", "ff0099"], // Dark pink
    brightLavender: ["ffccff", "cc99cc", "ffeeff"],    // Bright lavender
    lavenderPastel: ["e6e6fa", "b8b8c8", "f8f8ff"], // Pastel lavender

    white: ["ffffff", "e6e6e6", "cccccc"], // White/Gray
    lightGray: ["e6e6e6", "c2c2c2", "a8a8a8"], // Light gray
    ash: ["c2c2c2", "a6a6a6", "8a8a8a"], // Ash gray
    darkGray: ["a6a6a6", "8a8a8a", "6e6e6e"], // Dark gray
    blackGray: ["8a8a8a", "666666", "424242"], // Black gray
    veryDarkBlackGray: ["666666", "4d4d4d", "333333"], // Very dark black gray
    charcoal: ["383838", "313131", "2b2b2b"], // Soft black
  },
};
