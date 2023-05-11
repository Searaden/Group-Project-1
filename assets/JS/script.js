// Var Selectors from HTML
var seenEl = document.querySelector("#seen");

//Movie List as variable

// Random Movie Generator
var randomMovies = []

for (let i = 0; i < 1; i++) {
    randomMovies.push("Movie " +(i + 1));
}

var randomIndex = Math.floor(Math.random() * randomMovies.length);
var randomMovie = randomMovies[randomIndex];

console.log("Random movie: " + randomMovie);

//Seen Variable

seenEl.addEventListener("click", function() {
    //Saves movie to local storage and refreshes page
    

});
