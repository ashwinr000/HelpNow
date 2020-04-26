var requests = [];
var users = [];
var organizations = [];

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

	var db = firebase.firestore();
	db.collection("Requests").get().then(function(querySnapshot) {
	    querySnapshot.forEach(function(doc) {
	    	requests.push(doc.data())
	    });
	    db.collection("Users").get().then(function(querySnapshot) {
		    querySnapshot.forEach(function(doc) {
		    	if (doc.data().name != localStorage.getItem("name")) {
		    		users.push(doc.data())
		    	}
		    });
		    db.collection("Organizations").get().then(function(querySnapshot) {
			    querySnapshot.forEach(function(doc) {
			    	if (doc.data().name != localStorage.getItem("name")) {
			    		organizations.push(doc.data())
			    	}
			    });
		});
		});
	});

	var mode = "o";

	var u = document.getElementById("user");
	u.checked = false;
	u.onclick = function() {
		mode = "u";
		document.getElementById("Error").innerHTML = "";
		document.getElementById("title").innerHTML = "Search for Users";
		document.getElementById("Output").innerHTML = "";
	}

	var r = document.getElementById("reqs");
	u.checked = false;
	r.onclick = function() {
		mode = "r";
		document.getElementById("Error").innerHTML = "";
		document.getElementById("title").innerHTML = "Search for Requests";
		document.getElementById("Output").innerHTML = "";
	}

	var o = document.getElementById("orgs");
	o.checked = true;
	o.onclick = function() {
		mode = "o";
		document.getElementById("Error").innerHTML = "";
		document.getElementById("title").innerHTML = "Search for Organizations";
		document.getElementById("Output").innerHTML = "";
	}

	var submit = document.getElementById('Enter');
	submit.onclick = function() {
		document.getElementById("Output").innerHTML = ""
        filterSearch(document.getElementById("input").value, mode);
    };
    var map = document.getElementById("map");
    map.onclick = function() {
        goToMap();
    };
}

function goToMap() {
	if (localStorage.getItem("name") === null) {
		window.location.href = "./login.html";
	} else {
		window.location.href = "./maps.html";
	}
}

function filterSearch(input, mode) {
	var results = false;
	if (mode == "u") {
		for (var i = 0; i < users.length; i++) {
			var user = users[i]
			var lower = input.toLowerCase()
			//console.log(request.organization.indexOf(input));
			if (user.name.toLowerCase().indexOf(lower) > -1) {
				var node = document.createElement("LI");                
				var textnode = document.createTextNode(user.name);     
				node.appendChild(textnode);              
				document.getElementById("Output").appendChild(node); 
				var button = document.createElement("BUTTON");             
				var buttonText = document.createTextNode("Profile");     
				button.appendChild(buttonText);   
				button.addEventListener('click', useHandler, false);           
				document.getElementById("Output").appendChild(button);
				var hr = document.createElement("HR"); 
				document.getElementById("Output").appendChild(hr);	
				results = true;		
			}
		}
	} else if (mode == "r") {	
		for (var i = 0; i < requests.length; i++) {
			var request = requests[i]
			var lower = input.toLowerCase()
			//console.log(request.organization.indexOf(input));
			if ((request.description.toLowerCase().indexOf(lower) > -1) || (request.name.toLowerCase().indexOf(lower) > -1)) {
				var node = document.createElement("LI");              
				var textnode; 
				var button = document.createElement("BUTTON"); 
				var buttonText;       
				buttonText = document.createTextNode("GO");
				textnode = document.createTextNode(request.name + ": " + request.description + " - " + request.organization);       
				node.appendChild(textnode);              
				document.getElementById("Output").appendChild(node);
				button.appendChild(buttonText);   
				button.addEventListener('click', reqHandler, false);           
				document.getElementById("Output").appendChild(button);
				button.style = "margin-bottom: 10px";  
				var hr = document.createElement("HR"); 
				document.getElementById("Output").appendChild(hr);	
				results = true;		
			}
		}
	} else if (mode == "o") {
		for (var i = 0; i < organizations.length; i++) {
			var organization = organizations[i]
			var lower = input.toLowerCase()
			//console.log(request.organization.indexOf(input));
			if (organization.name.toLowerCase().indexOf(lower) > -1) {
				var node = document.createElement("LI");                
				var textnode; 
				var button = document.createElement("BUTTON");  
				var buttonText;  
				buttonText = document.createTextNode("Profile");
				textnode = document.createTextNode(organization.name);   
				node.appendChild(textnode);           
				document.getElementById("Output").appendChild(node);
				button.appendChild(buttonText);   
				button.addEventListener('click', orgHandler, false);           
				document.getElementById("Output").appendChild(button);	
				results = true;
				var hr = document.createElement("HR"); 
				document.getElementById("Output").appendChild(hr);	
			}
		}
	}
	if (!results) {
		document.getElementById("Error").innerHTML = "No Results";
	} else {
		document.getElementById("Error").innerHTML = "";
	}
}

function orgHandler(event) {
	var element = event.target;
	var children = document.getElementById("Output").childNodes
	for (var i = 0; i < children.length; i++) {
		if (children[i] == element) {
			var text = children[i - 1].innerHTML
			localStorage.setItem("selectedname", text);
			localStorage.setItem("type", "Organization");
			goToProfile();
		}
	}
}

function reqHandler(event) {
	var element = event.target;
	var children = document.getElementById("Output").childNodes
	for (var i = 0; i < children.length; i++) {
		if (children[i] == element) {
			var text = children[i - 1].innerHTML
			var split = text.split(":")[0];
			localStorage.setItem("requestname", split);
			goToRequest();
		}
	}
}

function useHandler(event) {
	var element = event.target;
	var children = document.getElementById("Output").childNodes
	for (var i = 0; i < children.length; i++) {
		if (children[i] == element) {
			var text = children[i - 1].innerHTML
			localStorage.setItem("selectedname", text);
			localStorage.setItem("type", "Volunteer");
			goToProfile();
		}
	}
}

function goToRequest() {
	window.location.href = "./requestpage.html";
}

function goToProfile() {
	window.location.href = "./profile.html";
}