require("dotenv").config();


var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys');
 

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify); 
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

 

 
spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });


// Make it so liri.js can take in one of the following commands:

//     * `my-tweets`  (show last 20 tweets in terminal using `node liri.js my-tweets`   )

// //     * `spotify-this-song`
// 				`node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window
     
//      * Artist(s)
     
//      * The song's name
     
//      * A preview link of the song from Spotify
     
//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

//     * `movie-this`

//     * `do-what-it-says`