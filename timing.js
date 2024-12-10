/*


*/

const min_sugar = 79;

function G(x, peak) {
    let r = (3 / (4 * (peak ** 3))) * ((peak ** 2) - ((x - peak) ** 2));
    if (r > 0) return r;
    return 0;
}
function H(x, p) {
    return (
        - (
            (
                Math.exp((x - (8 * p / 7)) / (-p))
                - ((x - (8 * p / 7)) / (-p))
                - 2
            ) / (p * Math.exp(2 / 3))
        )
    );
}


function f_insulin(t, insulin, n_insulin) {
    return insulin * -profile.e.insulin * H(t - profile.n.insulin - n_insulin, profile.p.insulin);
}
function f_carbs(t, carbs) {
    return carbs * profile.e.carbs * G(t - profile.n.carbs, profile.p.carbs);
}
function f_protein(t, protein) {
    return protein * profile.e.protein * G(t - profile.n.protein, profile.p.protein);
}

function f(t, n_insulin, insulin, carbs, protein) {
    return f_insulin(t, insulin, n_insulin) + f_carbs(t, carbs) + f_protein(t, protein);
}

const precision = 60;
const time_frame = 7;
const insulin_timing_range = [-0.6, 0.8];
function get_n_insulin(insulin, protein, carbs, current_sugar) {
    // Try n-insulin ranges from -0.6 to 0.8, testing every 2 minute increment
    let time = null;
    let max = Infinity;
    let min = 0;
    for (let i = insulin_timing_range[0]; i < insulin_timing_range[1]; i += (1 / 60)) {
        // let range = get_sugar_range(i, insulin, protein, carbs, current_sugar);
        let range = integral_range(a => f(a, i, insulin, carbs, protein), current_sugar, 0, time_frame, min_sugar);
        if(!range) continue;
        if (range.max < max) {
            max = range.max;
            min = range.min;
            time = i;
        }
        if (range.max === max) {
            if (range.min > min) {
                min = range.min;
                time = i;
            }
        }
    }
    console.log(min);

    return time;
}

// Shoutout ChatGPT
function integral_range(f, y_offset, a, b, minThreshold, n = 1000) {
    const h = (b - a) / n;

    let x0 = a;
    let f0 = f(x0);

    // Starting integral value at a is 0
    let currentIntegral = y_offset;
    let maxVal = currentIntegral;
    let minVal = currentIntegral;

    for (let i = 1; i <= n; i++) {
        const x1 = a + i * h;
        const f1 = f(x1);

        // Trapezoidal increment
        currentIntegral += (h * (f0 + f1)) / 2;

        // Check early termination condition
        if (currentIntegral < minThreshold) {
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
    }

    return { max: maxVal, min: minVal };
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