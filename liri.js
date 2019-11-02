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

function spotifyThisSong(){
    console.log("Search for song info ");
}