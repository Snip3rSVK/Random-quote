let quotes = getJSON("https://raw.githubusercontent.com/Snip3rSVK/Random-quote/master/resources/json/quotes.json", (data) => {
	quotes = data;
	generateQuote();
});
let colors = getJSON("https://raw.githubusercontent.com/Snip3rSVK/Random-quote/master/resources/json/colors.json", (data) => colors = data);

const newQuoteBtn = document.querySelector("#new-quote-btn");
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
	const randomQuoteNum = Math.floor(Math.random() * (quotes.length - 1));
	const randomColorNum = Math.floor(Math.random() * (colors.length - 1));
	quote.textContent = quotes[randomQuoteNum][0];
	author.textContent = quotes[randomQuoteNum][1];
	quote.style.backgroundColor = colors[randomColorNum];
}

newQuoteBtn.addEventListener("click", generateQuote);



