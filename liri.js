// request all of the packages
// require our .env config
// import keys file
require("dotenv").config();  //  reading .env file and sets variables
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");
var fs = require("fs");
let spotify = new Spotify(keys.spotify);
// Fetch Twitter keys
let client = new Twitter(keys.twitter);


var input = process.argv;
var command = input[2];
var query = input.splice(3).join(" ");

console.log(command, query);

// determine which function to run
// spotify function
function searchSong(query){
    
    if(query === undefined) {
        query = "the sign";
    }

    spotify.search({ type: 'track', query: query}, function(err, data){
        if(err){
            return console.log('Error occoured: ' + err);
        }
        else {
            
        }
        
        // let dataSearch = data.tracks.items[0];
        // console.log('+=+=+=+=+=+=+=+=+Movie Info+=+=+=+=+=+=+=+=+');
        // console.log('Artist: ' + dataSearch.artists[0].name);
        // console.log('Song title: ' + dataSearch.name);
        // console.log('Preview Url: ' + dataSearch.preview_url);
        // console.log('Album: ' + dataSearch.album.name); 
        // console.log('+=+=+=+=+=+=+=+=+Movie Info+=+=+=+=+=+=+=+=+');
    })
}
    // search spotify for song
    // return results
// tweet function
function searchTweet(query){
    console.log("twitter");
    
    // Set my account to pull Tweets from
    var screenName = {
        screen_name: 'g_row1987'
    }
    // Get tweets
    client.get('statuses/user_timeline', screenName, function(err, tweets, response) {

        if(!err && response.statusCode === 200) {

            for(var i = 0; i <tweets.length; i++){
                var tweet = tweets[i].text;
                var tweetDate = tweets[i].created_at

            console.log('+=+=+=+=+=+=+=+=+Tweet Info+=+=+=+=+=+=+=+=+');
            console.log(tweet);
            console.log('Date Posted: ' + tweetDate);
            console.log('+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=');
            console.log('~|~|~|~|~|~|~|~|~|~|~|~|~|~|~|~|~|~|~|~|~|~|');
            }
        }
        else {
            console.log('Error occoured: ' + err);
        }
    })
}
    // get tweets from twitter
    // display tweets
// OMDB funcion
function searchMovie(query){
    console.log("OMDB");
}
    // fetch movie data from OMDB
    // display reseults
// do what it says function
function searchText(query){
    console.log("text file");
}
    // read file
    // determine what function to run and run it

function determineCommand(command, query){
    console.log(command);
    console.log(query);

    switch (command){
    case "spotify-this-song":
        searchSong(query);
        break;
    case "movie-this":
        searchMovie(query);
        break;
    case "my-tweets":
        searchTweet(query);
        console.log(searchTweet);
        break;
    case "do-what-it-says":
        searchText();
        break;
    default: 
        console.log("That is not a valid command");
    }
    
}

// call determine commands
determineCommand(command, query);


