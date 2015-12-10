// Scripts for Rocks Paper Scissors game

$(document).ready(function(){
  // var choices = ["Rock", "Paper", "Scissors"];
  var round = 0;
  var userScore = 0;
  var computerScore = 0;
  var tiedGameCount = 0;

  $(document).on('click', "#rock-button, #paper-button, #scissors-button", function(){

    var computerChoice = Math.random();
    if (computerChoice < 0.34) {
      computerChoice = "Rock";
    } else if(computerChoice <= 0.67) {
      computerChoice = "Paper";
    } else {
      computerChoice = "Scissors";
    };

    var userChoice = $(this).data('choice')
    console.log("You chose " + userChoice)
    console.log("The computer chose " + computerChoice);
    compare(userChoice, computerChoice);

    $('#computers-choice').html(computerChoice);
    $('#users-choice').html(userChoice);

    round++;
    $("#round-number").html(round);
    if (round === 5){
      if (userScore > computerScore) {
        $("#won-lost-or-tied-msg").html("You won!");
      } else if (computerScore > userScore) {
        $("#won-lost-or-tied-msg").html("You lost!");
      } else {
        $("#won-lost-or-tied-msg").html("Tied game!");
      }
      $("#game-over-modal").modal("show");
      $("#game-over-modal").on('hidden.bs.modal', function (e) {
        round = 0;
        userScore = 0;
        computerScore = 0;
        tiedGameCount = 0;
        $("#round-number").html(round);
        $(".user-score").html(userScore);
        $(".computer-score").html(computerScore);
      })
    }
  });

  var compare = function(choice1, choice2) {
    var tieMsg = "The result is a tie!";
    var rockWins = "Rock wins!";
    var paperWins = "Paper wins!";
    var scissorsWins = "Scissors wins!";
    var youLose = "You lose this round!"
    var youWin = "You win this round!"

    if (choice1 === choice2) {
      $("#win-msg").html(tieMsg);
      tiedGameCount++;
      $("#tied-game-count").html(tiedGameCount);
      console.log(tieMsg);
      return tieMsg;
    } else if (choice1 === "Rock") {
      if (choice2 === "Scissors") {
        $("#win-msg").html(rockWins);
        $("#you-win-or-lose-msg").html(youWin);
        userScore++;
        $(".user-score").html(userScore);
        return rockWins;
      } else {
        $("#win-msg").html(paperWins);
        $("#you-win-or-lose-msg").html(youLose);
        computerScore++;
        $(".computer-score").html(computerScore);
        return paperWins;   
      }
    } else if (choice1 === "Paper") {
      if (choice2 === "Rock") {
        $("#win-msg").html(paperWins);
        $("#you-win-or-lose-msg").html(youWin);
        userScore++;
        $(".user-score").html(userScore);
        return paperWins; 
      } else {
        $("#win-msg").html(scissorsWins);
        $("#you-win-or-lose-msg").html(youLose);
        computerScore++;
        $(".computer-score").html(computerScore);
        return scissorsWins;
      }
    } else {
      if (choice1 === "Scissors") {
        if (choice2 === "Paper") {
          $("#win-msg").html(scissorsWins);
          $("#you-win-or-lose-msg").html(youWin);
          userScore++;
          $(".user-score").html(userScore);
          return scissorsWins;
        } else {
          $("#win-msg").html(rockWins);
          $("#you-win-or-lose-msg").html(youLose);
          computerScore++;
          $(".computer-score").html(computerScore);
          return rockWins;
        }
      }
    }
  }
});