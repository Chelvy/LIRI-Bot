require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

spotify.concertThis = function() {
    var artist = process.argv[2];
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.Name);
        console.log(response.Venue);
        console.log(moment(response.Date).format("MM/DD/YYYY"));
    });
};

spotify.spotifyThisSong = function() {

}