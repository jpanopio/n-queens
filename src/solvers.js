/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});

  for(var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++) {
      if(i === j) {
        solution.togglePiece(i, j);
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // Generate empty board with size n x n
  var board = new Board({n:n});
  // Create solutionStorage = []
  var solutionStorage = {};
  // Create variable piecesLeft = n
  var piecesLeft = n;

  // Function generateSolutions, takes piecesLeft and currentSolution
  var generateSolutions = function(pieces, currentSolution) {
    // If piecesLeft is 0:
    if(pieces === 0) {
      var count = 0;
      // Add currentSolution to storage
      for(var i = 0; i < currentSolution.rows().length; i++) {
        for(var j = 0; j < currentSolution.rows().length; j++) {
          if(currentSolution.rows()[i][j] === 1) {
            count++;
          }
        }
      }
      if(count === n) {
        solutionStorage[JSON.stringify(currentSolution.rows())] = "YAY";
      }
      return;
    }
  
    // Boolean variable addedPiece initialize to false

    // For every position on the board
    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        var addedPiece = false;
        // If addedPiece is false:
        if(!addedPiece) {
          // Try to add a piece
          currentSolution.togglePiece(i, j);
          // If there are conflicts: 
          if(currentSolution.hasAnyRooksConflicts()) {
            // Toggle the piece off
            currentSolution.togglePiece(i, j);
          } else {
          // Else
            // addedPiece = true
            addedPiece = true;
          }
        }
        // If addedPiece = true
        if(addedPiece) {  
          console.log("We are on round: " + pieces + " Current solution is: " + JSON.stringify(currentSolution.rows()));    
          // Recursively call generateSolutions
          generateSolutions(pieces - 1, new Board(currentSolution.rows()));
        }
      }
    }
  };

  generateSolutions(piecesLeft, board);
  var countKey = 0;
  for(var key in solutionStorage) {
    countKey++;
    console.log(key);
  }
  debugger; 
  // Return array of solution boards
  return countKey;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

};

window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};