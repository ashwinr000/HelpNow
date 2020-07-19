
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=************&callback=initMap";
script.defer = true;
script.async = true;

var map;
var orgs = [];

window.onload = function() {	
	var firebaseConfig = {
		apiKey: "AIzaSyA7QoTTpqxBAJxlxzBkyFVOu6AgTuqaMW0",
		authDomain: "hacknow-abdfb.firebaseapp.com",
		databaseURL: "https://hacknow-abdfb.firebaseio.com",
		projectId: "hacknow-abdfb",
		storageBucket: "hacknow-abdfb.appspot.com",
		messagingSenderId: "170790274487",
		appId: "1:170790274487:web:6d9bc164cb85d82f029432"
	};
	firebase.initializeApp(firebaseConfig);
    document.head.appendChild(script);

    var db = firebase.firestore();
    db.collection("Organizations").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        	var olat = parseFloat(doc.data().latitude)
        	var olng = parseFloat(doc.data().longitude)
        	var glng = parseFloat(localStorage.getItem("longitude"))
        	var glat = parseFloat(localStorage.getItem("latitude"))
        	if (distance(olat, olng, glat, glng) < 20) {
        		orgs.push(doc.data())
        		addMarker({lat: olat, lng: olng}, map, doc.data().name + '<br></br>' + '<a style="text-decoration: none" href="./profile.html">Profile</a>')
        	}
        });
    })

    var search = document.getElementById("search");
    search.onclick = function() {
        goToSearch();
    };
}

function distance(lat1, lng1, lat2, lng2) {
	return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2))
}

function addMarker(position, map, content, org) {
	var marker = new google.maps.Marker({
	  	position: position, 
	  	map: map
  	});
  	var infoWindow = new google.maps.InfoWindow({
  		content: content
  	});
  	marker.addListener('click', function() {
      infoWindow.open(map, marker);
      for (var i = 0; i < orgs.length; i++) {
      	var org = orgs[i];
      	if ((parseFloat(org.latitude) == marker.getPosition().lat()) && (parseFloat(org.longitude) == marker.getPosition().lng())) {
      		localStorage.setItem("type", "Organization")
      		localStorage.setItem("selectedname", org.name)
      	}
      }
  	});
}

function initMap() {
  map = new google.maps.Map(
      document.getElementById('map'), {zoom: 8, center: {lat: parseFloat(localStorage.getItem("latitude")), lng: parseFloat(localStorage.getItem("longitude"))}});
}

function goToSearch() {
	window.location.href = "./search.html";
}
