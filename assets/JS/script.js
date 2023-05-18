// Var Selectors from HTMLd
var main = document.querySelector('main');
var mainTitle = document.querySelector('#randomTitle');
var mainPoster = document.querySelector('#randomPoster');
var mainDescription = document.querySelector('#description');
var mainIMDB = document.querySelector('#imdbRate');
var mainRottenTomatoes = document.querySelector('#rottenTom');
var trailerButton = document.querySelector('#trailer');
var seenButton = document.querySelector('#seen');
var rerollButton = document.querySelector('#reroll');
var movieCards = document.querySelector('article');
var modalContent = document.querySelector('.modal-content');
var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close");
var openButton = document.querySelector('#trailer');
var modalTitle = document.querySelector('#modalTitle');

// API URLs constants
const omdbAPI = 'https://www.omdbapi.com/?t=';
const youtubeAPI = 'https://www.googleapis.com/youtube/v3/videos?';

// Global variable initalization
var randomIndex;
var randomMovie;
var apiKey = [];
var player = undefined;

// Baseline movie array and respective IDs
const baselineMovies = ["The Room", "Troll 2", "Birdemic: Shock And Terror" , "Jaws: The Revenge" , "The Wicker Man" , "Killer Klowns From Outer Space"];
const movieIDs = ['9-dIdFXeFhs', 'CkNB0w1fYKk', 'jE5dJDgZ644', 'opiCMIN3PNg', 'QITzuunu-SU', 'ETiSMS4i1as']

// Get randomMovies from local storage if it exists, otherwise use baselineMovies
var randomMovies = JSON.parse(localStorage.getItem("randomMovies"));

// Check if randomMovies is null or undefined, and if it is, set it to baselineMovies and save it to local storage
if (!randomMovies) {
  randomMovies = baselineMovies;
  localStorage.setItem("randomMovies", JSON.stringify(randomMovies));
}

// Random Movie Generator
//Checks to see if movies have the seen value of "true"
var unseenMovies = randomMovies.filter(function(movie) {        
    return !movie.seen;
  });
  
  if (unseenMovies.length === 0) {
    // Hide the buttons once you reach the final page
    trailerButton.style.display = "none";
    seenButton.style.display = "none";
    rerollButton.style.display = "none";
    
    // Hide the content within the main section
    mainTitle.style.display = "none";
    mainPoster.style.display = "none";
    mainDescription.style.display = "none";
    mainIMDB.style.display = "none";
    mainRottenTomatoes.style.display = "none";

    // Display a message or perform any other desired action
    var messageElement = document.createElement("p");
    messageElement.textContent = "🌟You have seen all the movies!🌟";
    messageElement.style.color = "white";
    messageElement.style.fontSize = "50px";
    messageElement.style.fontWeight = "Bolder";
    main.appendChild(messageElement);

    // Else applies a new movie
  } else {
    randomIndex = Math.floor(Math.random() * unseenMovies.length);
    randomMovie = unseenMovies[randomIndex];
  }
  
//Seen Variable. This will add a listener and save a variable to local storage
seenButton.addEventListener("click", function() {
    // Saves the "seen" variable to local storage
    localStorage.setItem("seen", "true");

    // Find the movie randomly selected in the array
    var randomIndex = randomMovies.indexOf(randomMovie);

    // Checks to see if the movie is in the array. If it is it will remove it and update the movie list for the user
    if (randomIndex !== -1) {
        randomMovies.splice(randomIndex, 1, {
            title: randomMovie,
            seen: true
        });
    }

    // Updates the local storage with the updated movie list
    localStorage.setItem("randomMovies", JSON.stringify(randomMovies));

    // Reloads the page to reflect the changes
    location.reload();
});

//Refoll Variable. This will add a listener for rerolling to the next movie
rerollButton.addEventListener("click", function() 
{
  // Reloads the page to reflect the changes
  location.reload();
});

// Prompts user for API key if one is not already stored in localstorage
function init () {
    var storedKeys = JSON.parse(localStorage.getItem('storedKey', apiKey));

    if (storedKeys === null) {
        apiKey.push(prompt('Please Submit OMDb API Key:'));
        apiKey.push(prompt('Please Submit Youtube API Key:'));

        localStorage.setItem('storedKey', JSON.stringify(apiKey))
    } else {
        apiKey = storedKeys;
    }
}

// Render random movie details the screen using data from OMDb API fetch
async function renderRandom() {
    if (randomMovie !== undefined){
        await fetch(omdbAPI + randomMovie + '&apiKey=' + apiKey[0])
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            mainTitle.textContent = data.Title;
            modalTitle.textContent = data.Title;
            mainPoster.src = data.Poster;
            mainDescription.textContent = data.Plot;
            mainIMDB.textContent = "The IMDB Rating is: " + data.imdbRating;
            mainRottenTomatoes.textContent = "Rotten Tomatoes Score: " + data.Ratings[1].Value + "🍅";
        })
    };
}

// Render movie name and poster to the best of the worst using data from OMDb API fetch
async function renderCards() { 
    for (var i = 0; i < movieCards.children.length; i++) {
        await fetch(omdbAPI + baselineMovies[i] + '&apiKey=' + apiKey[0])
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var p = document.createElement('p');
            p.textContent = data.Title;
            movieCards.children[i].append(p);
            
            var img = document.createElement('img');
            img.src = data.Poster;
            movieCards.children[i].append(img);
        })
    }
}

// Youtube IFrame funciton for embeded player
async function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    videoId: movieIDs[randomIndex],
    playerVars: {
        controls: 1, // Show video controls
    }
    });
}

// Render view and like counts to the modal using data from Youtube Data API fetch
async function renderYTData() {
    if (unseenMovies.length != 0) {
        await fetch(youtubeAPI + 'part=statistics&id=' + movieIDs[randomIndex] + '&key=' + apiKey[1])
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var p1 = document.createElement('p');
            var p2 = document.createElement('p');
            p1.textContent = 'Views: ' + data.items[0].statistics.viewCount;
            p2.textContent = 'Likes: ' + data.items[0].statistics.likeCount;
            modalContent.append(p1);
            modalContent.append(p2);
        })
    }
}

// Event listener to open modal to view trailer
openButton.addEventListener('click', function() {
    modal.style.display = 'block';
})

// Event listener to close modal
closeButton.addEventListener('click', function() {
    player?.stopVideo();
    modal.style.display = 'none';
});

init();
renderRandom();
renderCards();
renderYTData();