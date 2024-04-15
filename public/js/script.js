var canvas = document.getElementById("drawing-canvas");
var fillerCanvas = document.getElementById("filler-canvas");

const lineGap = 60; // Gap between lines on the paper
var ctx = canvas.getContext("2d"); // Canvas context, which is 2d
var ctxF = fillerCanvas.getContext("2d");
ctxF.strokeStyle = "black";
ctx.strokeStyle = "black";
resize(ctx);
resize(ctxF);

const messages = document.getElementById("messages");
messages.scrollTop = 300;

var pos = { x: 0, y: 0 };

var reader = new FileReader();

window.addEventListener("resize", resize); // Resize when window is resized
window.addEventListener("load", drawLines(ctx));
drawLines(ctxF);

document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mousenter", setPosition);

/* Lines on "paper" */
function drawLines(canvasContext){
  var totalLines = canvasContext.canvas.height / lineGap;
  console.log(canvasContext.canvas.height);
  for(var i = 1; i <= totalLines; i++){
    canvasContext.beginPath();
    canvasContext.moveTo(0,lineGap*i);
    canvasContext.lineTo(712,lineGap*i);
    canvasContext.strokeStyle = "black";
    ctx.lineWidth = 1;
    canvasContext.stroke();
  }
}

/* Setting the mouse position */
function setPosition(e) {
  // Compensate for container
  var rect = canvas.getBoundingClientRect();
  var scaleX = canvas.width / rect.width;
  var scaleY = canvas.height / rect.height;

  pos.x = e.offsetX * scaleX;
  pos.y = e.offsetY * scaleY;
}

/* Size the canvas to fit the screen */
function resize(canvasContext) {
  var rect = canvasContext.canvas.getBoundingClientRect();   //  Match the size of the container for the canvas

  canvasContext.canvas.width = rect.width;
  canvasContext.canvas.height = rect.height;
}

/* Drawing on the canvas */
function draw(e) {
  if (e.buttons !== 1) return;   // Check for mouse click

  ctx.beginPath();

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  

  ctx.moveTo(pos.x, pos.y);
  setPosition(e);
  ctx.lineTo(pos.x, pos.y);

  ctx.stroke();
}

/* Clear canvas button */
document.getElementById("clear").addEventListener("click", function(){
  ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
  drawLines(ctx);
})

/* Colored buttons */
document.querySelectorAll("[class^=btn-color]").forEach((color) => {
  color.addEventListener("click", function(e){
    console.log(e.target.id);
    ctx.strokeStyle = String(e.target.id); 
  })
})

/* Send image button */
document.getElementById("send").addEventListener("click", function () {
  var canvasContents = canvas.toDataURL(); // Image data URL
  var data = { image: canvasContents, date: Date.now() };
  var string = JSON.stringify(data);

  socket.emit("chat message", string);
});

/* Recieving chat message */
socket.on("chat message", (msg) => {
  console.log("Chat message");
  if(fillerCanvas){ // Remove filler canvas for real img
    fillerCanvas.remove();
  }
  const img = document.createElement("img");
  messages.appendChild(img);
  var data = JSON.parse(msg);
  console.log(data);

  img.src = data.image;
  var drawingsContainer = document.getElementsByClassName("drawings-container");
  img.onload = function() { // Wait for img to load to scroll
      messages.scrollTo(0, messages.scrollHeight);
  }
  console.log(messages.scrollHeight);
});
