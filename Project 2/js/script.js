// Global variables for loading and creating objects
let table;
let song;
let points = [];
let happyObject = [];
let stressObject = [];

// Loading in the dataset and music
function preload() {
  table = loadTable("assets/archive/2019.csv", "csv", "header");
  song = loadSound("assets/sounds/NIN.mp3");
}

// Traditional setup function with creating the canvas size, background, audio, data points, and Word3D objects
function setup() {
  createCanvas(1795, 931, WEBGL); // Converted the canvas to the WEBGL renderer
  background(0);
  userStartAudio();
  if (song != song.isPlaying()){
    song.play();
  }
  console.log(table.getRowCount() + " total rows in table");   
  console.log(table.getColumnCount() + " total columns in table"); 
  for (var r = 0; r < table.getRowCount(); r++){ // Cycle through each row of the table
      points[r] = new DataPoint(table.getString(r, 1), 
                                table.getString(r, 2));
                                // Pass through the values in each row
  }
  for(var i = 0; i < 6; i++){ // Creating 6 happy text objects
  happyObject[i] = createWord3D(
      string = "Are you happy?",       // The actual character that you want to draw (anything that can be passed into "text()")
      depth = 10,        // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
      size = 1,         // The size of a unit "box()" making up part of the letter  
      resolution = 20,   // The size of the canvas it renders the letter on (higher is more detailed, 20-30 is a good range)  
      bevelled = false,     // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
      font = "Georgia",         // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
      style = "NORMAL"         // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
    );
  }
  for(var i = 0; i < 6; i++){ // Creating 6 stress text objects
    stressObject[i] = createWord3D(
        string = "Are you stressed?",       // The actual character that you want to draw (anything that can be passed into "text()")
        depth = 10,        // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
        size = 1,         // The size of a unit "box()" making up part of the letter  
        resolution = 20,   // The size of the canvas it renders the letter on (higher is more detailed, 20-30 is a good range)  
        bevelled = false,     // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
        font = "Georgia",         // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
        style = "NORMAL"         // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
      );
    }
}

// Using the draw funtion to display the data points and text objects
function draw() {
  push();
  for (var i = 0; i < table.getRowCount(); i++){
    points[i].drawHappy();
  }
  pop();
  for(var i = 0; i < 6; i++){
    push();
    translate(-600, -300 + (100 * i), 0);
    happyObject[i].show();
    pop();
  }
  for(var i = 0; i < 6; i++){
    push();
    translate(600, -300 + (100 * i), 0);
    stressObject[i].show();
    pop();
  }
}

class DataPoint { 
    constructor(country, score){ 
        // Add each data point to the object
        this.country = country;
        this.score = score;
    }

    // This is the method used for drawing each torus shape
    drawHappy(){
      rotateZ(millis() / 150000 * this.score); // Rotating all of them along the Z axis
      push();
      fill(255, map(this.score, 4, 7, 0, 255), 0); // Filling each data point based on their happiness index
      translate(0, -100, map(this.score, 1, 7.2, -10000, 2000)+ (millis() / 100)); // Mapping each data point based on their happiness index and moving them towards the viewer
      torus(30, 15);
      pop();
    }
}