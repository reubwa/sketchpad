
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const height = 1080;
const width = 1920;
const cl = document.getElementById("clLine");
const clF = document.getElementById("clFill");
const raL = document.getElementById("raLine");
const raFS = document.getElementById("raFS");
const fontpicker = document.getElementById("fontpicker");
const cm = document.getElementById("c-mode");
const shCheck = document.getElementById("chSh");
const shX = document.getElementById("txX");
const shY = document.getElementById("txY");
const shC = document.getElementById("clShadow");
const shB = document.getElementById("txB");

// resize canvas (CSS does scale it up or down)
canvas.height = height;
canvas.width = width;

//frehand start

function startFreehand() {
    clearEventListeners();
    canvas.style.cursor = 'crosshair';
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
    if(shCheck.checked)
    {
        context.shadowColor = shC.value;
        context.shadowOffsetX = Number(shX.value);
        context.shadowOffsetY = Number(shY.value);
        context.shadowBlur = Number(shB.value);
    }
    context.stroke();
}


//freehand end


//rect start

function startDrawRect() {
    clearEventListeners();
    canvas.style.cursor = 'crosshair';
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

    if(shCheck.checked)
    {
        context.shadowColor = shC.value;
        context.shadowOffsetX = Number(shX.value);
        context.shadowOffsetY = Number(shY.value);
        context.shadowBlur = Number(shB.value);
        context.fillRect(start.x, start.y, x - start.x, y - start.y);
    }
    else
    {
        context.fillRect(start.x, start.y, x - start.x, y - start.y);
        context.strokeRect(start.x, start.y, x - start.x, y - start.y);
    }
}



//rect end

//text start

function startDrawText() {
    clearEventListeners();
    canvas.style.cursor = 'text';
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
    
    if(shCheck.checked)
    {
        context.shadowColor = shC.value;
        context.shadowOffsetX = Number(shX.value);
        context.shadowOffsetY = Number(shY.value);
        context.shadowBlur = Number(shB.value);
        context.fillText(input, mCoords.x, mCoords.y);
    }
    else
    {
        context.fillText(input, mCoords.x, mCoords.y);
    }
}

//text end

//outlined text start

function startDrawOutlinedText() {
    clearEventListeners();
    canvas.style.cursor = 'text';
    canvas.addEventListener("mousedown", drawOutlinedText);
}

function drawOutlinedText(e) {
    let fontszn = raFS.value;
    let fontsz = fontszn.concat("px");
    let fontszfixed = fontsz.concat(" ");
    let result = fontszfixed.concat(fontpicker.value);
    context.font = result;
    let mCoords = getMousePos(canvas,e);
    let input = prompt("Enter some text");
    context.lineWidth = 1;
    context.strokeStyle = cl.value;
    
    if(shCheck.checked)
    {
        context.shadowColor = shC.value;
        context.shadowOffsetX = Number(shX.value);
        context.shadowOffsetY = Number(shY.value);
        context.shadowBlur = Number(shB.value);
        context.strokeText(input, mCoords.x, mCoords.y);
    }
    else
    {
        context.strokeText(input, mCoords.x, mCoords.y);
    }
}

//outlined text end


function downloadFile(){
    const pngurl = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    let fn = prompt("Give your sketch a name");
    link.download = fn.concat(".png");
    link.href = pngurl;
    link.click();
}



function clearEventListeners(){
    canvas.style.cursor = 'default';
    canvas.removeEventListener("mousedown", startRect);
    canvas.removeEventListener("mouseup", endRect);
    canvas.removeEventListener("mousedown", startDrawing);
    canvas.removeEventListener("mouseup", endDrawing);
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mousedown", drawText);
    canvas.removeEventListener("mousedown", drawOutlinedText);
    cleanShadow();
}

function cleanShadow(){
    context.shadowColor = "transparent";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
}

function conditionalCleanShadow(){
    if(shCheck.checked)
    {
        //do nothing
    }
    else
    {
        cleanShadow();
    }
}

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function changeCompositingMode(){
    context.globalCompositeOperation = cm.value;
}