// Var Selectors from HTML
var seenEl = document.querySelector("#seen");

// Baseline movie array
var baselineMovies = ["Avengers", "Star Wars", "Jurassic Park", "The Matrix", "Indiana Jones"];

// Get randomMovies from local storage if it exists, otherwise use baselineMovies
var randomMovies = JSON.parse(localStorage.getItem("randomMovies"));

// Check if randomMovies is null or undefined, and if it is, set it to baselineMovies and save it to local storage
if (!randomMovies) {
  randomMovies = baselineMovies;
  localStorage.setItem("randomMovies", JSON.stringify(randomMovies));
}


// Random Movie Generator
var randomIndex = Math.floor(Math.random() * randomMovies.length);
var randomMovie = randomMovies[randomIndex];

console.log("Random movie: " + randomMovie);

//Seen Variable. This will add a listener and save a variable to local storage
seenEl.addEventListener("click", function() {
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



var main = document.querySelector('main');
var apikey = prompt ('Please Submit API Key:');
// 'twilight' being used as a placeholder movie, change to any movie or as a variable later
fetch('https://www.omdbapi.com/?t=' + 'twilight' + '&apikey=' + apikey)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    main.children[0].textContent = data.title;
    main.children[1].src = data.Poster;
    main.children[2].textContent = data.Plot;
});