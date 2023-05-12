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

var main = document.querySelector('main');
var apiKey;

init();

function init () {
    var storedKey = JSON.parse(localStorage.getItem('storedKey', apiKey));

    if (storedKey === null) {
        apiKey = prompt ('Please Submit API Key:');
        localStorage.setItem('storedKey', JSON.stringify(apiKey))
    } else {
        apiKey = storedKey;
    }
}
// 'twilight' being used as a placeholder movie, change to any movie or as a variable later
fetch('https://www.omdbapi.com/?t=' + 'twilight' + '&apiKey=' + apiKey)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    main.children[0].textContent = data.title;
    main.children[1].src = data.Poster;
    main.children[2].textContent = data.Plot;
});