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
  var tieMsg = "Tied!";
  var rockWins = "Rock wins!";
  var paperWins = "Paper wins!";
  var scissorsWins = "Scissors wins!";
  var youLose = "You lose!"
  var youWin = "You win!"

  // Hide msgs
  $("#gameplay-panel, #pause-screen, #round-screen").hide();
  $("#rock-screen, #paper-screen, #scissors-screen, #shoot-screen").hide();
  $("#reveal-screen, #name-form, #end-of-round-screen").hide();

  function newButtonAnimation() {
    $("#new-button").on("mouseenter", function() {
      $(this).toggleClass("btn-success btn-danger");
    }).on("mouseleave", function() {
      $(this).toggleClass("btn-danger btn-success");
    })
  }

  newButtonAnimation(); // Makes 'New' button change color on mouseover

  $("#new-button").on("click", function(){
    $("#name-form").slideDown(); // Input name form appears
    $("input").focus();
  })

  $("#submit-name-button").on("click", function(e) {
    e.preventDefault();
    var userName = $("input").val().trim();
    if (userName === "") {
      userName = "Little Mac";
    };
    $(".username-placeholder").html(userName);
    bindControls(); // Allow buttons to become active
    // Hide Welcome screens and reveals gameplay panel
    $("#start-game").slideUp(1000, function() {
      $("#panel-title").slideUp(1000);
      $(".jumbotron").slideUp(1000, function() {
        $("#gameplay-panel").slideDown(1000);
      })
    })
  })

  // Pause game on start
  $("#start").on("click", function() {
    if($(this).attr("data-status") === "on") {
      $(this)
        .attr("data-status", "off");
      $(".btn-choices").off();
      $("#pause-screen").slideDown();
    } else {
      $(this)
        .attr("data-status", "on");
      bindControls();
      $("#pause-screen").slideUp();
    }
  })

  function bindControls() {
    $(".btn-choices").on("click", function(){

      var myRandomNumber = Math.floor(Math.random() * choices.length);
      var computerChoice = choices[myRandomNumber];

      var userChoice = $(this).data('choice')
      $("#reveal-screen").hide(); // Hide the last screen of the round
      compare(userChoice, computerChoice);

      $("#computers-choice").html(computerChoice);
      $("#users-choice").html(userChoice);

      function revealUserChoice() {
        if (userChoice === "Rock") {
          $("#reveal-screen-user-choice").addClass("fa-hand-" + userChoice.toLowerCase() + "-o").removeClass("fa-hand-paper-o fa-hand-scissors-o");
        } else if(userChoice === "Paper") {
          $("#reveal-screen-user-choice").addClass("fa-hand-" + userChoice.toLowerCase() + "-o").removeClass("fa-hand-rock-o fa-hand-scissors-o");
        } else {
          $("#reveal-screen-user-choice").addClass("fa-hand-" + userChoice.toLowerCase() + "-o").removeClass("fa-hand-rock-o fa-hand-paper-o");
        }
      };

      function revealComputerChoice() {
        if (computerChoice === "Rock") {
          $("#reveal-screen-computer-choice").addClass("fa-hand-" + computerChoice.toLowerCase() + "-o").removeClass("fa-hand-paper-o fa-hand-scissors-o");
        } else if(computerChoice === "Paper") {
          $("#reveal-screen-computer-choice").addClass("fa-hand-" + computerChoice.toLowerCase() + "-o").removeClass("fa-hand-rock-o fa-hand-scissors-o");
        } else {
          $("#reveal-screen-computer-choice").addClass("fa-hand-" + computerChoice.toLowerCase() + "-o").removeClass("fa-hand-rock-o fa-hand-paper-o");
        }
      };

      revealUserChoice();
      revealComputerChoice();

      // Begin TV screen animations
      $(".btn-choices").off();
      $("#choose-screen").hide(500, function() {
        $("#round-screen").slideDown(500).delay(500).hide(500, function() {
          $("#rock-screen").show(500).delay(500).hide(500, function() {
            $("#paper-screen").show(500).delay(500).hide(500, function() {
              $("#scissors-screen").show(500).delay(500).hide(500, function() {
                $("#shoot-screen").show(500).delay(500).hide(500, function() {
                  $("#reveal-screen").fadeIn(1000).delay(500).fadeOut(500, function() {
                    $("#end-of-round-screen").fadeIn(1000).delay(1000).fadeOut(500, function() {
                      $("#choose-screen").slideDown(500, function() {
                        bindControls(this); // Allows RPS buttons to bind.
                      });
                    }); 
                  });
                });
              })
            })
          })
        })
      });

      rps.gameState.round++;
      $("#round-number").html(rps.gameState.round);
      if (rps.gameState.round === 5){
        if (rps.gameState.userScore > rps.gameState.computerScore) {
          $(".won-lost-or-tied-msg").html(youWin);
        } else if (rps.gameState.computerScore > rps.gameState.userScore) {
          $(".won-lost-or-tied-msg").html(youLose);
        } else {
          $(".won-lost-or-tied-msg").html(tieMsg);
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
  }; // End bindControls function

  var compare = function(choice1, choice2) {

    if (choice1 === choice2) {
      rps.gameState.tiedGameCount++;
      $("#win-msg").html(tieMsg);
      $(".tied-game-count").html(rps.gameState.tiedGameCount);
      $(".won-lost-or-tied-msg").html(tieMsg);
    } else if (choice1 === "Rock") {
      if (choice2 === "Scissors") {
        $("#win-msg").html(rockWins);
        $(".won-lost-or-tied-msg").html(youWin);
        rps.gameState.userScore++;
        $(".user-score").html(rps.gameState.userScore);
      } else {
        $("#win-msg").html(paperWins);
        $(".won-lost-or-tied-msg").html(youLose);
        rps.gameState.computerScore++;
        $(".computer-score").html(rps.gameState.computerScore);
      }
    } else if (choice1 === "Paper") {
      if (choice2 === "Rock") {
        $("#win-msg").html(paperWins);
        $(".won-lost-or-tied-msg").html(youWin);
        rps.gameState.userScore++;
        $(".user-score").html(rps.gameState.userScore);
        // r
      } else {
        $("#win-msg").html(scissorsWins);
        $(".won-lost-or-tied-msg").html(youLose);
        rps.gameState.computerScore++;
        $(".computer-score").html(rps.gameState.computerScore);
      }
    } else {
      if (choice1 === "Scissors") {
        if (choice2 === "Paper") {
          $("#win-msg").html(scissorsWins);
          $(".won-lost-or-tied-msg").html(youWin);
          rps.gameState.userScore++;
          $(".user-score").html(rps.gameState.userScore);
        } else {
          $("#win-msg").html(rockWins);
          $(".won-lost-or-tied-msg").html(youLose);
          rps.gameState.computerScore++;
          $(".computer-score").html(rps.gameState.computerScore);
        }
      }
    }
  }
});

// To Do List:
// Figure out how to pause animations if someone clicks start in the middle of the animations.
// Unbind controls during animation play