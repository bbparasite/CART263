let table;
let song;
let points = [];
let wordObject;

function preload() {
  table = loadTable("assets/archive/2019.csv", "csv", "header");
  song = loadSound("assets/sounds/NIN.mp3");
}

function setup() {
  createCanvas(windowWidth + 50, windowHeight + 50, WEBGL);
  background(0);
  userStartAudio();
  if (song != song.isPlaying()){
    song.play();
  }
  console.log(table.getRowCount() + " total rows in table");   
  console.log(table.getColumnCount() + " total columns in table"); 
  for (var r = 0; r < table.getRowCount(); r++){ 
    for (var c = 0; c < table.getColumnCount(); c++){       
      console.log(table.getString(r, c));
    }
  } 
  for (var r = 0; r < table.getRowCount(); r++){ // Cycle through each row of the table
      points[r] = new DataPoint(table.getString(r, 1), 
                                table.getString(r, 2), 
                                table.getString(r, 3), 
                                table.getString(r, 0));
                                // Pass through the values in each row
  }
  wordObject = createWord3D(
    string = "Are you happy?",       // The actual character that you want to draw (anything that can be passed into "text()")
    depth = 10,        // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
    size = 1,         // The size of a unit "box()" making up part of the letter  
    resolution = 20,   // The size of the canvas it renders the letter on (higher is more detailed, 20-30 is a good range)  
    bevelled = false,     // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
    font = "Georgia",         // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
    style = "NORMAL"         // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
  )
}

function draw() {
  push();
  translate(-600, -300, 0);
  wordObject.show();
  pop();
  for (var i = 0; i < table.getRowCount(); i++){
    points[i].drawHappy();
  }
}

class DataPoint { 
    constructor(country, score, gdp, rank){ 
        // Add each data point to the object
        this.country = country;
        this.score = score;
        this.gdp = gdp;
        this.rank = rank;
        this.x;
        this.y;
    }

    drawHappy(){
      rotateZ(millis() / 200000 * this.score);
      push();
      fill(255, map(this.score, 1, 7, 0, 255), 0);
      translate(0, -100, map(this.score, 1, 7.2, -10000, 2000));
      torus(30, 15);
      pop();
    }
}


