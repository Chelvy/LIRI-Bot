require('dotenv').config();
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var logfile = './log.txt';
// var log = require('simple-node-logger').createSimpleFileLogger(logfile);
// log.setLevel('all');


function concertThis(artistBandName) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artistBandName + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function(response) {
            console.log("Name of the venue: " + response.data[0].venue.name);
            console.log("Venue location: " + response.data[0].venue.city);
            console.log("Date of the Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
            console.log("-----------------------");
        }
    );
}

var spotify = new Spotify(keys.spotify);

function spotifyThisSong(song) {
    // spotify = new Spotify({
    //     id: spotifyKeyInfo["spotify"].id,
    //     secret: spotifyKeyInfo["spotify"].secret
    // });


    spotify.search({ type: 'track', query: song }, function(error, response) {
        if (error) {
            return console.log(error);
        } else {
            for (var i = 0; i < response.tracks.items.length; i++) {
                var songResponse = response.tracks.items[i];
                console.log("Artist(s): " + songResponse.artists[0].name);
                console.log("The song's name: " + songResponse.name);
                console.log("A preview link of the song from Spotify: " + songResponse.preview_url);
                console.log("The album that the song is from: " + songResponse.album.name);
                console.log("-----------------------");
            }
        }
    });
};

function movieThis(movie) {
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(
        function(response) {
            console.log("Title of the movie: " + response.data.Title);
            console.log("Year the movie came out: " + response.data.Year);
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("Country where the movie was produced: " + response.data.Country);
            console.log("Language of the movie: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);
            console.log("-----------------------");
        }
    );
};


function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, response) {
        if (error) {
            return console.log(error);
        }
        var itSays = response.split(",");
        console.log(spotifyThisSong(itSays[1]));
        console.log("-----------------------");
    });
};

const userInput = process.argv[2];
const inputTopic = process.argv[3];

switch (userInput) {
    case ('concert-this'):
        if (inputTopic) {
            concertThis(inputTopic);
        } else {
            concertThis("world")
        }
        break;
    case ('spotify-this-song'):
        if (inputTopic) {
            spotifyThisSong(inputTopic);
        } else {
            spotifyThisSong('The Sign');
        }
        break;
    case ('movie-this'):
        if (inputTopic) {
            movieThis(inputTopic);
        } else {
            movieThis('Mr. Nobody.');
        }
        break;
    case ('do-what-it-says'):
        doWhatItSays();
        break;
    default:
        console.log('Try again');
};