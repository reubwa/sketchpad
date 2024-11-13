
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const height = 1080;
const width = 1920;
const cl = document.getElementById("clLine");
const clF = document.getElementById("clFill");
const raL = document.getElementById("raLine");
const raFS = document.getElementById("raFS");
const fontpicker = document.getElementById("fontpicker");
const inputElement = document.getElementById("fp");
const cm = document.getElementById("c-mode");
const sb = document.getElementById("sb");
const rb = document.getElementById("rb");

// resize canvas (CSS does scale it up or down)
canvas.height = height;
canvas.width = width;

//frehand start

function startFreehand() {
    clearEventListeners();
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mousemove", draw);
}

context.lineWidth = 10;
context.lineCap = "round";

let drawing = false;

function startDrawing(e) {
    drawing = true;
    context.beginPath();
    draw(e);
}


function endDrawing(e) {
    drawing = false;
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;
  
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY
    }
}

function draw(e) {
    if (!drawing) return;

    let { x, y } = getMousePos(canvas, e);
    context.strokeStyle = cl.value;
    context.lineWidth = raL.value;
    context.lineTo(x, y);
    context.stroke();
}


//freehand end


//rect start

function startDrawRect() {
    clearEventListeners();
    canvas.addEventListener("mousedown", startRect);
    canvas.addEventListener("mouseup", endRect);
}

let start = {}

function startRect(e) {
	start = getMousePos(canvas, e);
}



function endRect(e) {
    let { x, y } = getMousePos(canvas, e);
    context.lineWidth = raL.value;
    context.strokeStyle = cl.value;
    context.fillStyle = clF.value;
    context.fillRect(start.x, start.y, x - start.x, y - start.y);
    context.strokeRect(start.x, start.y, x - start.x, y - start.y);
}



//rect end

//text start

function startDrawText() {
    clearEventListeners();
    canvas.addEventListener("mousedown", drawText);
}

function drawText(e) {
    let fontszn = raFS.value;
    let fontsz = fontszn.concat("px");
    let fontszfixed = fontsz.concat(" ");
    let result = fontszfixed.concat(fontpicker.value);
    context.font = result;
    let mCoords = getMousePos(canvas,e);
    let input = prompt("Enter some text");
    context.fillStyle = clF.value;
    context.fillText(input, mCoords.x, mCoords.y);
}

//text end


function clearEventListeners(){
    canvas.removeEventListener("mousedown", startRect);
    canvas.removeEventListener("mouseup", endRect);
    canvas.removeEventListener("mousedown", startDrawing);
    canvas.removeEventListener("mouseup", endDrawing);
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mousedown", drawText);
}

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function changeCompositingMode(){
    context.globalCompositeOperation = cm.value;
}