let table;
let points = [];

function preload() {
  table = loadTable("assets/archive/2019.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth + 50, windowHeight + 50, WEBGL);
  background(0);
  fill(255);
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
      // points[r].drawCircle();
  }
}

function draw() {
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


