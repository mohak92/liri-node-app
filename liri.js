require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var queryType = process.argv[2];
var requestInfo = process.argv.splice(3).join(" ").replace(/"/g, "");
var loggerInfo;
var url;