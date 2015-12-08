// Scripts for Rocks Paper Scissors game

$(document).ready(function(){
  var choices = ["rocks", "paper", "scissors"];

  

  

    // When button is clicked rocks, papers, or scissors is chosen.
  function shoot(){
    var ranChoice = Math.floor(Math.random() * choices.length);
    $('#computers-choice').html(choices[ranChoice]);
  }

  $("#rockButton, #scissorsButton, #paperButton").on('click', function(){
    var userChoice = $(this).data('choice')
    shoot();
  });

});