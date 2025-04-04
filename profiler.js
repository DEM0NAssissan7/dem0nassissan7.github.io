let meals = []

// create_meal(10.4,   // Carbs
//             195.7,  // Protein
//             95,     // Initial Sugar
//             5.25,   // Insulin
//             0.5,    // N-Insulin
// [95,102,103,106,107,109,111,112,110,107,108,107,106,102,97,98,93,92,91,92,87,85,88,86,87,89,88,90,89,89,89,88,85,82,87,85,85,84,83,83,82,83,82,81,82,81]);

// create_meal(8.8,   // Carbs
//     176.6,  // Protein
//     82,     // Initial Sugar
//     4.4,   // Insulin
//     (38/60),    // N-Insulin
// [82,82,82,84,86,86,91,91,92,95,91,94,98,94,97,94,98,97,97,96,95,94,92,91,91,89,88,87,88,88,88,87,87,87,87,87,82,77,80,82,80,80,79,85,82,82,80,82,83]);

// create_meal(12,   // Carbs
//     72,  // Protein
//     90,     // Initial Sugar
//     2.75,   // Insulin
//     -0.06,    // N-Insulin
// [90,93,96,95,95,98,99,102,102,97,97,98,98,98,98,98,97,93,93,94,92,90,89,89,87,81,75,76,78,77,77,76,73,75,72,75,76,77,77,79,80,79,80,81,81,
// 81,
// 82,84,82,87,87,88,88,89,89,
// 91,
// 92,92]);

// Perfect Chipotle (may have more carbs than usual)
// create_meal(10, 72, 77, 2.8, -(18/60), [
//     77,
//     77,
//     79,
//     76,
//     80,
//     78,
//     78,
//     80,
//     82,
//     85,
//     85,
//     83,
//     80,
//     81,
//     84,
//     83,
//     82,
//     82,
//     80,
//     80,
//     80,
//     79,
//     75,
//     76,
//     77,
//     77,
//     77,
//     77,
//     78,
//     75,
//     79,
//     78,
//     77,
//     78,
//     80,
//     81,
//     79,
//     80,
//     80,
//     81,
//     81,
//     79,
//     77,
//     77,
//     76,
//     76,
//     73,
//     71,
//     72,
//     72,
//     70,
//     74,
//     76,
//     81,
//     82,
//     81,
//     81,
//     76])

// create_meal(9.6, 96, 75, 3.7, (10/60), [

// 75,
// 77,
// 74,
// ,
// 78,
// 77,
// 79,
// 80,
// 82,
// ,
// 79,
// 79,
// 81,
// 86,
// 89,
// 88,
// 89,
// 89,
// 90,
// 91,
// 91,
// 90,
// 92,
// 93,
// 90,
// 91,
// 91,
// 90,
// 90,
// 89,
// 88,
// 86,
// 86,
// 85,
// 82,
// 87,
// 90,
// 85,
// 85,
// 83,
// 81,
// 81,
// 78,
// 79,
// 79,
// 79,
// 79,
// 78,
// 77,
// 77,
// 76,
// 77,
// 76,
// 75,
// 78,
// 77,
// 78,
// 81,
// 84,
// 85,
// 87,
// 87,
// 84,
// 86,
// 87,
// 86,
// 87,
// 87,
// 88,
// 89,
// 89,

// ])

// Mar 17 12:00
// create_meal(8.6,108.2, 99, 3.7, -(13/60), [
//     101,
//     98,
//     97,
//     99,
//     99,
//     98,
//     96,
//     96,
//     97,
//     99,
//     100,
//     101,
//     99,
//     102,
//     103,
//     101,
//     100,
//     98,
//     97,
//     97,
//     99,
//     99,
//     99,
//     99,
//     98,
//     97,
//     95,
//     97,
//     96,
//     95,
//     98,
//     102,
//     102,
//     103,
//     100,
//     100,
//     103,
//     96,
//     94,
//     97,
//     98,
//     95,
//     96,
//     94,
//     96,
//     99,
//     94,
//     93,
//     96,
//     97,
//     95,
//     97,
//     96,
//     100,
//     100,
//     101,
//     107,
//     107,
//     103,
//     100,
//     100,
//     102,
//     104,
//     102,
//     102,
//     104,
//     105,
//     105,
//     105,
//     106,
//     106,
//     108,
//     109,
//     112,
//     113,
//     114,
//     112,
//     113,
//     112,
//     115,
//     114,
//     113,
//     112,
//     109,
//     117,
//     109,
//     97
// ]);

// // Ground lamb and beef stuff (Mar 22 @ 9:00PM )
// create_meal(7, 152.1, 90, 4.3, (5/60), []);

// create_meal(8, 92, 90, 3.0, -(15/60), [90,90,90,92,91,88,90,90,91,92,92,91,92,93,92,93,91,91,93,92,91,93,91,94,94,94,95,92,93,93,92,91,91,90,89,90,91,89,92,88,88,87,85,91,84,82,79,84,88,83,87,86,84,87,87,91,89,87,90,93,94,95,97,98,99,100,103,103,102,102,103,103,100,97,97,97,100,99])



create_meal(0, 0, 133, 1, (0), [137,
    145,
    146,
    135,
    129,
    128,
    129,
    133,
    139,
    134,
    133,
    135,
    132,
    132,
    134,
    130,
    131,
    129,
    129,
    128,
    126,
    124,
    124,
    123,
    123,
    122,
    123,
    120,
    117,
    115,
    115,
    113,
    115,
    110,
    109,
    109,
    108,
    107,
    109,
    106,
    105,
    106,
    106,
    106,
    103,
    102,
    103,
    103,
    102,
    103,
    106,
    103,
    102,
    104,
    105,
    107,
    105,
    107,
    106,
    108,
    106,
    105,
    104,
    106,
    109
    ]) // debug


// 4-3-25 -> eggs and sausage
create_meal(8.2, 93, 88, 4.5, (12/60), [88,88,90,91,91,102,103,106,107,110,109,108,101,106,108,111,109,101,98,98,98,102,101,103,102,105,104,104,104,106,99,105,104,104,106,104,104,105,105,106,104,102,105,105,104,96,100,103,102,102,97,97,102,104,99,99,100,99,101,101,104,102,101,104,103,104,106,110,110,113,116,116])

// 4-2-25 -> eggs and sausage
create_meal(8, 96, 120, 5.5, (-2/60), [119,120,121,122,125,132,132,131,130,128,129,130,130,130,129,129,127,124,122,114,110,108,105,104,105,97,92,90,91,92,92,95,96,98,94,96,103,102,102,103,103,104,104,105,107,107,105,106,105,109,113,114,112,116,117,111,107,111,114,119,117,120,115,118,120,120,130,126,125,124,121,121,120,121,122,120,117,125,121,118,123,118,123,120,122,121,122,121,121,118,119,121,119,119,117,114,113,114,113,111,110,108,107,107,104,102,99,101,100,101,100,101,102,102])

// 4-1-24 -> 2.5 units of R correction
create_meal(0,0,158, 2.5, 0, [158,148,154,161,157,157,158,158,156,152,149,148,145,141,141,138,135,133,134,133,128,128,125,120,124,126,121,120,122,120,117,117,115,115,115,111,109,107,107,102,100,97,102,105,104,103,105,102,103,103,103,103,100,100,100,96,100,101,95])

// 4-2-25 -> steak w/ shrooms
create_meal(2, 76.7, 101, 4, (16/60), [100,101,102,102,,99,104,105,107,107,106,103,100,99,100,101,100,98,97,96,96,92,90,89,88,90,86,86,86,86,86,84,85,85,85,85,86,85,85,84,83,84,83,84,85,87,89,90,89,91,92,91,92,92,92,93,91,93,94,95,90,88,92,92,98,92,91,91,89,,94,90,93,93,93,93,89,87,88,92,95,89,87,89,89,89,89,89,88,88,81,84,82,74,65,67,67,67,68,68,68,69,69,61,65,75,74,69,77,71,61,67,74,97,98,95,91,95,99,100])

create_meal(8.5, 66, 127, 5.7, (10/60), [127,130,135,131,138,139,137,133,140,148,145,145,147,142,140,137,136,136,138,148,149,148,148,149,149,146,146,144,141,134,131,125,125,124,121,125,121,125,122,121,119,116,115,118,118,118,118,125,119,121,122,119,120,125,121,119,,117,118,121,122,121,])

function create_meal(carbs, protein, initial_sugar, insulin, n_insulin, data) {
    let canvas = document.createElement("canvas");
    meals.push({
        carbs: carbs,
        protein: protein,
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
        graph_sugar(meal.insulin, meal.protein, meal.carbs, meal.initial_sugar, meal.n_insulin);
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
    graph_sugar(meal.insulin, meal.protein, meal.carbs, meal.initial_sugar, meal.n_insulin);
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
    profile.e.sugar = parseFloat($(`#esugar`).val());

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
    $(`#esugardisplay`).html(profile.e.sugar);

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
    $(`#esugar`).val(profile.e.sugar);

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
