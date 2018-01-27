require("dotenv").config();


var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys');


var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);


// ================================Twitter=====================================================

var requestPhrase = process.argv[2];

if (requestPhrase === "my-tweets") {
    var params = { screen_name: 'colescodes' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (var i = 0; i < 20; i++) {
                console.log("Created at: " + tweets[i].created_at);
                console.log("Text: " + tweets[i].text);
            }
        }
    });
}

// =================================Spotify==========================================

var songInput = process.argv[3];
var defaultSong = "In the end"

function doSongSearch(songInput) {
	spotify.search({
            type: "track",
            query: songInput
        },
        function(err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            // var dataParsed = JSON.parse(data);
            var song = data.tracks.items[0];
            // console.log("###########################\n", song);
            var albumName = song.album.name;
            var songName = song.name;
            var songLink = song.preview_url;

            console.log("Album Name:", albumName);
            console.log("Song Name:", songName);
            console.log("Song Link:", songLink)
            // var artistsNames = song.artists[0].name

            for (var i = 0; i < song.artists.length; i++) {
            	var artist = song.artists[i];
            	console.log("Artists:", artist.name);

            }
        });
}


if (requestPhrase === "spotify-this-song" && songInput === undefined) {
    songInput = defaultSong;
    console.log("You did not choose, so I chose for you!");
}

if (requestPhrase === "spotify-this-song") {
	doSongSearch(songInput)
};

// ================================OMDB ==========================================

var request = require('request');
var movieInput = process.argv[3];
var defaultMovie = "Serenity"

if (requestPhrase === "movie-this" && movieInput === undefined) {
    movieInput = defaultMovie;
    console.log("This is an awesome movie, it takes place after the best TV show ever, Firefly")
}

if (requestPhrase === "movie-this") {
    request("https://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log(response.body);
        var bodyParsed = JSON.parse(body);
        console.log("\nTitle: " + bodyParsed.Title + "\nRelease Year: " + bodyParsed.Year + "\nIMDB Rating " + bodyParsed.imdbRating)
        var extraRatings = bodyParsed.Ratings[1].Value;
        console.log("Rottom Tomatoes Rating: " + extraRatings + "\nCountry Produced: " + bodyParsed.Country + "\nLanguage: " + bodyParsed.Language);
        console.log("Plot: " + bodyParsed.Plot + "\nActors: " + bodyParsed.Actors);
    });
}

// ===========================================Random Text File===============================================

var fs = require("fs");
if (requestPhrase === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            console.log(error)
            return
        }
        console.log("node liri.js " + data);

        // console.log(data);

        var dataArr = data.split(",");

        console.log(dataArr);

    });
}

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from
