
let permissionGranted = false;
let cx, cy;
let gif;
var xoff = 0;
var yoff = 0;

function preload(){
   gif = loadImage('img2.gif')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
//   background(0);
  
  cx = width/2;
  cy = height/2;
  
  // DeviceOrientationEvent, DeviceMotionEvent
  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    // ios 13 device
    
    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        // show permission dialog only the first time
        let button = createButton("click to allow access to gyro sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed( requestAccess );
        throw error;
      })
      .then(() => {
        // on any subsequent visits
        permissionGranted = true;
      })
  } else {
    // non ios 13 device
    textSize(48);
    // text("non ios 13 device", 100, 100);
    permissionGranted = true;
  }
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
  .catch(console.error);
  
  this.remove();
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if (!permissionGranted) return;

   // trails effect
   background(0, 10)

   var x = map(noise(xoff), 0, 1, 0, width);
   var y = map(noise(yoff), 0, 1, 0, height);

   xoff += 0.01;
   yoff += 0.01;
  
  // rotationX, rotationY
  const dx = constrain(rotationY, -3, 3);
  const dy = constrain(rotationX, -3, 3);
  cx += dx*2;
  cy += dy*2;
  cx = constrain(cx, 0, width);
  cy = constrain(cy, 0, height);

  imageMode(CENTER);
  image(gif, cx, cy, x, y)
  
}