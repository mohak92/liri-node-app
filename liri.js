require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var queryType = process.argv[2];
var requestInfo = process.argv.splice(3).join(" ").replace(/"/g, "");
var loggerInfo;
var url;

if (queryType !== undefined) {
    queryType = queryType.toLowerCase();
}

commandRunner(queryType, requestInfo);

function commandRunner(queryType, requestInfo) {
    switch (queryType) {
        case "concert-this":
            console.log("Get Artist Info " + requestInfo);
            url = "https://rest.bandsintown.com/artists/" + requestInfo + "/events?app_id=codingbootcamp";
            concertThis(url);
            break;
        case "spotify-this-song":
            console.log("Get Song Info " + requestInfo);
            break;
        case "movie-this":
            console.log("Search movie info " + requestInfo);
            break;
        case "do-what-it-says":
            console.log("Run Query from random.txt");
            break;
        default:
            spotifyThisSong();
    }
}

function concertThis(url) {
    axios.get(url)
  .then(function (response) {
    // handle success
    for(var i = 0;i < response.data.length;i++){
        console.log("Name of venue: " + response.data[i].venue.name);
        console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
        console.log("Date of event: " + response.data[i].datetime + "\n\n");
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

function spotifyThisSong(){
    console.log("Search for song info ");
}

function movieThis() {

}

function doWhatItSays() {

}

function myLogger(loggerInfo) {
    if(loggerInfo !== undefined){
        fs.appendFile("log.txt", loggerInfo, function(error) {

        });
    }
}