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
            
            let dataSearch = data.tracks.items[0];
            
            console.log('+=+=+=+=+=+=+=+=+Song Info+=+=+=+=+=+=+=+=+');
            console.log('Artist: ' + dataSearch.artists[0].name);
            console.log('Song title: ' + dataSearch.name);
            console.log('Preview Url: ' + dataSearch.preview_url);
            console.log('Album: ' + dataSearch.album.name); 
            console.log('+=+=+=+=+=+=+=+=+Song Info+=+=+=+=+=+=+=+=+');
        }
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
// OMDB funcion
function searchMovie(query){
    console.log("OMDB");
    let movieKey = "trilogy";
    let movieURL = "http://www.omdbapi.com/?t=" + query + "&apikey=" + movieKey + "";

    request(movieURL, function(err, response, body) {
       

        if (err && response.statusCode === 200) {
            
            console.log('Something went wrong' + err)
        }
        else {
            
            var searchBody = JSON.parse(body);
            

            console.log("=====================Movie Info==================")
            console.log(searchBody.Title);
            console.log(searchBody.Year);
            console.log("OMDB Rating: " + searchBody.imdbRating)
            console.log("Rotten Tomatoes Rating: " + searchBody.Ratings[1].Value);
            console.log("Country: " + searchBody.Country);
		    console.log("Language: " + searchBody.Language);
		    console.log("Plot: " + searchBody.Plot);
		    console.log("Actors: " + searchBody.Actors);

        }
    })
}
    // fetch movie data from OMDB
    // display reseults
// do what it says function
function searchText(){
    // console.log("text file");
    fs.readFile('./random.txt', "utf8", function(err, data){
        
        if (err) {
            return console.log(err);
  		}
        var dataArr = data.split(",");
        var query = dataArr[1].slice(1, -1);
        
        switch (dataArr[0]){
            case "spotify-this-song":
                searchSong(query);
                break;
            case "movie-this":
                searchMovie(query);
                break;
            case "my-tweets":
                searchTweet(query);
                break;
            case "do-what-it-says":
                searchText();
                break;
            default: 
                console.log("That is not a valid command!!");
        }  
    });
};
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
        break;
    case "do-what-it-says":
        searchText();
        break;
    default: 
        console.log("That is not a valid command!!");
    }
    
}

// call determine commands
determineCommand(command, query);


