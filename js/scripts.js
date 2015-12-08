// Scripts for Rocks Paper Scissors game

$(document).ready(function(){
  var choices = ["rock", "paper", "scissors"];

  $(document).on('click', "#rock-button, #paper-button, #scissors-button", function(){

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
  
  // When button is clicked rocks, papers, or scissors is chosen.
  // function shoot(){
  //   var ranChoice = Math.floor(Math.random() * choices.length);
  //   $('#computers-choice').html(choices[ranChoice]);
  // }




  var compare = function(choice1, choice2) {
    var tieMsg = "The result is a tie!";
    var rockWins = "Rock wins!";
    var paperWins = "Paper wins!";
    var scissorsWins = "Scissors wins!";

    if (choice1 === choice2) {
      $("#win-msg").html(tieMsg);
      console.log(tieMsg);
      return tieMsg;
    } else if (choice1 === "rock") {
      if (choice2 === "scissors") {
        $("#win-msg").html(rockWins);
        console.log(rockWins);
        return rockWins;
      } else {
        $("#win-msg").html(paperWins);
        console.log(paperWins);
        return paperWins;   
      }
    } else if (choice1 === "paper") {
      if (choice2 === "rock") {
        $("#win-msg").html(paperWins);
        console.log(paperWins);
        return paperWins; 
      } else {
        $("#win-msg").html(scissorsWins);
        console.log(scissorsWins);
        return scissorsWins;
      }
    } else {
      if (choice1 === "scissors") {
        if (choice2 === "paper") {
          $("#win-msg").html(scissorsWins);
          console.log(scissorsWins);
          return scissorsWins;
        } else {
          $("#win-msg").html(rockWins);
          console.log(rockWins);
          return rockWins;
        };
      };
    };
  };
});