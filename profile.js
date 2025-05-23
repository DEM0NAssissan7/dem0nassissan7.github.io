const profile = {
    e: {
        carbs: 4.11, // 4.28 -> 4.32 -> 4.75
        protein: 1.21, // 0.68 -> 0.65 -> 0.72
        insulin: 18.06, // 36.2 -> 35.4 -> 33.4 -> 35.4 -> 30.5
    },
    p: {
        carbs: 1.67, // 0.83 -> 1.21 -> 1.55
        protein: [3.36, 0.03514, 1.83], // [rise, plateu rate (per gram protein), end]
        insulin: 0.437, // 1.25 -> 1.77
    },
    n: {
        carbs: 0.0, // 0.0
        protein: 0.0, // 0.64
        insulin: 0.5, // 0.2 -> 0.5
        system: 0, // Do NOT change this value; debug only
    }
}
