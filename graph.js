let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

const graph_start = -1;
const graph_end = 10;
const graph_bottom = 60;
const graph_top = 140;

const horizontal_area = graph_end - graph_start;
const vertical_area = graph_top - graph_bottom;

function get_x(x) {
    return (canvas.width / horizontal_area) * (x - graph_start)
}
function get_y(y) {
    return canvas.height - ((canvas.height / vertical_area) * (y - graph_bottom));
}

function graph_point(x, y) {
    ctx.fillRect(get_x(x), get_y(y), 2, 2);
}
function graph_line(f) {
    // Plot a point every 5 minutes
    const interval = 5/60;
    for(let i = graph_start; i < graph_end; i+=interval) {
        graph_point(i, f(i));
    }
}

function draw_grid() {
    ctx.fillStyle = "gray"
    for(let i = 0; i < graph_end; i+=0.5) {
        ctx.fillRect(get_x(i), 0, 2, canvas.height);
    }
    ctx.fillStyle = "#CCCCCC"
    for(let i = graph_bottom; i < graph_top; i+=10) {
        ctx.fillRect(0, get_y(i), canvas.width, 2);
    }
    ctx.fillStyle = "green";
    ctx.fillRect(0, get_y($(`#targetSugarId`).val() || 83), canvas.width, 2);

    ctx.fillStyle = "yellow";
    ctx.fillRect(0, get_y(110), canvas.width, 2);
    ctx.fillStyle = "red";
    ctx.fillRect(0, get_y(70), canvas.width, 2);
}

function draw_background() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function graph_sugar(insulin, protein, carbs, current_sugar, n_insulin) {
    draw_background();
    draw_grid();
    ctx.fillStyle = "blue";
    graph_line(i => integral_range(a => f(a, n_insulin, insulin, carbs, protein), current_sugar, graph_start, i, 0).integral)
}