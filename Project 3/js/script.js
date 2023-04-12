/**
 * Author: Jaden Thompson
 * Title: Playful Interaction Testing
 * Course: CART263
 * Testing out Vida as a possible route
 * My version uses Vida to control a synth with active zone (motion detection)
 */

var myCapture, // camera
  myVida; // VIDA

var synth = [];

let soundLoop = [];

let ringOffset;

/** Width of the canvas. */
const CANVASWIDTH = 1600;

/** Height of the canvas. */
const CANVASHEIGHT = 1000;


function initCaptureDevice() {
  try {
    myCapture = createCapture(VIDEO);
    myCapture.size(320, 240);
    myCapture.elt.setAttribute("playsinline", "");
    myCapture.hide();
    console.log(
      "[initCaptureDevice] capture ready. Resolution: " +
        myCapture.width +
        " " +
        myCapture.height
    );
  } catch (_err) {
    console.log("[initCaptureDevice] capture error: " + _err);
  }
}

function setup() {
  createCanvas(CANVASWIDTH, CANVASHEIGHT, WEBGL);
  userStartAudio();
  initCaptureDevice();
  angleMode(DEGREES);

  myVida = new Vida(this);
  myVida.progressiveBackgroundFlag = true;
  myVida.imageFilterFeedback = 0.7;
  myVida.imageFilterThreshold = 0.15;
  myVida.mirror = myVida.MIRROR_HORIZONTAL;
  myVida.handleActiveZonesFlag = true;
  myVida.setActiveZonesNormFillThreshold(0.02);

  var padding = 0.07;
  var n = 10;
  var zoneWidth = 0.1;
  var zoneHeight = 0.5;
  var hOffset = (1.0 - (n * zoneWidth + (n - 1) * padding)) / 2.0;
  var vOffset = 0.25;

  for (var i = 0; i < n; i++) {
    myVida.addActiveZone(
      i,
      hOffset + i * (zoneWidth + padding),
      vOffset,
      zoneWidth,
      zoneHeight
    );

    var osc = new p5.Oscillator();
    osc.setType("sine");

    osc.freq(440.0 * Math.pow(2.0, (60 + i * 4 - 69.0) / 12.0));
    osc.amp(0.0);
    osc.start();
    synth[i] = osc;
  }

  frameRate(30);
}

function onSoundLoop(timeFromNow) {
  let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
  let note = midiToFreq(notePattern[noteIndex]);
  synth.play(note, 0.5, timeFromNow);
  background(noteIndex * 360 / notePattern.length, 50, 100);
}

function draw() {
  if (myCapture !== null && myCapture !== undefined) {
    let offsetX = 0;
    let offsetY = 0;

    myVida.update(myCapture);
    image(myVida.thresholdImage, width / 2, height / 2);

    var temp_drawing_w = width / 2;
    var temp_drawing_h = height / 2;
    // offset from the upper left corner
    var offset_x = -380;
    var offset_y = -240;
    // pixel-based zone's coords
    var temp_x, temp_y, temp_w, temp_h;
    push(); // store current drawing style and font
    translate(offset_x, offset_y); // translate coords
    for (var i = 0; i < myVida.activeZones.length; i++) {
      temp_x = Math.floor(myVida.activeZones[i].normX * temp_drawing_w);
      temp_y = Math.floor(myVida.activeZones[i].normY * temp_drawing_h);
      temp_w = Math.floor(myVida.activeZones[i].normW * temp_drawing_w);
      temp_h = Math.floor(myVida.activeZones[i].normH * temp_drawing_h);
      // draw zone rect (filled if movement detected)
      // strokeWeight(1);
      // if (myVida.activeZones[i].isEnabledFlag) {
      //   stroke(255, 0, 0);
      //   if (myVida.activeZones[i].isMovementDetectedFlag) fill(255, 0, 0, 128);
      //   else noFill();
      // } else {
      //   stroke(0, 0, 255);
      //   if (myVida.activeZones[i].isMovementDetectedFlag) fill(0, 0, 255, 128);
      //   else noFill();
      // }
      // rect(temp_x, temp_y, temp_w, temp_h);
      // // print id
      // noStroke();
      // if (myVida.activeZones[i].isEnabledFlag) fill(255, 0, 0);
      // else fill(0, 0, 255);
      /*
        Using the isChangedFlag flag is very important if we want to trigger an
        behavior only when the zone has changed status.
      */
      if (myVida.activeZones[i].isChangedFlag) {
        // print zone id and status to console ...
        console.log(
          "zone: " +
            myVida.activeZones[i].id +
            " status: " +
            myVida.activeZones[i].isMovementDetectedFlag
        );
        //... and use this information to control the sound.
        synth[myVida.activeZones[i].id].amp(
          0.1 * myVida.activeZones[i].isMovementDetectedFlag
        );
        ringOffset = myVida.activeZones[i].isMovementDetectedFlag * 10;
      }
    }
    pop();

    push();
    rotateZ(frameCount / 5);

    waves(offsetX, offsetY, ringOffset);

    offsetX = 400;
    waves(offsetX, offsetY, ringOffset);

    offsetX = -400;
    waves(offsetX, offsetY, ringOffset);

    offsetX = 0;
    offsetY = 400;
    waves(offsetX, offsetY, ringOffset);

    offsetX = 400;
    offsetY = 400;
    waves(offsetX, offsetY, ringOffset);

    offsetX = -400;
    offsetY = 400;
    waves(offsetX, offsetY, ringOffset);

    offsetX = -400;
    offsetY = -400;
    waves(offsetX, offsetY, ringOffset);

    offsetX = 0;
    offsetY = -400;
    waves(offsetX, offsetY, ringOffset);

    offsetX = 400;
    offsetY = -400;
    waves(offsetX, offsetY, ringOffset);
    pop();
  }
}

function waves(offsetX, offsetY, ringOffset) {
  noFill();
  stroke(255);

  for (let i = 0; i < 5 + ringOffset; i++) {
    var r = map(sin(frameCount / 2), -1, 1, 100, 200);
    var g = map(i, 0, 20, 0, 255);
    var b = map(cos(frameCount), -1, 1, 255, 0);

    stroke(r, g, b);

    beginShape();
    for (var j = 0; j < 360; j += 60) {
      var rad = i * 8;
      let x = rad * cos(j);
      let y = rad * sin(j);
      let z = sin(frameCount + i * 10) * 50;

      vertex(x + offsetX, y + offsetY, z);
    }
    endShape(CLOSE);
  }
}