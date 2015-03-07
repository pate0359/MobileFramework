// JavaScript Document
var pages = [],
	links = [];
var numLinks = 0;
var numPages = 0;
var pageTime = 800; //same as CSS transition

//create the pageShow type event.
var pageshow = document.createEvent("CustomEvent");
pageshow.initEvent("pageShow", false, true);

document.addEventListener("deviceready", function () { //deviceready,DOMContentLoaded
	//device ready listener
	document.addEventListener("scroll", handleScrolling, false);

	pages = document.querySelectorAll('[data-role="page"]');
	numPages = pages.length;
	links = document.querySelectorAll('[data-role="pagelink"]');
	numLinks = links.length;
	for (var i = 0; i < numLinks; i++) {
		links[i].addEventListener("click", handleNav, false);
	}
	//add the listener for pageshow to each page
	for (var p = 0; p < numPages; p++) {
		pages[p].addEventListener("pageShow", handlePageShow, false);
	}
	loadPage(null);

	//	var a = document.getElementById("svg-hp");
	//var b=a.contentDocument;
	//	var contact=$(b).find("#Capa_1");
	//	contact.attr("fill", "red");

});

function handleNav(ev) {
	ev.preventDefault();
	var href = ev.target.href;
	console.log(href);
	var parts = href.split("#");
	loadPage(parts[1]);
	return false;
}

function handlePageShow(ev) {
	ev.target.className = "active";
}

function loadPage(url) {
	if (url == null) {
		//home page first call
		pages[0].className = 'active';
		history.replaceState(null, null, "#home");
	} else {
		for (var i = 0; i < numPages; i++) {
			pages[i].className = "hidden";
			//get rid of all the hidden classes
			//but make them display block to enable anim.
			if (pages[i].id == url) {
				pages[i].className = "show";
				//add active to the proper page
				history.pushState(null, null, "#" + url);
				setTimeout(addDispatch, 50, i);
			}
		}
		//set the activetab class on the nav menu
		for (var t = 0; t < numLinks; t++) {
			links[t].className = "";
			if (links[t].href == location.href) {
				links[t].className = "activetab";
			}
		}
		
		if(url == "location")
		{
			getLocation();
			
		}else if(url == "contacts")
		{
			getContacts();
		}
	}
}

function addDispatch(num) {
	pages[num].dispatchEvent(pageshow);
	//num is the value i from the setTimeout call
	//using the value here is creating a closure
}


//For footer
function handleScrolling(ev) {
	var height = window.innerHeight;
	var offset = window.pageYOffset;
	var footHeight = 60;
	var footer = document.querySelector("#sticky");
	footer.style.position = "absolute";
	var total = height + offset - footHeight;
	footer.style.top = total + "px";
}