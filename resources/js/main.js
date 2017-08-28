(function() {
	let httpRequest;

	function makeRequest() {
		httpRequest = new XMLHttpRequest();

		if (!httpRequest) {
			return false;
		}

		httpRequest.overrideMimeType("application/json");
		httpRequest.onreadystatechange = readJSON;
		httpRequest.open("GET", "B:/Snip3r/Programing, Coding, Scripting/HTML & CSS & JavaScript/Random quote/JSON/quotes.json");
		httpRequest.send(null);
	}

	function readJSON() {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			console.log(JSON.parse(httpRequest.responseText));
		}
	}

})();