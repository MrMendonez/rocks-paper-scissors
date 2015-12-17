// Scripts for Rocks Paper Scissors game

window.rps = {
  gameState: {
    userScore: 0,
    computerScore: 0,
    round: 1,
    tiedGameCount: 0
  }
}

$(document).ready(function(){
  var choices = ["Rock", "Paper", "Scissors"];
  var tieMsg = "Tied!";
  var rockWins = "Rock wins!";
  var paperWins = "Paper wins!";
  var scissorsWins = "Scissors wins!";
  var youLose = "You lose!";
  var youWin = "You win!";
  var beatMike = "You beat Mike Tyson!";
  var mikeBeatYou = "Mike Tyson beat you!";
  var tiedMike  = "You tied Mike Tyson";

  // Hide msgs
  $("#gameplay-panel, #pause-screen").hide();
  $("#rock-screen, #paper-screen, #scissors-screen, #shoot-screen").hide();
  $("#reveal-screen, #name-form-div, #end-of-round-screen").hide();
  $("#game-over-screen, #credits").hide();

  function newButtonAnimation() {
    $("#new-button, #submit-name-button").on("mouseenter", function() {
      $(this).toggleClass("btn-success btn-danger");
    }).on("mouseleave", function() {
      $(this).toggleClass("btn-danger btn-success");
    })
  }

  newButtonAnimation(); // Makes 'New' & 'Play' button change color on mouseover

  $("#new-button").on("click", function(){
    $("#jumbotron-and-new-button").slideUp(function() {
      $("#name-form-div").delay(100).slideDown(); // Input name form appears
      $("input").focus();
    })
    $("#panel-title").slideUp();
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
    $("#name-form-div, #1987-nintendo-div").slideUp(function() {
      $("#gameplay-panel").slideDown(1000);
    })
  })

  // Pause game on start
  // $("#start").on("click", function() {
  //   if($(this).attr("data-status") === "on") {
  //     $(this)
  //       .attr("data-status", "off");
  //     $(".btn-choices").off();
  //     $("#pause-screen").slideDown();
  //   } else {
  //     $(this)
  //       .attr("data-status", "on");
  //     bindControls();
  //     $("#pause-screen").slideUp();
  //   }
  // })

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
          // Add rock icon and rotate 90 degs
          $("#reveal-screen-user-choice").addClass("fa-hand-" + userChoice.toLowerCase() + "-o fa-rotate-90")
          // Remove unnecessary classes
          $("#reveal-screen-user-choice").removeClass("fa-hand-paper-o fa-hand-scissors-o fa-flip-horizontal")
        } else if(userChoice === "Paper") {
          // Add paper icon and rotate 90 degs
          $("#reveal-screen-user-choice").addClass("fa-hand-" + userChoice.toLowerCase() + "-o fa-rotate-90")
          // Remove unnecessary classes
          $("#reveal-screen-user-choice").removeClass("fa-hand-rock-o fa-hand-scissors-o fa-flip-horizontal")
        } else {
          // Add Scissors icon and flip horizontally
          $("#reveal-screen-user-choice").addClass("fa-hand-" + userChoice.toLowerCase() + "-o fa-flip-horizontal")
          // Remove unnecessary classes
          $("#reveal-screen-user-choice").removeClass("fa-hand-rock-o fa-hand-paper-o fa-rotate-90")
        }
      };

      function revealComputerChoice() {
        if (computerChoice === "Rock") {
          // Add rock icon and rotate 270 degs
          $("#reveal-screen-computer-choice").addClass("fa-hand-" + computerChoice.toLowerCase() + "-o fa-rotate-270")
          // Remove unnecessary classes
          $("#reveal-screen-computer-choice").removeClass("fa-hand-paper-o fa-hand-scissors-o")
        } else if(computerChoice === "Paper") {
          // Add paper icon and rotate 270 degs
          $("#reveal-screen-computer-choice").addClass("fa-hand-" + computerChoice.toLowerCase() + "-o fa-rotate-270")
          // Remove unnecessary classes
          $("#reveal-screen-computer-choice").removeClass("fa-hand-rock-o fa-hand-scissors-o");
        } else {
          // Add scissors icon
          $("#reveal-screen-computer-choice").addClass("fa-hand-" + computerChoice.toLowerCase() + "-o")
          // Remove unnecessary classes
          $("#reveal-screen-computer-choice").removeClass("fa-hand-rock-o fa-hand-paper-o fa-rotate-270");
        }
      };

      revealUserChoice();
      revealComputerChoice();

      // Use start button to pause and unpause game
      // $("#start").on("click", function() {
      //   if($(this).attr("data-status") === "on") {
      //     $(this)
      //       .attr("data-status", "off");
      //     $(".btn-choices").off();
      //     $("#pause-screen").slideDown();
      //   } else {
      //     $(this)
      //       .attr("data-status", "on");
      //     bindControls();
      //     $("#pause-screen").slideUp();
      //   }
      // })

      // Begin TV screen animations
      $(".btn-choices").off(); // Control buttons are disabled during tv animations
      $("#scoreboard").addClass("pullDown").hide(); // Hide scoreboard
      if ($("#tv").attr("data-animationstatus") === "not-playing") {
        $("#tv").attr("data-animationstatus", "playing");
      }
      $("#choose-screen").hide(function() {
        $("#rock-screen").slideDown(500).delay(2500).fadeOut(250);
        $("#paper-screen").delay(750).slideDown(500).delay(1750).fadeOut(250);
        $("#scissors-screen").delay(1500).slideDown(500).delay(1000).fadeOut(250);
        $("#shoot-screen").delay(2250).slideDown(500).delay(250).fadeOut(250, function() {
          $("#reveal-screen").fadeIn(1000).delay(1500).fadeOut(function() {
            $("#end-of-round-screen").fadeIn(1000).delay(500).fadeOut(function() {
              if (rps.gameState.round === 5 || rps.gameState.userScore === 3 || rps.gameState.computerScore === 3) {
                if (rps.gameState.userScore > rps.gameState.computerScore) {
                  $(".won-lost-or-tied-series").html(beatMike);
                } else if (rps.gameState.computerScore > rps.gameState.userScore) {
                  $(".won-lost-or-tied-series").html(mikeBeatYou);
                } else {
                  $(".won-lost-or-tied-series").html(tiedMike);
                } // End if statement
                $("#game-over-screen").fadeIn(500, function(){
                  $("#credits").addClass("pullUp").show();
                  $(".btn-choices").on("click", function() {
                    $("#game-over-screen").hide();
                    rps.gameState.round = 0;
                    rps.gameState.userScore = 0;
                    rps.gameState.computerScore = 0;
                    rps.gameState.tiedGameCount = 0;
                    $(".round-number").html(rps.gameState.round);
                    $(".tied-game-count").html(rps.gameState.tiedGameCount);
                    $(".user-score").html(rps.gameState.userScore);
                    $(".computer-score").html(rps.gameState.computerScore);
                    roundCounter();
                    $("#choose-screen").slideDown(500, function() {
                      $("#scoreboard").addClass("pullUp").show();
                      bindControls(this); // Allows RPS buttons to bind.
                    })
                  })
                  $(".btn-choices").on("click", function(){
                    $("#credits").addClass("slideUp").hide();
                  })
                });
              } else {
                roundCounter();
                $("#choose-screen").slideDown(500, function() {
                  $("#tv").attr("data-animationstatus", "not-playing");
                  $("#scoreboard").addClass("pullUp").show(); // Reveal updated scoreboard
                  bindControls(this); // Allows RPS buttons to bind.
                })
              }
            })
          })
        })
      }); // End TV screen animations

      function roundCounter() {
        rps.gameState.round++;
        $(".round-number").html(rps.gameState.round);
      } // End function roundConter
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

  function buttonAnimations() {
    if ($("#tv").attr("data-animationstatus") === "not-playing") {
      $(document).on("mouseenter", ".btn-choices", function(){
        $(this).addClass("pulse");
      });
      $(document).on("mouseleave", ".btn-choices", function(){
        $(this).removeClass("pulse expandOpen");
      });
      $(document).on("click", ".btn-choices", function(){
        $(this).addClass("expandOpen");
        $(this).removeClass("pulse");
      });
    } else { // When animation is playing
      $(document).on("mouseenter", ".btn-choices", function(){
        $(".btn-choices").removeClass("pulse expandOpen");
      })
    }
  }
  buttonAnimations();

  // Show credits modal when pressing 'select' button
  function creditsModal() {
    $("#select, #start").on("click", function() {
      $(this).addClass("expandOpen");
      $("#credits-modal").modal("show");
    })
    $("#select, #start").on("mouseenter", function() {
      $(this).addClass("pulse");
    })
    $("#select, #start").on("mouseleave", function() {
      $(this).removeClass("pulse expandOpen");
    })
  }
  creditsModal();

  // Restart button
  function restartGame() {
    $("#reset-button").on("click", function() {
      location.reload();
    })
  }
  restartGame();

  function gracefulExit() {
    $("#exit-button").on("click", function() {
      $(this).addClass("expandOpen");
      location.reload();
    })
    $("#exit-button").on("mouseenter", function() {
      $(this).addClass("pulse");
    })
    $("#exit-button").on("mouseleave", function() {
      $(this).removeClass("pulse");
    })

  }
  gracefulExit();

}); // End (document).ready function(){};

// To Do List:
// game over logic needs to be fixed

// Figure out how to stop rock, paper, scissors buttons from animating (pulse and expandOpen) during tv animation
// Figure out how to pause animations if someone clicks start in the middle of the animations.