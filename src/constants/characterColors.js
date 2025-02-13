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
    // Reds (5 variations, light to dark)
    lightRed: ["ff9999", "cc7777", "ffb3b3"], // Soft light red
    brightRed: ["ff5555", "cc4444", "ff7777"], // Vibrant red
    red: ["cc3333", "992626", "e64d4d"], // Standard red (less saturated)
    darkRed: ["992222", "661717", "cc2929"], // Deep dark red
    burgundy: ["722233", "551922", "8f2b40"], // Rich wine red

    // Oranges (5 variations, light to dark)
    lightOrange: ["ffb88c", "cc936f", "ffccaa"], // Soft light orange
    brightOrange: ["ff9955", "cc7744", "ffbb77"], // Vibrant orange
    orange: ["e67300", "b35900", "ff8c1a"], // Standard orange
    darkOrange: ["cc5500", "993f00", "e65c00"], // Deep orange
    rust: ["9c4a1c", "733614", "b85623"], // Earthy rust

    // Yellows (5 variations, light to dark)
    lightYellow: ["fff2b3", "ccc28f", "fff7cc"], // Soft light yellow
    brightYellow: ["ffeb55", "ccbc44", "fff177"], // Vibrant yellow
    yellow: ["e6c700", "b39b00", "ffd91a"], // Standard yellow
    darkYellow: ["cc9900", "996600", "e6ac00"], // Deep yellow
    gold: ["b8860b", "8c6508", "d69c0e"], // Rich gold

    // Greens (5 variations, light to dark)
    lightGreen: ["a8e6a8", "86b886", "c1f0c1"], // Soft light green
    brightGreen: ["66cc66", "4d994d", "80e680"], // Vibrant green
    green: ["2e8b57", "236644", "39b36f"], // Standard green
    darkGreen: ["1f663f", "174d2f", "267a4c"], // Deep forest green
    emerald: ["195f35", "124726", "206f40"], // Rich emerald

    // Cyans (5 variations, light to dark)
    lightCyan: ["b3ffff", "8fcccc", "ccffff"], // Soft light cyan
    brightCyan: ["40e0d0", "33b3a6", "4dfff0"], // Vibrant cyan
    cyan: ["20b2aa", "198893", "26ccc4"], // Standard cyan
    darkCyan: ["008b8b", "006666", "00a3a3"], // Deep cyan
    teal: ["006d6d", "005252", "008787"], // Rich teal

    // Blues (5 variations, light to dark)
    lightBlue: ["add8e6", "8badb8", "c2e3ef"], // Soft light blue
    brightBlue: ["4d94ff", "3d76cc", "66a3ff"], // Vibrant blue
    blue: ["4169e1", "3153b3", "668ee8"], // Standard blue (less saturated)
    darkBlue: ["1e4b8c", "163969", "265cb3"], // Deep blue
    navy: ["1a3366", "14264d", "204080"], // Rich navy

    // Purples (5 variations, light to dark)
    lightPurple: ["e6ccff", "b8a3cc", "f0e0ff"], // Soft light purple
    brightPurple: ["b366ff", "8f52cc", "cc8fff"], // Vibrant purple
    purple: ["8a2be2", "6b22b3", "a935ff"], // Standard purple
    darkPurple: ["663399", "4d2673", "7f40bf"], // Deep purple
    royal: ["4b0082", "380061", "5d00a3"], // Rich royal purple

    // Pinks (5 variations, light to dark)
    lightPink: ["ffd1dc", "ccaab0", "ffe6ec"], // Soft light pink
    brightPink: ["ff69b4", "cc548f", "ff8ac4"], // Vibrant pink
    pink: ["db7093", "af5975", "e88aad"], // Standard pink
    darkPink: ["c71585", "960f65", "e619a1"], // Deep pink
    magenta: ["8b008b", "680068", "b300b3"], // Rich magenta

    // Browns (5 variations, light to dark)
    cream: ["f5deb3", "c4b28f", "fff0d1"], // Creamy light brown
    tan: ["d2b48c", "a89070", "e0c9a6"], // Warm tan
    brown: ["996633", "734d26", "b37940"], // Standard brown
    darkBrown: ["664422", "4d3319", "805533"], // Deep brown
    chocolate: ["3d1f0f", "2e170b", "4c2613"], // Rich chocolate

    // Grays (5 variations, light to dark)
    pearl: ["f0f0f0", "cccccc", "ffffff"], // Pearly white
    lightGray: ["cccccc", "a6a6a6", "e6e6e6"], // Light gray
    gray: ["808080", "666666", "999999"], // Standard gray
    darkGray: ["404040", "333333", "595959"], // Deep gray

    silver: ["c0c0c0", "999999", "d9d9d9"], // Metallic silver

    // Whites (2 variations)
    white: ["ffffff", "e6e6e6", "ffffff"], // Pure white
    offWhite: ["faf0e6", "e6d8cf", "fff4eb"], // Soft off-white
  },

  hair: {
    // Blacks/Grays/Whites
    gray: ["4e4b49", "3e3b39", "2e2b29"],         // Original gray
    black: ["383838", "303030", "2b2b2b"],        // Natural black
    silver: ["c0c0c0", "a6a6a6", "8c8c8c"],      // Silver
    platinum: ["e8e6e1", "c2c0bb", "9c9a95"],     // Light blonde
    white: ["ffffff", "e6e6e6", "cccccc"],        // White/Gray

    // Blondes
    platinumBlonde: ["fff7e6", "f0e6d5", "d8c7b9"], // Ice blonde
    ashBlonde: ["f2e6d1", "e0d5c0", "c9bca9"],      // Cool ash blonde
    dirtyBlonde: ["fff59d", "f0e68c", "c4bc60"],    // Dirty blonde
    blonde: ["f7d8a3", "e6c792", "ccb285"],         // Golden blonde
    sandyBlonde: ["c4ac7e", "b39b6d", "9d8862"],    // Sandy blonde

    // Reds/Gingers
    ginger: ["ea9047", "d97f36", "bf7339"],         // Classic orange ginger
    copperRed: ["d8794c", "c7683b", "b35e3d"],      // Copper red
    red: ["aa4e3c", "993d2b", "8a3829"],            // Natural red
    auburn: ["8d3d30", "7c2c1f", "6d2921"],         // Rich auburn

    // Browns
    lightBrown: ["a78777", "967666", "86685c"],     // Light brown
    brown: ["775549", "664438", "5a3c32"],          // Medium brown
    darkBrown: ["533c2c", "422b1b", "3a261d"],      // Dark brown

    // Fantasy colors
    blueTint: ["5b6c9d", "4a5b8c", "425179"],      // Blue-tinted
    purpleTint: ["725c89", "614b78", "574268"],    // Purple-tinted
    greenTint: ["5b836d", "4a725c", "426652"],     // Green-tinted
    redTint: ["d94c4c", "c43b3b", "a32a2a"],       // Red-tinted
    pinkTint: ["e67399", "d55c82", "cc4775"],      // Pink-tinted
    cyanTint: ["45b3b3", "389999", "2b8080"],      // Cyan-tinted
    violetTint: ["9966cc", "8855b3", "7744aa"],    // Violet-tinted
    mintTint: ["66cc99", "55b383", "449966"],      // Mint-tinted
  },
  cape: {
    // Reds (5 variations, light to dark)
    lightRed: ["ff9999", "cc7777", "ffb3b3"], // Soft light red
    brightRed: ["ff5555", "cc4444", "ff7777"], // Vibrant red
    red: ["cc3333", "992626", "e64d4d"], // Standard red (less saturated)
    darkRed: ["992222", "661717", "cc2929"], // Deep dark red
    burgundy: ["722233", "551922", "8f2b40"], // Rich wine red

    // Oranges (5 variations, light to dark)
    lightOrange: ["ffb88c", "cc936f", "ffccaa"], // Soft light orange
    brightOrange: ["ff9955", "cc7744", "ffbb77"], // Vibrant orange
    orange: ["e67300", "b35900", "ff8c1a"], // Standard orange
    darkOrange: ["cc5500", "993f00", "e65c00"], // Deep orange
    rust: ["9c4a1c", "733614", "b85623"], // Earthy rust

    // Yellows (5 variations, light to dark)
    lightYellow: ["fff2b3", "ccc28f", "fff7cc"], // Soft light yellow
    brightYellow: ["ffeb55", "ccbc44", "fff177"], // Vibrant yellow
    yellow: ["e6c700", "b39b00", "ffd91a"], // Standard yellow
    darkYellow: ["cc9900", "996600", "e6ac00"], // Deep yellow
    gold: ["b8860b", "8c6508", "d69c0e"], // Rich gold

    // Greens (5 variations, light to dark)
    lightGreen: ["a8e6a8", "86b886", "c1f0c1"], // Soft light green
    brightGreen: ["66cc66", "4d994d", "80e680"], // Vibrant green
    green: ["2e8b57", "236644", "39b36f"], // Standard green
    darkGreen: ["1f663f", "174d2f", "267a4c"], // Deep forest green
    emerald: ["195f35", "124726", "206f40"], // Rich emerald

    // Cyans (5 variations, light to dark)
    lightCyan: ["b3ffff", "8fcccc", "ccffff"], // Soft light cyan
    brightCyan: ["40e0d0", "33b3a6", "4dfff0"], // Vibrant cyan
    cyan: ["20b2aa", "198893", "26ccc4"], // Standard cyan
    darkCyan: ["008b8b", "006666", "00a3a3"], // Deep cyan
    teal: ["006d6d", "005252", "008787"], // Rich teal

    // Blues (5 variations, light to dark)
    lightBlue: ["add8e6", "8badb8", "c2e3ef"], // Soft light blue
    brightBlue: ["4d94ff", "3d76cc", "66a3ff"], // Vibrant blue
    blue: ["4169e1", "3153b3", "668ee8"], // Standard blue (less saturated)
    darkBlue: ["1e4b8c", "163969", "265cb3"], // Deep blue
    navy: ["1a3366", "14264d", "204080"], // Rich navy

    // Purples (5 variations, light to dark)
    lightPurple: ["e6ccff", "b8a3cc", "f0e0ff"], // Soft light purple
    brightPurple: ["b366ff", "8f52cc", "cc8fff"], // Vibrant purple
    purple: ["8a2be2", "6b22b3", "a935ff"], // Standard purple
    darkPurple: ["663399", "4d2673", "7f40bf"], // Deep purple
    royal: ["4b0082", "380061", "5d00a3"], // Rich royal purple

    // Pinks (5 variations, light to dark)
    lightPink: ["ffd1dc", "ccaab0", "ffe6ec"], // Soft light pink
    brightPink: ["ff69b4", "cc548f", "ff8ac4"], // Vibrant pink
    pink: ["db7093", "af5975", "e88aad"], // Standard pink
    darkPink: ["c71585", "960f65", "e619a1"], // Deep pink
    magenta: ["8b008b", "680068", "b300b3"], // Rich magenta

    // Browns (5 variations, light to dark)
    cream: ["f5deb3", "c4b28f", "fff0d1"], // Creamy light brown
    tan: ["d2b48c", "a89070", "e0c9a6"], // Warm tan
    brown: ["996633", "734d26", "b37940"], // Standard brown
    darkBrown: ["664422", "4d3319", "805533"], // Deep brown
    chocolate: ["3d1f0f", "2e170b", "4c2613"], // Rich chocolate

    // Grays (5 variations, light to dark)
    pearl: ["f0f0f0", "cccccc", "ffffff"], // Pearly white
    lightGray: ["cccccc", "a6a6a6", "e6e6e6"], // Light gray
    gray: ["808080", "666666", "999999"], // Standard gray
    darkGray: ["404040", "333333", "595959"], // Deep gray

    silver: ["c0c0c0", "999999", "d9d9d9"], // Metallic silver

    // Whites (2 variations)
    white: ["ffffff", "e6e6e6", "ffffff"], // Pure white
    offWhite: ["faf0e6", "e6d8cf", "fff4eb"], // Soft off-white
  },
};
