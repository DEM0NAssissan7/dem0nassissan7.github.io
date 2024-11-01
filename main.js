/* Unit Calculation */
// Number Cap
function cap(x, precision, f) {
    let p = precision
    if (!p) p = 0
    let exp = Math.pow(10, p)
    return f(x * exp) / exp
}

function round(x, precision) {
    return cap(x, precision, Math.round)
}

function floor(x, precision) {
    return cap(x, precision, Math.floor)
}

// Insulin Calculation
function quarterUnits(insulin) {
    let remainder = insulin - floor(insulin, 0)
    let quarters = remainder * 4
    return floor(quarters, 0)
}

function getInsulin(insulin) {
    let quarter = quarterUnits(insulin)
    let retval = floor(insulin)
    if (quarter === 4) retval++
    return retval
}

function getQuarterUnits(insulin) {
    let retval = quarterUnits(insulin)
    if (retval === 4) return 0
    return retval
}

function calculate(carb, protein) {
    let proteinBase = parseFloat($(`#proteinCalculationId`).val())
    let carbBase = parseFloat($(`#carbCalculationId`).val())

    if (protein === NaN || carb === NaN) return
    let insulin = round((protein * proteinBase) / 28 + (carbBase * carb) / 8, 2)
    if (!insulin) return

    $(`#actualId`).html(insulin);
    $(`#resultsId`).html(getInsulin(insulin));
    $(`#quarterId`).html(getQuarterUnits(insulin));
    $(`#infoId`).html(` - ${round(carb, 1)}g carbs | ${round(protein, 1)}g protein`);
}

// Nice event listener
document.addEventListener("keyup", (e) => {
    e = e || window.event
    setTimeout(calculate_meal, 10);
});

/* Food Database */
// add_food(name, carb content per 100g, protein content per 100g)

function add_food(name, carbs_per_100g, protein_per_100g) {
    let val = `${name}|${carbs_per_100g / 100}|${protein_per_100g / 100}|grams|g`
    $(`#addFoodSelectId`).append(new Option(name, val))
}
function add_food_amount(name, carbs_per_1, protein_per_1) {
    let val = `${name}|${carbs_per_1}|${protein_per_1}|servings|s`
    $(`#addFoodSelectId`).append(new Option(name, val))
}

/* Meal Assembly & Calculation */
let meal = []
class Food {
    grams = 0
    carbs = 0
    protein = 0
    constructor(carbs, protein) {
        this.carb_rate = carbs
        this.protein_rate = protein
    }
    calculate_nutrients() {
        this.carbs = this.grams * this.carb_rate
        this.protein = this.grams * this.protein_rate
    }
    update_from_element() {
        this.grams = this.element.value
        this.calculate_nutrients()
    }
}
function addFoodItem() {
    let val = $(`#addFoodSelectId`).val()

    let split_val = val.split("|")
    let name = split_val[0]
    let carbs = parseFloat(split_val[1])
    let protein = parseFloat(split_val[2])
    let tooltip = split_val[3];
    let measurement = split_val[4];
    let food = new Food(carbs, protein);

    let element = document.createElement("div")

    element.append(`${name} [${tooltip}]: `);
    let weight = document.createElement("input")
    food.element = weight;
    weight.type = "number"
    let handler = () => {
        setTimeout(() => {
            food.update_from_element()
            info.innerHTML = `(${round(food.carbs, 2)}g carbs, ${round(food.protein, 2)}g protein)`
        }, 4);
    }
    weight.oninput = handler;
    document.addEventListener("keyup", handler);
    element.appendChild(weight)
    element.append(" " + measurement + "   ")

    let info = document.createElement("text")
    element.appendChild(info)
    $(`#mealId`).append(element)

    meal.push(food)
    $(`option[value='${val}']`).remove()
}

// Calculation
function calculate_meal() {
    let carbs = parseFloat($("#carbsId").val());
    let protein = parseFloat($("#proteinId").val());

    for(let food of meal) {
        food.update_from_element()
        carbs += food.carbs;
        protein += food.protein;
    }
    calculate(carbs, protein);
}