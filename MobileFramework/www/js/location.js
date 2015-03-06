var errorDiv;
function getLocation() {

	//Create container div
//	 output = document.querySelector(".mapDiv");

	//if browser does not support geolocation API
	if (!navigator.geolocation) {
		//Error message pop up
		errorDiv = document.querySelector("#err_dialog");
		if (!errorDiv) {
			errorDiv = document.createElement("div");
			errorDiv.setAttribute("id", "err_dialog");
			document.body.appendChild(errorDiv);
		}
		errorDiv.style.display = 'block';
		errorDiv.innerHTML = "Sorry, but your browser does not support location based awesomeness.";
		//set timeout for error msg
		setTimeout(function () {
			errorDiv.style.display = 'none';
		}, 3000); //3secs

		return;
	}

	//got the location
	function success(position) {
		alert("sucess");
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		document.querySelector("#locating").innerHTML = "";

		//Draw Image
		canvas = document.querySelector(".canvas");
		if (!canvas) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("class", "canvas");
			//			canvas.style="width: 400px";
			document.querySelector('.mapDiv').appendChild(canvas);
		}

		canvas.style.width = "500px";
		canvas.style.height = "500px";
		var ctx = canvas.getContext('2d');
		var img = new Image();
		img.onload = function () {
			ctx.drawImage(img, 0, 0);
		};

		img.src = "http://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAUJk9mE7hkcvE0qnQFtWYuKUuxmJkPZMc&center=" + latitude + "," + longitude + "&zoom=14&size=400x400&sensor=false&markers=color:orange%7Clabel:N%7C" + latitude + "," + longitude + "";

	};

	//Error while getting location
	function error(err) {
		alert('ERROR(' + err.code + '): ' + err.message);
		document.querySelector("#locating").innerHTML = "";
		errorDiv = document.querySelector("#err_dialog");
		if (!errorDiv) {
			errorDiv = document.createElement("div");
			errorDiv.setAttribute("id", "err_dialog");
			document.body.appendChild(errorDiv);
		}
		errorDiv.style.display = 'block';
		errorDiv.innerHTML = "Unable to retrieve your location.";

		//set timeout for error msg
		setTimeout(function () {
			errorDiv.style.display = 'none';
		}, 3000); //3secs

	};
	var params = {
			enableHighAccuracy: true,
			timeout: 5000,
			}
		//get current position
	navigator.geolocation.getCurrentPosition(success, error, params);
}