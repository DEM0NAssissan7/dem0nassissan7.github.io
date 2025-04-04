const profile = {
    e: {
        carbs: 4.75, // 4.28 -> 4.32 -> 4.75
        protein: 1.19, // 0.68 -> 0.65 -> 0.72
        insulin: 28.5, // 36.2 -> 35.4 -> 33.4 -> 35.4 -> 30.5
    },
    p: {
        carbs: 1, // 0.83 -> 1.21 -> 1.55
        protein: 2.15, // 1.54 -> 1.97 -> 1.83
        insulin: 2.55, // 1.25 -> 1.77
        insulin_mult: 0.09, // How much one unit of insulin causes it to peak faster
    },
    n: {
        carbs: 0.0, // 0.0
        protein: 0.8, // 0.64
        insulin: 0.58, // 0.2 -> 0.5
        insulin_mult: 0.08, // How much one unit of insulin causes it to work faster
        system: 0, // Do NOT change this value; debug only
    }
}