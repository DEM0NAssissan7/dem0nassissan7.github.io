const profile = {
    e: {
        carbs: 4.32, // 4.28 -> 4.32
        protein: 0.65, // 0.68 -> 0.65
        insulin: 32, // 36.2 -> 35.4 -> 33.4
    },
    n: {
        carbs: 0.0,
        protein: 0.64,
        insulin: 0.25,
        system: 0, // Do NOT change this value
    },
    p: {
        carbs: 0.65,
        protein: 1.54,
        insulin: 1.25,
    },
    d: {
        fat: { // Number modifications due to fat (per gram)
            p: {
                carbs: 0.0010,
                protein: 0.003
            },
            n: {
                carbs: 0.0004,
                protein: 0.001,
            }
        }
    }
}