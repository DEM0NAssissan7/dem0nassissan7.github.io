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
function stringify_meal(meal, meal_name) {
    let foods = [];
    for(let food of meal)
        foods.push(objectify_food(food));
    return JSON.stringify([foods,
        {carbs: parseFloat($(`#carbsId`).val()),
        protein: parseFloat($(`#proteinId`).val()),
        meal_name
    }]);
}
function parse_meal(meal_string) {
    let meal_skeleton = JSON.parse(meal_string);
    return {
        foods: meal_skeleton[0],
        meta: meal_skeleton[1]
    }
}
function import_meal(meal_string) {
    meal = []
    let meal_info = parse_meal(meal_string);
    for(let food of meal_info.foods) {
        let _food = add_food_element(food.name, food.carb_rate, food.protein_rate, food.tooltip, food.measurement);
        _food.element.value = food.value;
    }

    $(`#carbsId`).val(meal_info.meta.carbs);
    $(`#proteinId`).val(meal_info.meta.protein);
}
function clear_meal_storage() {
    localStorage.setItem('meal', stringify_meal([])); // Put a clear meal
}
function clear_meal() {
    $(`#carbsId`).val(0);
    $(`#proteinId`).val(0);
    update_storage();
    clear_meal_storage();
        location.reload();
}

// Custom Meal Saving
let saved_meals = [];
function load_saved_meals() {
    saved_meals = JSON.parse(localStorage.getItem("custom_meals"));
    update_saved_meals_selector();
}
function save_meal() {
    let meal_name = prompt("Enter Meal Name");
    let s = stringify_meal(meal, meal_name);
    saved_meals.push(s);
    update_storage();
    location.reload();
}
function update_saved_meals_selector() {
    for(let meal_string of saved_meals) {
        let meal = parse_meal(meal_string);
        console.log(meal);
        $(`#loadMealId`).append(new Option(meal.meta.meal_name, meal_string));
    }
}
function import_saved_meal() {
    clear_meal_storage(); // Clear old meal
    import_meal($(`#loadMealId`).val());
    update_storage();
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
    console.log("updating storage")
    localStorage.setItem('einsulin', $(`#eInsulinId`).val());
    localStorage.setItem('eprotein', $(`#eProteinId`).val());
    localStorage.setItem('ecarbs', $(`#eCarbsId`).val());
    update_profile();

    localStorage.setItem('meal', stringify_meal(meal));

    localStorage.setItem("custom_meals", JSON.stringify(saved_meals));
}
function update_input_boxes() {
    $(`#eInsulinId`).val(localStorage.getItem('einsulin'));
    $(`#eProteinId`).val(localStorage.getItem('eprotein'));
    $(`#eCarbsId`).val(localStorage.getItem('ecarbs'));
}


// User Tooling
function clear_calibrations() {
    $(`#eInsulinId`).val(default_profile.e.insulin)
    $(`#eProteinId`).val(default_profile.e.protein)
    $(`#eCarbsId`).val(default_profile.e.carbs)
    update_storage();
}
function clear_storage() {
    if(confirm("Are you sure you want to reset?")) {
        localStorage.clear(); // Entirely wipe localstorage
        location.reload();
    }
}

// Startup
function import_meal_storage() {
    console.log("Importing meal from local storage")
    import_meal(localStorage.getItem('meal'));
    load_saved_meals();
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
    
    localStorage.setItem('meal', stringify_meal([])); // Put a clear meal
    localStorage.setItem('custom_meals', JSON.stringify([])); // Put a clear meal
}

if(!storage_is_valid()) init_storage();
update_input_boxes(); // Put cookie values on startup
import_meal_storage();