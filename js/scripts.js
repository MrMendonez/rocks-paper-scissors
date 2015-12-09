// Scripts for Rocks Paper Scissors game

$(document).ready(function(){
  var choices = ["rock", "paper", "scissors"];
  var round = 0;
  var userScore = 0;
  var computerScore = 0;

  $(document).on('click', "#rock-button, #paper-button, #scissors-button", function(){

    round++;
    $("#round-number").html(round);

    var computerChoice = Math.random();
    if (computerChoice < 0.34) {
      computerChoice = "rock";
    } else if(computerChoice <= 0.67) {
      computerChoice = "paper";
    } else {
      computerChoice = "scissors";
    };

    var userChoice = $(this).data('choice')
    console.log("You chose " + userChoice)
    console.log("The computer chose " + computerChoice);
    compare(userChoice, computerChoice);

    $('#computers-choice').html(computerChoice);
    $('#users-choice').html(userChoice);

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
      console.log(tieMsg);
      return tieMsg;
    } else if (choice1 === "rock") {
      if (choice2 === "scissors") {
        $("#win-msg").html(rockWins);
        $("#you-win-or-lose-msg").html(youWin);
        userScore++;
        $("#user-score").html(userScore);
        return rockWins;
      } else {
        $("#win-msg").html(paperWins);
        $("#you-win-or-lose-msg").html(youLose);
        computerScore++;
        $("#computer-score").html(computerScore);
        return paperWins;   
      }
    } else if (choice1 === "paper") {
      if (choice2 === "rock") {
        $("#win-msg").html(paperWins);
        $("#you-win-or-lose-msg").html(youWin);
        userScore++;
        $("#user-score").html(userScore);
        return paperWins; 
      } else {
        $("#win-msg").html(scissorsWins);
        $("#you-win-or-lose-msg").html(youLose);
        computerScore++;
        $("#computer-score").html(computerScore);
        return scissorsWins;
      }
    } else {
      if (choice1 === "scissors") {
        if (choice2 === "paper") {
          $("#win-msg").html(scissorsWins);
          $("#you-win-or-lose-msg").html(youWin);
          userScore++;
          $("#user-score").html(userScore);
          return scissorsWins;
        } else {
          $("#win-msg").html(rockWins);
          $("#you-win-or-lose-msg").html(youLose);
          computerScore++;
          $("#computer-score").html(computerScore);
          return rockWins;
        }
      }
    }
  }
});