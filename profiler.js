let meals = []

create_meal(10.4,   // Carbs
            195.7,  // Protein
            200,      // Fat
            95,     // Initial Sugar
            5.25,   // Insulin
            0.5,    // N-Insulin
[95,102,103,106,107,109,111,112,110,107,108,107,106,102,97,98,93,92,91,92,87,85,88,86,87,89,88,90,89,89,89,88,85,82,87,85,85,84,83,83,82,83,82,81,82,81]);

create_meal(8.8,   // Carbs
    176.6,  // Protein
    200,      // Fat
    82,     // Initial Sugar
    4.4,   // Insulin
    (38/60),    // N-Insulin
[82,82,82,84,86,86,91,91,92,95,91,94,98,94,97,94,98,97,97,96,95,94,92,91,91,89,88,87,88,88,88,87,87,87,87,87,82,77,80,82,80,80,79,85,82,82,80,82,83]);

create_meal(12,   // Carbs
    72,  // Protein
    200,      // Fat
    90,     // Initial Sugar
    2.75,   // Insulin
    -0.06,    // N-Insulin
[90,93,96,95,95,98,99,102,102,97,97,98,98,98,98,98,97,93,93,94,92,90,89,89,87,81,75,76,78,77,77,76,73,75,72,75,76,77,77,79,80,79,80,81,81,
81,
82,84,82,87,87,88,88,89,89,
91,
92,92]);

// Perfect Chipotle (may have more carbs than usual)
create_meal(10, // Carbs
    72,         // Protein
    44,          // Fat
    77,         // Initial Sugar
    2.8,        // Insulin
    -(18/60),   // N-Insulin
    [

    77,
    77,
    79,
    76,
    80,
    78,
    78,
    80,
    82,
    85,
    85,
    83,
    80,
    81,
    84,
    83,
    82,
    82,
    80,
    80,
    80,
    79,
    75,
    76,
    77,
    77,
    77,
    77,
    78,
    75,
    79,
    78,
    77,
    78,
    80,
    81,
    79,
    80,
    80,
    81,
    81,
    79,
    77,
    77,
    76,
    76,
    73,
    71,
    72,
    72,
    70,
    74,
    76,
    81,
    82,
    81,
    81,
    76])





function create_meal(carbs, protein, fat, initial_sugar, insulin, n_insulin, data) {
    let canvas = document.createElement("canvas");
    meals.push({
        carbs: carbs,
        protein: protein,
        fat: fat,
        initial_sugar: initial_sugar,
        insulin: insulin,
        n_insulin: n_insulin,
        data: data,
        canvas: canvas,
        ctx: canvas.getContext('2d')
    })
    document.body.appendChild(canvas);
}
function graph_meals() {
    for(let meal of meals) {
        canvas = meal.canvas;
        ctx = meal.ctx;
        graph_sugar(meal.insulin, meal.protein, meal.carbs, meal.fat, meal.initial_sugar, meal.n_insulin);
        ctx.fillStyle = "black"
        for(let i = 0; i < meal.data.length; i++) {
            graph_point(i * (5 / 60), meal.data[i]);
        }
    }
}
function graph_meal(index) {
    // canvas = document.createElement("canvas");
    // ctx = canvas.getContext('2d');
    let meal = meals[index];
    graph_sugar(meal.insulin, meal.protein, meal.carbs, meal.fat, meal.initial_sugar, meal.n_insulin);
    ctx.fillStyle = "black"
    for(let i = 0; i < meal.data.length; i++) {
        graph_point(i * (5 / 60), meal.data[i]);
    }
    // document.body.appendChild(canvas);
}
function updateprofile() {
    profile.e.carbs = parseFloat($(`#ecarbs`).val());
    profile.e.protein = parseFloat($(`#eprotein`).val());
    profile.e.insulin = parseFloat($(`#einsulin`).val());

    profile.n.carbs = parseFloat($(`#ncarbs`).val());
    profile.n.protein = parseFloat($(`#nprotein`).val());
    profile.n.insulin = parseFloat($(`#ninsulin`).val());
    profile.n.system = parseFloat($(`#nsystem`).val());

    profile.p.carbs = parseFloat($(`#pcarbs`).val());
    profile.p.protein = parseFloat($(`#pprotein`).val());
    profile.p.insulin = parseFloat($(`#pinsulin`).val());


    $(`#ecarbsdisplay`).html(profile.e.carbs);
    $(`#eproteindisplay`).html(profile.e.protein);
    $(`#einsulindisplay`).html(profile.e.insulin);

    $(`#ncarbsdisplay`).html(profile.n.carbs);
    $(`#nproteindisplay`).html(profile.n.protein);
    $(`#ninsulindisplay`).html(profile.n.insulin);
    $(`#nsystemdisplay`).html(profile.n.system);

    $(`#pcarbsdisplay`).html(profile.p.carbs);
    $(`#pproteindisplay`).html(profile.p.protein);
    $(`#pinsulindisplay`).html(profile.p.insulin);

    graph_meals();
}

function initialize_sliders () {
    // Load default e values into the sliders
    $(`#ecarbs`).val(profile.e.carbs);
    $(`#eprotein`).val(profile.e.protein);
    $(`#einsulin`).val(profile.e.insulin);

    $(`#ncarbs`).val(profile.n.carbs);
    $(`#nprotein`).val(profile.n.protein);
    $(`#ninsulin`).val(profile.n.insulin);

    $(`#pcarbs`).val(profile.p.carbs);
    $(`#pprotein`).val(profile.p.protein);
    $(`#pinsulin`).val(profile.p.insulin);
}
setTimeout(() => {
    initialize_sliders();
    setTimeout(() => {
        document.addEventListener('mousemove', () => {
            clearTimeout(update_timeout);
            update_timeout = setTimeout(updateprofile, 1);
        });
    }, 100);
}, 100);

let update_timeout;
