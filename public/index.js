//@ts-check
// ------------- variables and slider value  ------------- //
var pointsTotal = 0;
var slider = document.getElementById("slider");
var speedValue = document.getElementById("speed");

slider.oninput = function () {
  speedValue.innerHTML = slider.value;
};

// ------------- making the dot ------------- //

// random function for dots - calculate a random whole number within a range
function rand(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function drawDots() {
  var diameter = rand(10, 100);
  var speed = (500 / slider.value) * 1000;
  var start = rand(10, $(".game").width() - 100);
  var dot = $("<div/>", {
    class: "dot",
    style:
      "width:" +
      diameter +
      "px; height:" +
      diameter +
      "px; left:" +
      start +
      "px; animation-duration:" +
      speed +
      "ms;",
  });

  $(".game").append(dot);
}

// ------------- calculate points ------------- //

$(document).on("click", ".dot", function () {
  // make dots disappear once clicked
  $(this).addClass("clicked");

  // if the width is between 80 and 100, add 1 point to the total, and so on for all sizes
  if ($(this).width() > 80 && $(this).width() < 100) {
    $(".points").html((pointsTotal += 1));
  } else if ($(this).width() > 60 && $(this).width() < 80) {
    $(".points").html((pointsTotal += 4));
  } else if ($(this).width() > 40 && $(this).width() < 60) {
    $(".points").html((pointsTotal += 7));
  } else if ($(this).width() > 10 && $(this).width() < 40) {
    $(".points").html((pointsTotal += 10));
  }
});

// ------------- when start button is clicked - make dots fall, allow users to pause ------------- //

var startGame;
$("#start").on("click", function () {
  // take out paused state when the game is running
  $(".game").removeClass("inactive");

  startGame = setInterval(function () {
    for (var i = 0; i < 1; i++) {
      drawDots();
      $(".dot").addClass("fall");
    }
  }, 800);
});
