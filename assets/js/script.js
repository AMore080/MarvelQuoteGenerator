var quoteEl = $(quoteTextEl);
var button = document.querySelector("btn");
var quoteText = {};
let gif = document.querySelector("#gif")
let movieCover = document.querySelector(".movie-cover")


//Fetches the quote API and distributes info to displayMovies/displayShows
var renderQuote = function () {
  var options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "daff43a091msh3e6e9dafd4cfcf0p1db2d5jsn8974c81b9c33",
      "X-RapidAPI-Host": "marvel-quote-api.p.rapidapi.com",
    },
  };

  fetch("https://marvel-quote-api.p.rapidapi.com/", options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      quoteEl.text(data.Quote);
      quoteEl.addClass("mx-8 draggable");
      $( function() {
        $( ".draggable").draggable();
      } );
      var attribution = document.createElement("h3");
      attribution.classList.add("place-content-end");
      attribution.textContent = " -" + data.Speaker;
      console.log(JSON.stringify(data.Speaker + "marvel"))
      quoteEl.append(attribution);
      speaker = JSON.stringify(data.Speaker).split(" ");
      console.log(quoteEl);
      localStorage.setItem("savedQuote", quoteEl[0].innerText);
      handleRandomGif();
      title = JSON.stringify(data.Title);
      displayMovies();
      displayShows();
    })
    .catch((err) => console.error(err));
};


// Gets a parameter from renderquote and matches the speaker to a randomized gif
// from the giphyAPI using link parameters
function handleRandomGif(){
  let speak = speaker
  
  console.log(speak)

  

  let giphyAPI = "https://api.giphy.com/v1/gifs/random?api_key=tgs71BTlLJyX02wBBfoRfToFipaRcp8R&tag=" + speak + "&rating=pg"
  console.log(giphyAPI)
    fetch(giphyAPI).then(function (response){
      if(response.ok){
        response.json().then(function (data){
          return data;
        })
        .then(function(data){
          console.log(data);
          let randomGif = document.createElement("img");
          randomGif.setAttribute("src", data.data.images.original.url);
          console.log(randomGif)
          gif.appendChild(randomGif);
        })
      }
    })
}

//Both functions displayMovies and displayShows will receive the title from the quote API
// and use it as a parameter in the MCU API to display a movie/show cover 
function displayMovies(){
  let speak = title
  speak.replaceAll('"', '')
  console.log(speak);
  console.log(speak.split(" ").join("%20").split(":").join("%3A"))
  const moviesAPI = "https://mcuapi.herokuapp.com/api/v1/movies?page=1&limit=10&columns=title%2Crelease_date%2Ccover_url&order=chronology%2CDESC&filter=title%3D"
   + speak.replaceAll('"', '').split(" ").join("%20").split(":").join("%3A");


  console.log(moviesAPI)
    
    fetch(moviesAPI).then(function (response){
      if(response.ok){
        response.json().then(function (data){
          return data;
        })
        .then(function (data){
          console.log(data);
          let movieArt = document.createElement("img");
          movieArt.setAttribute("src", data.data[0].cover_url)
          console.log(data.data.title)
          movieCover.appendChild(movieArt)
        })
      }
    })

}

function displayShows(){
  let speak = title
  speak.replaceAll('"', '')
  console.log(speak);
  console.log(speak.split(" ").join("%20").split(":").join("%3A"))
  const moviesAPI = "https://mcuapi.herokuapp.com/api/v1/tvshows?page=1&limit=10&columns=title%2Crelease_date%2Ccover_url&phase&order=release_date%2CDESC&filter=title%3D"
   + speak.replaceAll('"', '').split(" ").join("%20").split(":").join("%3A");


  console.log(moviesAPI)
    
    fetch(moviesAPI).then(function (response){
      if(response.ok){
        response.json().then(function (data){
          return data;
        })
        .then(function (data){
          console.log(data);
          let movieArt = document.createElement("img");
          movieArt.setAttribute("src", data.data[0].cover_url)
          console.log(data.data.title)
          movieCover.appendChild(movieArt)
        })
      }
    })

}

//runs the renderQuote function which sets off the rest
renderQuote();

//Refresh button
function refresh(){
  window.location.reload("Refresh")
}