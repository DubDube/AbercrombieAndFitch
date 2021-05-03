function validateResponse(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

function readResponseAsJSON(response) {
	return response.json();
}


function readResponseAsBlob(response) {
	return response.blob;
}
const container = document.getElementById('img-container');
//   function showImage(responseAsBlob) {
//     const container = document.getElementById('img-container');
//     const imgElem = document.createElement('img');
//     container.appendChild(imgElem);
//     const imgUrl = URL.createObjectURL(responseAsBlob);
//     imgElem.src = imgUrl;
//   }

// Fetch JSON ----------

function fetchJSON() {
	fetch('https://5dc588200bbd050014fb8ae1.mockapi.io/assessment')

		.then(validateResponse)
		.then(readResponseAsJSON)
		//   .then(element => {
		//     container.innerHTML = `<img src="${element.avatar}"/>`
		//   })
		// .then(showImage)
		.then(logResult = (result) => {

			var source = document.getElementById("entry-template").innerHTML;
			var template = Handlebars.compile(source);
			var newArray = result;
			var testArray = newArray
			var html = template(testArray.map(element => {
				return element.id + '  ' + element.name + '  ' + element.createdAt;
			}))


			document.getElementById("greetings").innerHTML = html;

			console.log('testArray', html);
		})

}

const jsonButton = document.getElementById('button');
jsonButton.addEventListener('click', fetchJSON);