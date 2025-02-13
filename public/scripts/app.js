/*eslint-env jquery, browser*/

$(() => {

  //compare current time, posted time, and return a humanized value
  //function adapted from: https://stackoverflow.com/a/6109105
  const timeDifference = function(current, previous) {

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    const elapsed = current - previous;
    
    let timeElapsed = "";
    let desc = "";
 
    if (elapsed < msPerMinute) {
      return 'less than a minute ago';
    } else {
      if (elapsed < msPerHour) {
        timeElapsed =  Math.round(elapsed / msPerMinute);
        desc = ' minute';
      } else if (elapsed < msPerDay) {
        timeElapsed = Math.round(elapsed / msPerHour);
        desc = ' hour';
      } else if (elapsed < msPerMonth) {
        timeElapsed = Math.round(elapsed / msPerDay);
        desc = ' day';
      } else if (elapsed < msPerYear) {
        timeElapsed = Math.round(elapsed / msPerMonth);
        desc = ' month';
      } else {
        timeElapsed = Math.round(elapsed / msPerYear);
        desc = ' year';
      }
      timeElapsed === 1 ? desc += ' ago' : desc += 's ago';
      return `${timeElapsed} ${desc}`;
    }
  };

  //get tweets from database and load to page
  const loadTweets = function() {
    $.ajax({
      type: "get",
      url: "/tweets",
    })
      .then(function(data) {
        renderTweets(data);
      });
  };

  // takes text from post-tweet form, sends to database and erases/recalls tweets
  $("#post-tweet").submit(function(event) {
 
    // Stop form from submitting normally
    event.preventDefault();
   
    // Get some values from elements on the page:
    const form = $(this);
    const formData = form.serialize();
    const url = form.attr("action");

    if (formData.length <= 5) {
      $(".errors").slideDown();
      $(".errors span").text("Please tweet about something!");
    } else {
      $(".errors").slideUp();
      // Send the data using post
      $.ajax({
        type: "POST",
        url: url,
        data: formData
      })
        .then(function() {
          $("#post-tweet").trigger("reset");  //erase text entry box
          $("#tweets").empty();  //remove all tweets from page
          loadTweets();  //render all tweets from database again
        });
    }
  });

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $("#tweets").prepend(createTweetElement(tweet));
    }
  // calls createTweetElement for each tweet
  // takes return value and prepends (reverse order) it to the tweets container
  };
  const createTweetElement = function(tweet) {
    const time = Date.now();

    // scrubs user tweet input to text
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
    
    let $tweet = $(`

    <div class="tweet-box">
    <article class="tweet-article">
    <header class="tweet-box-header">
      <span>
        <img src="${tweet.user.avatars}">${tweet.user.name}</img>
      </span>
      <span class="tweet-box-handle">${tweet.user.handle}</span>
    </header>
    ${safeHTML}
    <footer class="tweet-box-footer">
    <span>
      ${timeDifference(time, tweet.created_at)}
    </span>
    <div class="link-images">
      <img src="./images/flag.png">
      <img src="./images/retweet.png">
      <img src="./images/like.png">
    </div>
    </article>
    </div>
    <br>`

    );
    return $tweet;
  };
  
  loadTweets();

  //controls arrow under write a new tweet, toggles compose box
  $(".topnav-arrow").click(function(event) {
    event.preventDefault();
    $("#compose-box").toggle(200, "swing");
    $(".errors").slideUp();
    $(".humm-text").focus();
    return false;
  });

  //bottom arrow, scrolls back to top of document, and opens compose
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $("#scroll-top").addClass("show");
    } else {
      $("#scroll-top").removeClass("show");
    }
  });

  $("#scroll-top").click(function() {
    $(".errors").slideUp();
    $('#compose-box').slideUp(); //hides errors and compose box if already open
    $("html, body").animate({
      scrollTop: 0
    }, 300);
    $('#compose-box').slideDown();  //opens compose box, so going to top will always open box
    $(".humm-text").focus();

    return false;
  });
});

