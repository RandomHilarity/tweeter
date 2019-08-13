// counter function, returns 140 - the number of characters typed in

$(document).ready(function() {
  
  console.log(this, "composer is ready");
  
  $(".humm-text").on("keyup", function() {
    let length = $(this).val().length;
    let lengthRemaining = 140 - length;
    let location = $(this).parent().find(".counter");

    location.text(lengthRemaining);
    lengthRemaining === 0 ? location.addClass("red") : location.removeClass("red");
  });
});