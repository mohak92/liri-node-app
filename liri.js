require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var queryType = process.argv[2];
var requestInfo = process.argv.splice(3).join(" ").replace(/"/g, "");
var loggerInfo;
var url;
var spotify = new Spotify(keys.spotify);

if (queryType !== undefined) {
    queryType = queryType.toLowerCase();
}

commandRunner(queryType, requestInfo);

function commandRunner(queryType, requestInfo) {
    switch (queryType) {
        case "concert-this":
            if (requestInfo === undefined || requestInfo === "") {
                requestInfo = "Toby Keith";
            }
            console.log("Get Artist Info " + requestInfo);
            url = "https://rest.bandsintown.com/artists/" + requestInfo + "/events?app_id=codingbootcamp";
            concertThis(url);
            break;
        case "spotify-this-song":
            if (requestInfo === undefined || requestInfo === "") {
                requestInfo = "The Sign";
            }
            console.log("Get Song Info " + requestInfo);
            spotifyThisSong(requestInfo);
            break;
        case "movie-this":
            if (requestInfo === undefined || requestInfo === "") {
                requestInfo = "Mr Nobody";
            }
            console.log("Search movie info " + requestInfo);
            url = "http://www.omdbapi.com/?t=" + requestInfo + "&apikey=trilogy&plot=short&tomatoes=true;"
            movieThis(url);
            break;
        case "do-what-it-says":
            console.log("Run Query from random.txt");
            doWhatItSays();
            break;
        default:
            spotifyThisSong("The Sign");
    }
}

function concertThis(url) {
    axios.get(url)
        .then(function (response) {
            // handle success
            for (var i = 0; i < response.data.length; i++) {
                console.log("Name of venue: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date of event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n\n");
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

function spotifyThisSong(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Release Date: " + data.tracks.items[0].album.release_date);


    });
}

function movieThis(url) {
    axios.get(url)
        .then(function (response) {
            // handle success
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMdB Rating: " + response.data.imdbRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
            console.log("Rotten Tomatoes URL: " + response.data.tomatoURL);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", function (error, data) {
        if (error) {
            console.log(error)
        }
        var query = data.split(",");
        var randomRequestInfo = query[1].toString().replace(/"/g, "");
        commandRunner(query[0].toLowerCase(), randomRequestInfo);
    });
}

function myLogger(loggerInfo) {
    if (loggerInfo !== undefined) {
        fs.appendFile("log.txt", loggerInfo, function (error) {

        });
    }
}