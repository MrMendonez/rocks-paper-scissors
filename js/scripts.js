// Scripts for Rocks Paper Scissors game

window.rps = {
  gameState: {
    userScore: 0,
    computerScore: 0,
    round: 0,
    tiedGameCount: 0
  }
}

$(document).ready(function(){
  var choices = ["Rock", "Paper", "Scissors"];

  $(".btn-choices").off();

  $("#start-button").on("click", function() {
    if($(this).attr("data-status") === "off") {
      $(this)
        .html("Pause")
        .addClass("btn-success")
        .removeClass("btn-default")
        .attr("data-status", "on");
      bindControls();
    }
  })

  function bindControls() {
    $(document).on("click", "#rock-button, #paper-button, #scissors-button", function(){

      var myRandomNumber = Math.floor(Math.random() * choices.length);
      var computerChoice = choices[myRandomNumber];

      var userChoice = $(this).data('choice')
      compare(userChoice, computerChoice);

      $("#computers-choice").html(computerChoice);
      $("#users-choice").html(userChoice);

      rps.gameState.round++;
      $("#round-number").html(rps.gameState.round);
      if (rps.gameState.round === 5){
        if (rps.gameState.userScore > rps.gameState.computerScore) {
          $("#won-lost-or-tied-msg").html("You won!");
        } else if (rps.gameState.computerScore > rps.gameState.userScore) {
          $("#won-lost-or-tied-msg").html("You lost!");
        } else {
          $("#won-lost-or-tied-msg").html("Tied game!");
        }
        $("#game-over-modal").modal("show");
        $("#game-over-modal").on("hidden.bs.modal", function (e) {
          rps.gameState.round = 0;
          rps.gameState.userScore = 0;
          rps.gameState.computerScore = 0;
          rps.gameState.tiedGameCount = 0;
          $("#round-number").html(rps.gameState.round);
          $(".tied-game-count").html(rps.gameState.tiedGameCount);
          $(".user-score").html(rps.gameState.userScore);
          $(".computer-score").html(rps.gameState.computerScore);
        })
      }
    })
  };

  var compare = function(choice1, choice2) {
    var tieMsg = "Tied!";
    var rockWins = "Rock wins!";
    var paperWins = "Paper wins!";
    var scissorsWins = "Scissors wins!";
    var youLose = "You lose this round!"
    var youWin = "You win this round!"

    if (choice1 === choice2) {
      rps.gameState.tiedGameCount++;
      $("#win-msg").html(tieMsg);
      $(".tied-game-count").html(rps.gameState.tiedGameCount);
    } else if (choice1 === "Rock") {
      if (choice2 === "Scissors") {
        $("#win-msg").html(rockWins);
        $("#you-win-or-lose-msg").html(youWin);
        rps.gameState.userScore++;
        $(".user-score").html(rps.gameState.userScore);
      } else {
        $("#win-msg").html(paperWins);
        $("#you-win-or-lose-msg").html(youLose);
        rps.gameState.computerScore++;
        $(".computer-score").html(rps.gameState.computerScore);
      }
    } else if (choice1 === "Paper") {
      if (choice2 === "Rock") {
        $("#win-msg").html(paperWins);
        $("#you-win-or-lose-msg").html(youWin);
        rps.gameState.userScore++;
        $(".user-score").html(rps.gameState.userScore);
        // r
      } else {
        $("#win-msg").html(scissorsWins);
        $("#you-win-or-lose-msg").html(youLose);
        rps.gameState.computerScore++;
        $(".computer-score").html(rps.gameState.computerScore);
      }
    } else {
      if (choice1 === "Scissors") {
        if (choice2 === "Paper") {
          $("#win-msg").html(scissorsWins);
          $("#you-win-or-lose-msg").html(youWin);
          rps.gameState.userScore++;
          $(".user-score").html(rps.gameState.userScore);
        } else {
          $("#win-msg").html(rockWins);
          $("#you-win-or-lose-msg").html(youLose);
          rps.gameState.computerScore++;
          $(".computer-score").html(rps.gameState.computerScore);
        }
      }
    }
  }
});

// To Do List:
// When round = 0, 0 should not display on game. It should display as 'Round :' instead of 'Round: 0'. That's not how games behave.