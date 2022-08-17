var quoteEl = document.getElementById("quoteTextEl");
var button = document.querySelector("btn");
var quoteText = {};
let gif = document.querySelector("#gif")


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
      quoteEl.textContent = data.Quote;
      quoteEl.classList.add("mx-8");
      var attribution = document.createElement("h3");
      attribution.classList.add("place-content-end");
      attribution.textContent = " -" + data.Speaker;
      console.log(JSON.stringify(data.Speaker + "marvel"))
      quoteEl.append(attribution);
      speaker = JSON.stringify(data.Speaker + " marvel")
      handleRandomGif()
    })
    .catch((err) => console.error(err));
};




function handleRandomGif(){
  let speak = speaker
  
  console.log(speak)

  let giphyAPI = "https://api.giphy.com/v1/gifs/random?api_key=tgs71BTlLJyX02wBBfoRfToFipaRcp8R&tag=" + speak + "&rating=g"
  console.log(giphyAPI)
    fetch(giphyAPI).then(function (response){
      if(response.ok){
        response.json().then(function (data){
          return data;
        })
        .then(function(data){
          console.log(data);
          let randomGif = document.createElement("img");
          console.log(data.bitly_gif_url);
          randomGif.setAttribute("src", data.data.images.original.url);
          console.log(randomGif)
          gif.appendChild(randomGif);
        })
      }
    })

  


}

renderQuote();
