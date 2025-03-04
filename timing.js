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


function f_insulin(t, insulin, n_insulin, n_) {
    return insulin * -profile.e.insulin * H(t - profile.n.insulin - n_insulin, profile.p.insulin);
}
function f_carbs(t, carbs, fat) {
    return carbs * profile.e.carbs * H(t - profile.n.carbs - (profile.d.fat.n.carbs * fat),
    profile.p.carbs + (profile.d.fat.p.carbs * fat));
}
function f_protein(t, protein, fat) {
    return protein * profile.e.protein * G(t - profile.n.protein - (profile.d.fat.n.protein * fat),
    profile.p.protein + (profile.d.fat.p.protein * fat));
}

function f(t, n_insulin, insulin, carbs, protein, fat) {
    let x = t - profile.n.system;
    return f_insulin(x, insulin, n_insulin) + f_carbs(x, carbs, fat) + f_protein(x, protein, fat);
}

const precision = 60;
const time_frame = 7;
const insulin_timing_range = [-1, 1];
function get_n_insulin(insulin, protein, carbs, fat, current_sugar) {
    // Try n-insulin ranges from -0.6 to 0.8, testing every 2 minute increment
    let time = null;
    let max = Infinity;
    let delta = Infinity;
    for (let i = insulin_timing_range[0]; i < insulin_timing_range[1]; i += (1 / 60)) {
        // let range = get_sugar_range(i, insulin, protein, carbs, current_sugar);
        let range = integral_range(a => f(a, i, insulin, carbs, protein, fat), current_sugar, -1, time_frame, min_sugar);
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