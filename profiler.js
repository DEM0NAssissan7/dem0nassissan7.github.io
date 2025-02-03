meals = []

function create_meal(carbs, protein, initial_sugar, insulin, n_insulin, data) {
    meals.push({
        carbs: carbs,
        protein: protein,
        initial_sugar: initial_sugar,
        insulin: insulin,
        n_insulin: n_insulin,
        data: data
    })
    let button = document.createElement("button");
    let index = meals.length - 1;
    button.onclick = () => {
        graph_meal(index);
    }
    button.innerHTML = "Graph Meal " + index;
    document.body.appendChild(button)
}
function graph_meal() {
    for(let i = 0; i < meals.length; i++) {
        graph_meal(i);
    }
}
function graph_meal(index) {
    // canvas = document.createElement("canvas");
    // ctx = canvas.getContext('2d');
    let meal = meals[index];
    graph_sugar(meal.insulin, meal.protein, meal.carbs, meal.initial_sugar, meal.n_insulin);
    ctx.fillStyle = "black"
    for(let i = 0; i < meal.data.length; i++) {
        graph_point(i * (5 / 60), meal.data[i]);
        console.log(i * (5/60), meal.data[i])
    }
    // document.body.appendChild(canvas);
}

create_meal(10.4,   // Carbs
            195.7,  // Protein
            95,     // Initial Sugar
            5.25,   // Insulin
            0.5,    // N-Insulin
    [95,102,103,106,107,109,111,112,110,107,108,107,106,102,97,98,93,92,91,92,87,85,88,86,87,89,88,90,89,89,89,88,85,82,87,85,85,84,83,83,82,83,82,81,82,81]);

create_meal(12,   // Carbs
            72,  // Protein
            90,     // Initial Sugar
            2.75,   // Insulin
            -0.06,    // N-Insulin
    [90,93,96,95,95,98,99,102,102,97,97,98,98,98,98,98,97,93,93,94,92,90,89,89,87,81,75,76,78,77,77,76,73,75,72,75,76,77,77,79,80,79,80,81,81,
        81,
        82,84,82,87,87,88,88,89,89,
        91,
        92,92]);