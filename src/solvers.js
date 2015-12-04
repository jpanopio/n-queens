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
  var count = 1;
  for(var i = 1; i <= n; i++) {
    count *= i;
  }
  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // Generate empty board with size n x n
  var board = new Board({n:n});
  // Create solutionStorage = []
  var solutionStorage = {};

  if(n === 0) {
    return [];
  }
  if(n === 1 ) {
    return [[1]];
  }
  if(n === 2 || n === 3) {
    return new Board({n:n}).rows();
  }
  var generateSolutions = function(pieces, currentSolution, numPieces) {
    if (Object.keys(solutionStorage)){
      for(var key in solutionStorage) {
        return;
      }
    }
    if(pieces === 0) {
      if(numPieces === n) {
        solutionStorage[JSON.stringify(currentSolution.rows())] = "YAY";
      }
      return;
    }

    var addedPiece = false;
    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        if (addedPiece) {
          break;
        } 
        // If addedPiece is false:
        if(!addedPiece && currentSolution.rows()[i][j] === 0) {
          // Try to add a piece
          currentSolution.togglePiece(i, j);
          // If there are conflicts: 
          if(currentSolution.hasAnyQueensConflicts()) {
            // Toggle the piece off
            currentSolution.togglePiece(i, j);
          } else {
          // Else
            // addedPiece = true
            addedPiece = true;
            numPieces++;
          }
          // If addedPiece = true
          if(addedPiece) { 
            generateSolutions(pieces - 1, new Board(currentSolution.rows()), numPieces);
            addedPiece = false;
            numPieces = numPieces - 1;
            currentSolution.togglePiece(i,j); 
          }
        }
      }
    }
  };

  generateSolutions(n, board, 0);
  var countKey = 0;
  for(var key in solutionStorage) {
    countKey++;
    console.log(key);
    return JSON.parse(key);
  }

  // Return array of solution boards
  return 4;

};

window.countNQueensSolutions = function(n) {
  // Generate empty board with size n x n
  var board = new Board({n:n});
  // Create solutionStorage = []
  var solutionStorage = {};

  // Function generateSolutions, takes piecesLeft and currentSolution
  var generateSolutions = function(pieces, currentSolution, numPieces) {
    if(pieces === 0) {
      if(numPieces === n) {
        solutionStorage[JSON.stringify(currentSolution.rows())] = "YAY";
      }
      return;
    }

    var addedPiece = false;
    for(var i = 0; i < n; i++) {
      for(var j = 0; j < n; j++) {
        if (addedPiece) {
          break;
        } 
        // If addedPiece is false:
        if(!addedPiece && currentSolution.rows()[i][j] === 0) {
          // Try to add a piece
          currentSolution.togglePiece(i, j);
          // If there are conflicts: 
          if(currentSolution.hasAnyQueensConflicts()) {
            // Toggle the piece off
            currentSolution.togglePiece(i, j);
          } else {
          // Else
            // addedPiece = true
            addedPiece = true;
            numPieces++;
          }
          // If addedPiece = true
          if(addedPiece) { 
            generateSolutions(pieces - 1, new Board(currentSolution.rows()), numPieces);
            addedPiece = false;
            numPieces = numPieces - 1;
            currentSolution.togglePiece(i,j); 
          }
        }
      }
    }
  };

  generateSolutions(n, board, 0);
  var countKey = 0;
  for(var key in solutionStorage) {
    countKey++;
    console.log(key);
  }

  // Return array of solution boards
  return countKey;
};