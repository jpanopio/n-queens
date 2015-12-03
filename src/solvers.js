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
  /*var total = 1;
  for(var i = n; i > 0; i--) {
    total *= i;
  }
  return total;*/
  var solution = new Board({n:n});
  var theSolutions = [];
  var startI = 0;
  var startJ = 0;

  var numberOfTimes = 1;
  for(var l =0; l<=n; l++){
    numberOfTimes *= (n*n - l);
  }

  for(var k = 0; k < numberOfTimes; k++) {
    var countAdded = 0;
    solution.togglePiece(startI, startJ);
    for(var i = 0; i < solution.rows().length; i++) {
      for(var j = 0; j < solution.rows().length; j++) {
        if (solution.rows()[i][j] !== 1){
          solution.togglePiece(i, j);
          if(solution.hasAnyRooksConflicts()) {
            solution.togglePiece(i, j);
          }
        }
        else{
          countAdded++;
        }
      }
    }
    if (countAdded === n){
      theSolutions.push(solution.rows());
    }
    solution = new Board({n:n});
    if (startJ === n-1){
      startJ = 0;
      startI++;
      if(startI >= n){
        return theSolutions;
      }
    }
    else{
      startJ++;
    }

  }
  return theSolutions;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  /*
  var solution = new Board({n:n});
  var theSolutions = []; 
  for(var k = 0; k < n*n; k++) {
    var countAdded = 0;
    for(var i = 0; i < solution.rows().length; i++) {
      for(var j = 0; j < solution.rows().length; j++) {
        solution.togglePiece(i, j);
        if(solution.hasAnyQueensConflicts()) {
          solution.togglePiece(i, j);
        }
        else{
          countAdded++;
        }
      }
    }
    if (countAdded === n){
      theSolutions.push(solution.rows());
    }
    solution = new Board({n:n});
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
  */
};
