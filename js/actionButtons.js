// Scripts action buttons for Rocks Paper Scissors game

$(document).ready(function(){
  alert("actionButtons.js is connected");
  var choices = ["Rock", "Paper", "Scissors"];

  $(document).on('click', "#rock-button, #paper-button, #scissors-button", function(){

    var myRandomNumber = Math.floor(Math.random() * choices.length);
    var computerChoice = choices[myRandomNumber];

    var userChoice = $(this).data('choice')
    compare(userChoice, computerChoice);

    $('#computers-choice').html(computerChoice);
    $('#users-choice').html(userChoice);

    rps.gameState.round++;
    $("#round-number").html(rps.gameState.round);
    if (rps.gameState.round === 5) {
      if (rps.gameState.userScore > rps.gameState.computerScore) {
        $("#won-lost-or-tied-msg").html("You won!");
      } else if (rps.gameState.computerScore > rps.gameState.userScore) {
        $("#won-lost-or-tied-msg").html("You lost!");
      } else {
        $("#won-lost-or-tied-msg").html("Tied game!");
      }
      $("#game-over-modal").modal("show");
      $("#game-over-modal").on('hidden.bs.modal', function (e) {
        rps.gameState.round = 0;
        rps.gameState.userScore = 0;
        rps.gameState.computerScore = 0;
        rps.gameState.tiedGameCount = 0;
        $("#round-number").html(rps.gameState.round);
        $(".user-score").html(rps.gameState.userScore);
        $(".computer-score").html(rps.gameState.computerScore);
      })
    }
  })
});