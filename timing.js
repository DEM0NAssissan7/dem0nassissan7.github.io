/*


*/

const min_sugar = 80;

function G(x, p) {
    let r = (3 / (4 * (p ** 3))) * ((p ** 2) - ((x - p) ** 2));
    if (r > 0) return r;
    return 0;
}
function H(x, p) {
    let r = (
        - (
            (
                Math.exp((x - (8 * p / 7)) / (-p))
                - ((x - (8 * p / 7)) / (-p))
                - 2
            ) / (p * Math.exp(2 / 3))
        )
    );
    if (r > 0) return r;
    return 0;
}
function Z(t, p) { // Exponential decay
    if(t <= 0) return 0;
    return p * Math.exp(-p * t);
}
function P(t, [a, d, b]) {
    if(t <= 0) return 0;
    if(t >= a + d + b) return 0;

    let y = 1 / (0.5 * a + d + 0.5 * b);

    if(t < a) return y * t/a;
    if(t < a + d) return y;
    if(t < a + d + b) return y * (1 - (t - a - d) / b);
}


function f_insulin(t, insulin, n_insulin) {
    return insulin * -profile.e.insulin * Z(t - profile.n.insulin - n_insulin, profile.p.insulin);
}
function f_carbs(t, carbs) {
    return carbs * profile.e.carbs * G(t - profile.n.carbs, profile.p.carbs);
}
function f_protein(t, protein) {
    return protein * profile.e.protein * P(t - profile.n.protein, [profile.p.protein[0], profile.p.protein[1] * protein, profile.p.protein[2]]);
}

function f_meal(t, carbs, protein) {
    return (carbs * profile.e.carbs + protein * profile.e.protein) * G(t - profile.n.carbs, profile.p.carbs);
}

function f(t, n_insulin, insulin, carbs, protein) {
    // return f_insulin(t - profile.n.system, insulin, n_insulin) + f_meal(t, carbs, protein);
    return f_insulin(t - profile.n.system, insulin, n_insulin) + f_carbs(t - profile.n.system, carbs) + f_protein(t - profile.n.system, protein)
}

const precision = 60;
const time_frame = 7;
const insulin_timing_range = [-2, 2];
function get_n_insulin(insulin, protein, carbs, current_sugar) {
    // Try n-insulin ranges from -0.6 to 0.8, testing every 2 minute increment
    let time = null;
    let max = Infinity;
    let delta = Infinity;
    for (let i = insulin_timing_range[0]; i < insulin_timing_range[1]; i += (1 / 60)) {
        // let range = get_sugar_range(i, insulin, protein, carbs, current_sugar);
        let range = integral_range(a => f(a, i, insulin, carbs, protein), current_sugar, -1, time_frame, min_sugar);
        if(!range) continue;
        let d = range.max - range.min;
        if (range.max < max) {
            delta = d;
            max = range.max;
            time = i;
        } else if(range.max === max && d < delta) {
            delta = d;
            max = range.max;
            time = i;
        }   
    }

    return time;
}

// Shoutout ChatGPT
function integral_range(f, y_offset, a, b, minThreshold, n = 1000) {
    const h = (b - a) / n;

    let x0 = a;
    let f0 = f(x0);

    // Starting integral value at a is 0
    let currentIntegral = y_offset;
    let lastIntegral = currentIntegral;
    let maxVal = currentIntegral;
    let minVal = currentIntegral;

    for (let i = 1; i <= n; i++) {
        const x1 = a + i * h;
        const f1 = f(x1);

        // Trapezoidal increment
        currentIntegral += (h * (f0 + f1)) / 2;

        // Check early termination condition
        // if(currentIntegral <= minThreshold) {
        //     console.log("UH OH", currentIntegral)
        //     return null;
        // }
        if (currentIntegral < lastIntegral && currentIntegral <= minThreshold) {
            return null;
        }

        // Update max and min encountered integral
        if (currentIntegral > maxVal) {
            maxVal = currentIntegral;
        }
        if (currentIntegral < minVal) {
            minVal = currentIntegral;
        }

        // Move to next interval
        x0 = x1;
        f0 = f1;
        lastIntegral = currentIntegral;
    }

    return { integral: currentIntegral, max: maxVal, min: minVal };
}
function get_sugar_range(n_insulin, insulin, protein, carbs, current_sugar) {
    let min = Infinity;
    let max = 0;
    let s = current_sugar;
    for (let i = 0; i < time_frame; i += (1 / precision)) {
        s += (f_insulin(i, insulin, n_insulin) + f_carbs(i, carbs) + f_protein(i, protein)) / precision;
        // if(s < min_sugar) return;
        if (s < min) min = s;
        if (s > max) max = s;
    }
    // console.log(n_insulin, s, min, max)
    return [round(min), round(max)];
}
