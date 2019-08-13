$(document).ready(function() {


  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      console.log(createTweetElement(tweet));
      $("#tweets").append(createTweetElement(tweet));
    }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  };
  const createTweetElement = function(tweet) {
    let $tweet = $(`

    <div class="tweet-box">
    <article class="tweet-article">
    <header class="tweet-box-header">
      <img src="${tweet.user.avatars}">${tweet.user.name}</img>
      <span class="tweet-box-handle">${tweet.user.handle}</span>
    </header>
    <p>
      ${tweet.content.text}
    </p>
    <footer class="tweet-box-footer">
    <span>
      ${tweet.created_at}
    </span>
    <div>
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
  
  renderTweets(data);
});

/* 
<div class="tweet-box">
<article class="tweet-article">
  <header class="tweet-box-header">
    <img src="blah" title="username">
    <span class="tweet-box-handle">@SirIsaac</span>
  </header>
  <p>
  If I have seen further is by standing on the shoulders of giants
  </p>
  <footer class="tweet-box-footer">
    <span>
      10 days ago
    </span>
    <div>
      <img src="./images/flag.png">
      <img src="./images/retweet.png">
      <img src="./images/like.png">
    </div>
  </footer>
</article>
</div> */