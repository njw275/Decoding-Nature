
function GOL(entw,entcol,entrow) {

  this.w = entw;
  this.columns = entcol;
  this.rows = entrow;
  this.won = false;

  // Game of life board
  this.board = new Array(this.columns);
  for (var i = 0; i < this.columns; i++) {
    this.board[i] = new Array(this.rows);
  }

  this.init = function() {
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.board[i][j] = new Cell(i*this.w, j*this.w, this.w);
      }
    }
  };
  this.init();

  // The process of creating the new generation
  this.generate = function() {
    for ( var i = 0; i < this.columns;i++) {
      for ( var j = 0; j < this.rows;j++) {
        this.board[i][j].savePrevious();
      }
    }

    // Loop through every spot in our 2D array and check spots neighbors
    for (var x = 0; x < this.columns; x++) {
      for (var y = 0; y < this.rows; y++) {

        // Add up all the states in a 3x3 surrounding grid
        var neighbors = 0;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            neighbors += this.board[(x+i+this.columns)%this.columns][(y+j+this.rows)%this.rows].previous;
          }
        }

        // A little trick to subtract the current cell's state since
        // we added it in the above loop
        neighbors -= this.board[x][y].previous;

        // Rules of Life
        if      ((this.board[x][y].state == 1) && (neighbors <  2)) this.board[x][y].newState(0);
        else if ((this.board[x][y].state == 1) && (neighbors >  3)) this.board[x][y].newState(0);
        else if ((this.board[x][y].state === 0) && (neighbors == 3)) this.board[x][y].newState(1);
        // else do nothing!
      }
    }
  };

  this.hideGenerate = function() {
    for ( var i = 0; i < this.columns;i++) {
      for ( var j = 0; j < this.rows;j++) {
        this.board[i][j].state = 0;
      }
    }

  };

  this.checkGameOver = function() {
  	countF = 0;
  	countRed = 0;
    for ( var i = 0; i < this.columns;i++) {
      for ( var j = 0; j < this.rows;j++) {
        if (this.board[i][j].state == 4){
        	countF++;
        }
        if(gol.board[i][j].state == 1){
        	countRed++;
        }
      }
    }
    if (countF == countRed){
    	this.won = true;
    	return false;
    	// this.won = true;
    }
    
    return true;

  };


  this.showRed = function() {
    for ( var i = 0; i < this.columns;i++) {
      for ( var j = 0; j < this.rows;j++) {
        // if(this.board[i][j].state == 1){
          this.board[i][j].display();
        // }
      }
    }
  };

  this.countNeighbors = function() {
    for (var x = 0; x < this.columns; x++) {
      for (var y = 0; y < this.rows; y++) {
        var neighbors = 0;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            if(this.board[(x+i+this.columns)%this.columns][(y+j+this.rows)%this.rows].state == 1){
              gol2.board[x][y].myNeighbors++;
            }
            
          }
        }
      }
    }
  };

  // This is the easy part, just draw the cells, fill 255 for '1', fill 0 for '0'
  this.display = function() {
    for ( var i = 0; i < this.columns;i++) {
      for ( var j = 0; j < this.rows;j++) {
        this.board[i][j].display();
      }
    }
  };
}