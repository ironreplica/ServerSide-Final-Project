// button functionality, page functionality
var canvas = document.getElementById("drawing-canvas");

// canvas context, which is 2d
var ctx = canvas.getContext("2d");
resize();

var pos = { x: 0, y: 0 };

var reader = new FileReader();
// resize when window is resized
window.addEventListener("resize", resize);

document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mousenter", setPosition);

// setting the mouse pos
function setPosition(e) {
  // Compensate for container
  var rect = canvas.getBoundingClientRect();
  var scaleX = canvas.width / rect.width;
  var scaleY = canvas.height / rect.height;

  pos.x = e.offsetX * scaleX;
  pos.y = e.offsetY * scaleY;
}

// size the canvas to fit the screen
function resize() {
  //  Match the size of the container for the canvas
  var rect = canvas.getBoundingClientRect();

  ctx.canvas.width = rect.width;
  ctx.canvas.height = rect.height;
}

// draw on canvas
function draw(e) {
  // Check for mouse click
  if (e.buttons !== 1) return;

  ctx.beginPath();

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000000";

  ctx.moveTo(pos.x, pos.y);
  setPosition(e);
  ctx.lineTo(pos.x, pos.y);

  ctx.stroke();
}

document.getElementById("send").addEventListener("click", function () {
  // get canvas info
  var canvasContents = canvas.toDataURL(); // Image data URL
  var data = { image: canvasContents, date: Date.now() };
  var string = JSON.stringify(data);

  // Create a blod from the json

  // Create an object URL for the blob
  //   var fileURL = URL.createObjectURL(file);

  //   Create a temporary anchor element to create a download
  //   var a = document.createElement("a");
  //   a.href = fileURL;
  //   a.download = "canvas-drawing.json";

  //   document.body.appendChild(a);
  //   a.click(); // Click the download button programatically
  socket.emit("chat message", string);
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(fileURL);
});

document.getElementById("load").addEventListener("change", function () {
  if (this.files[0]) {
    // read the contents of the first file in the input field
    reader.readAsText(this.files[0]);
  }
});

// reader.onload = function () {
//   var data = JSON.parse(reader.result); //turns JSON into a usable object
//   var image = new Image();
//   image.onload = function () {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(image, 0, 0);
//   };
//   image.src = data.image;
// };
socket.on("chat message", (msg) => {
  console.log("Chat message");
  const messages = document.getElementById("messages");
  const img = document.createElement("img");
  messages.appendChild(img);
  var file = new Blob([msg], {
    type: "application/json",
  });
  console.log(file);
  var data = JSON.parse(msg);
  var image = new Image();

  img.src = data.image;
});
