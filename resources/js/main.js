let colors = getJSON("https://raw.githubusercontent.com/Snip3rSVK/Random-quote/master/resources/json/colors.json", (data) => colors = data);
let quotes = getJSON("https://raw.githubusercontent.com/Snip3rSVK/Random-quote/master/resources/json/quotes.json", (data) => {
	quotes = data;
	generateQuote();
});

const newQuoteBtn = document.querySelector("#new-quote-btn");
const body = document.querySelector("body");
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");

function getJSON(url, callback) {
	const httpRequest = new XMLHttpRequest();

	if (!httpRequest)
		return false;

	httpRequest.open("GET", url);
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === 4 && httpRequest.status === 200)
			callback(JSON.parse(httpRequest.responseText));
	};
	httpRequest.send();
}

function generateQuote() {
	const randomColorNum = Math.floor(Math.random() * (colors.length - 1));
	const randomQuoteNum = Math.floor(Math.random() * (quotes.length - 1));
	console.log(quote);
	console.log(colors[randomColorNum]);
	body.setAttribute("style", `background: ${ colors[randomColorNum] }`);
	quote.textContent = quotes[randomQuoteNum][0];
	author.textContent = quotes[randomQuoteNum][1];
}

newQuoteBtn.addEventListener("click", generateQuote);



