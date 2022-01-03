/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  $("#get-tweet").on("submit", function (e) {
    e.preventDefault();

    //gets submitted tweet from the form
    const formData = $(this).serialize();
    let textAreaStatus = $("#tweet-text").val().trim();

    if(textAreaStatus.length < 1){
      $('.form-error')
        .html('<i class="fa fa-exclamation-triangle"></i>&nbsp;Please enter some text to tweet&nbsp;<i class="fa fa-exclamation-triangle"></i>')
        .slideDown(400);
    }

    else if(textAreaStatus.length > 140){
      $('.form-error')
        .html('<i class="fa fa-exclamation-triangle"></i>&nbsp;Tweet is too long. Consider shortening your tweet.&nbsp;<i class="fa fa-exclamation-triangle"><i>')
        .slideDown(400);
    }

    else{
      //sends tweet to post route for processing + saving
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: formData,
        success: function (response) {
          $('#tweet-text').val('');
          $('.tweet-listing').empty();
          loadTweets();
        },
        error: function (response) {
        }
      });
    }    
});
//end submit function

// makes a request to the get route to retrieve all tweets, runs everytime the page loads
const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    method: "GET",
    success: function (data, textStatus, jqXHR) {

      for (let i = data.length - 1; i >= 0; i--) {
        // use function to create and append retrieved tweets
        createTweetElement(data[i]);
      }
    },
    error: function (data, textStatus, jqXHR) {
    }
  });
}

loadTweets();

const createTweetElement = function (tweetData) {
  const imagedisplay = (tweetData.user.avatars && tweetData.user.avatars !== "") ? `<img alt="tweet-avatar" src="${tweetData.user.avatars}">` : `<span class ="fa-solid fa-user-astronaut"> </span>`;
  const timeDisplay = timeago.format(tweetData.created_at);

  const tweet = `<article>
      <header class="articles-header">
        <div class = "profile-details">
          ${imagedisplay}
          <h3>${tweetData.user.name}</h3>
        </div>
        <div class="username">
          <h3>${tweetData.user.handle}</h3>
        </div>
      </header>

      </header>
      <p>${tweetData.content.text}</p>
      <hr>
      <footer>
        <div>
          <output name="postDate" class="postDate">${timeDisplay}</output>
        </div>
        <div class="flags">
          <a href="#"><span class="fa-solid fa-flag"></span></a>
          <a href="#"><span class="fa-solid fa-retweet"></span></a>
          <a href="#"><span class="fa-solid fa-heart"></span></a>
        </div>
      </footer>
    </article>`;

  $('.tweet-listing').append(tweet);
}

  /*
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  createTweetElement(tweetData);
  */
});