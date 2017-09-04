(function() {
	let colors = getJSON("https://raw.githubusercontent.com/Snip3rSVK/Random-quote/master/resources/json/colors.json", (data) => colors = data);
	let quotes = getJSON("https://raw.githubusercontent.com/Snip3rSVK/Random-quote/master/resources/json/quotes.json", (data) => {
		quotes = data.filter((curr) => curr[0].length <= 60);
		generateQuote();
	});
	const prevRandomNums = {
		quote: null,
		color: null
	};

	const newQuoteBtn = document.querySelector("#new-quote-btn");
	const tweetQuoteBtn = document.querySelector("#tweet-quote-btn");
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
		const randomColorNum = Math.floor(Math.random() * (colors.length));
		const randomQuoteNum = Math.floor(Math.random() * (quotes.length));

		if (randomColorNum == prevRandomNums.color || randomQuoteNum == prevRandomNums.quote) {
			generateQuote();
			return;
		}

		prevRandomNums.color = randomColorNum;
		prevRandomNums.quote = randomQuoteNum;
		const fadeOutPromise = new Promise((resolve) => {
			quote.setAttribute("style", "animation: fadeOut 450ms cubic-bezier(.55, .055, .675, .19) forwards");
			author.setAttribute("style", "animation: splashOut .4s cubic-bezier(.55, .055, .675, .19) forwards");
			setTimeout(function() {
				body.setAttribute("style", `background: linear-gradient(to right, ${colors[randomColorNum]}, ${colors[randomColorNum].replace(/\d+(?=%\))/, (match) => Number(match) + 15)}`);
			}, 300);
			setTimeout(function() {
				quote.textContent = quotes[randomQuoteNum][0];
				author.textContent = quotes[randomQuoteNum][1];
				tweetQuoteBtn.setAttribute("href", `https://twitter.com/intent/tweet?text=${quotes[randomQuoteNum][0]} - ${quotes[randomQuoteNum][1]}`);
				resolve();
			}, 550);
		});
		fadeOutPromise.then(() => {
			quote.setAttribute("style", "animation: fadeIn .5s cubic-bezier(.215, .61, .355, 1) forwards");
			author.setAttribute("style", "animation: splashIn .3s cubic-bezier(.215, .61, .355, 1) forwards");
		});
	}

	newQuoteBtn.addEventListener("click", generateQuote);
})();