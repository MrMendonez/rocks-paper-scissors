// Scripts programming logic for Rocks Paper Scissors game

window.rps = {
  gameState: {
    userScore: 0,
    computerScore: 0,
    round: 0,
    tiedGameCount: 0
  }
}

$(document).ready(function(){
    alert("programmingLogic.js is connected");
  var compare = function(choice1, choice2) {
    var tieMsg = "The result is a tie!";
    var rockWins = "Rock wins!";
    var paperWins = "Paper wins!";
    var scissorsWins = "Scissors wins!";
    var youLose = "You lose this round!"
    var youWin = "You win this round!"

    if (choice1 === choice2) {
      rps.gameState.tiedGameCount++;
      $("#win-msg").html(tieMsg);
      $("#tied-game-count").html(rps.gameState.tiedGameCount);
      return tieMsg;
    } else if (choice1 === "Rock") {
      if (choice2 === "Scissors") {
        $("#win-msg").html(rockWins);
        $("#you-win-or-lose-msg").html(youWin);
        rps.gameState.userScore++;
        $(".user-score").html(rps.gameState.userScore);
        return rockWins;
      } else {
        $("#win-msg").html(paperWins);
        $("#you-win-or-lose-msg").html(youLose);
        rps.gameState.computerScore++;
        $(".computer-score").html(rps.gameState.computerScore);
        return paperWins;   
      }
    } else if (choice1 === "Paper") {
      if (choice2 === "Rock") {
        $("#win-msg").html(paperWins);
        $("#you-win-or-lose-msg").html(youWin);
        rps.gameState.userScore++;
        $(".user-score").html(rps.gameState.userScore);
        return paperWins; 
      } else {
        $("#win-msg").html(scissorsWins);
        $("#you-win-or-lose-msg").html(youLose);
        rps.gameState.computerScore++;
        $(".computer-score").html(rps.gameState.computerScore);
        return scissorsWins;
      }
    } else {
      if (choice1 === "Scissors") {
        if (choice2 === "Paper") {
          $("#win-msg").html(scissorsWins);
          $("#you-win-or-lose-msg").html(youWin);
          rps.gameState.userScore++;
          $(".user-score").html(rps.gameState.userScore);
          return scissorsWins;
        } else {
          $("#win-msg").html(rockWins);
          $("#you-win-or-lose-msg").html(youLose);
          rps.gameState.computerScore++;
          $(".computer-score").html(rps.gameState.computerScore);
          return rockWins;
        }
      }
    }
  }
});