var quoteEl = document.getElementById("quoteTextEl");
var button = document.querySelector("btn");
var quoteText = {};

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
      quoteEl.append(attribution);
    })
    .catch((err) => console.error(err));
};

renderQuote();
