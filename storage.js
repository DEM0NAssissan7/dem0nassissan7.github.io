/* We need some kind of way to preserve the contents of the webpage even after a reload.

This is very useful for insulin shots that are taken post-meal and the webpage on the phone
loses its context. It allows us to neglect the notes app entirely.

It can also preserve the calibrations.

*/


const default_profile = {
    e: {
        insulin: profile.e.insulin,
        protein: profile.e.protein,
        carbs: profile.e.carbs
    }
};


// Meals
function objectify_food(food) {
    return {
        name: food.display_name,
        protein_rate: food.protein_rate,
        carb_rate: food.carb_rate,
        tooltip: food.tooltip,
        measurement: food.measurement,
        value: food.element.value
    };
}
function stringify_meal(meal) {
    let foods = [];
    for(let food of meal)
        foods.push(objectify_food(food));
    return JSON.stringify(foods);
}
function import_meal(meal_string) {
    let meal_skeleton = JSON.parse(meal_string);
    for(let food of meal_skeleton) {
        let _food = add_food_element(food.name, food.carb_rate, food.protein_rate, food.tooltip, food.measurement);
        _food.element.value = food.value;
    }
}
function clear_meal() {
    $(`#carbsId`).val(0);
    $(`#proteinId`).val(0);
    update_storage();
    localStorage.setItem('meal', stringify_meal([])); // Put a clear meal
    location.reload();
}


// Profile
function update_profile() {
    profile.e.insulin = localStorage.getItem("einsulin");
    profile.e.protein = localStorage.getItem("eprotein");
    profile.e.carbs = localStorage.getItem("ecarbs");
}

// Calibrations
function update_storage() {
    console.log("Hello")
    localStorage.setItem('einsulin', $(`#eInsulinId`).val());
    localStorage.setItem('eprotein', $(`#eProteinId`).val());
    localStorage.setItem('ecarbs', $(`#eCarbsId`).val());
    update_profile();

    localStorage.setItem('legacycarbrate', $(`#legacyCarbRateId`).val());
    localStorage.setItem('legacyproteinrate', $(`#legacyProteinRateId`).val());

    localStorage.setItem('carbs', $(`#carbsId`).val());
    localStorage.setItem('protein', $(`#proteinId`).val());

    localStorage.setItem('meal', stringify_meal(meal));
}
function update_input_boxes() {
    $(`#eInsulinId`).val(localStorage.getItem('einsulin'));
    $(`#eProteinId`).val(localStorage.getItem('eprotein'));
    $(`#eCarbsId`).val(localStorage.getItem('ecarbs'));

    $(`#legacyCarbRateId`).val(localStorage.getItem('legacycarbrate'));
    $(`#legacyProteinRateId`).val(localStorage.getItem('legacyproteinrate'));

    $(`#carbsId`).val(localStorage.getItem('carbs'));
    $(`#proteinId`).val(localStorage.getItem('protein'));
}


// User Tooling
function clear_storage() {
    confirm("Are you sure you want to reset?");
    $(`#eInsulinId`).val(default_profile.e.insulin)
    $(`#eProteinId`).val(default_profile.e.protein)
    $(`#eCarbsId`).val(default_profile.e.carbs)
    $(`#legacyProteinRateId`).val(1);
    $(`#legacyCarbRateId`).val(1);
    clear_meal();
}

// Startup
function import_meal_storage() {
    console.log("Importing meal from local storage")
    import_meal(localStorage.getItem('meal'));
    setTimeout(calculate_meal, 200);
}
function storage_is_valid() {
    if(!localStorage.getItem('einsulin')) return false;
    return true;
}
function init_storage() {
    console.warn("Initializing Web Storage")
    localStorage.setItem('einsulin', profile.e.insulin);
    localStorage.setItem('eprotein', profile.e.protein);
    localStorage.setItem('ecarbs', profile.e.carbs);

    localStorage.setItem('legacycarbrate', 1);
    localStorage.setItem('legacyproteinrate', 1);

    localStorage.setItem('carbs', 0);
    localStorage.setItem('protein', 0);
    
    localStorage.setItem('meal', stringify_meal([])); // Put a clear meal
}

if(!storage_is_valid()) init_storage();
update_input_boxes(); // Put cookie values on startup
import_meal_storage();