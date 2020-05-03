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
		    	users.push(doc.data());
		    });
		    db.collection("Organizations").get().then(function(querySnapshot) {
			    querySnapshot.forEach(function(doc) {
			    	organizations.push(doc.data());
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
		var login = document.createElement("IFRAME");             
	      login.style = "position: absolute; top: 50px; right: 0px; width: 280px; height: 210px;"
	      login.frameBorder = "0"
	      login.src = "./loginpopup.html"
	      login.id = "popup";
	      localStorage.setItem("loginpopup", "open");             
	      document.body.appendChild(login);
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
				var node = document.createElement("TR");    
				node.style = "text-align: left; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); height: 120px;";                            
 
				var desText;
				desText = document.createElement("P");
				desText.innerHTML = user.name;
				desText.style = "font-size: 18px; display: block"; 
 
				var button = document.createElement("BUTTON");             
				var buttonText = document.createTextNode("Profile");
				button.style = "margin: 0 auto; position: absolute; display: block; margin-top: 10px"; 
				button.appendChild(buttonText);   
				button.addEventListener('click', useHandler, false); 

				node.appendChild(desText); 
				node.appendChild(button);

				document.getElementById("Output").appendChild(node);
				results = true;		
			}
		}
	} else if (mode == "r") {	
		for (var i = 0; i < requests.length; i++) {
			var request = requests[i]
			var lower = input.toLowerCase()
			//console.log(request.organization.indexOf(input));
			if ((request.description.toLowerCase().indexOf(lower) > -1) || (request.name.toLowerCase().indexOf(lower) > -1)) {
				var node = document.createElement("TR");  
				node.style = "text-align: left; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); height: 200px;";                            
				
				var reqText;
				reqText = document.createElement("P");
				reqText.innerHTML = request.name;
				reqText.style = "font-size: 18px; display: block";        

				var desText;
				desText = document.createElement("P");
				desText.innerHTML = request.description;
				desText.style = "display: block"; 

				var orgText;
				orgText = document.createElement("P");
				orgText.innerHTML = request.organization;
				orgText.style = "display: block";   

				var button = document.createElement("BUTTON"); 
				button.style = "margin-bottom: 15px"; 
				var buttonText;       
				buttonText = document.createTextNode("More Info");
				button.appendChild(buttonText); 
				
				node.appendChild(reqText);
				node.appendChild(desText);
				node.appendChild(orgText); 
				node.appendChild(button); 

				document.getElementById("Output").appendChild(node);  
				button.addEventListener('click', reqHandler, false);            
				results = true;		
			}
		}
	} else if (mode == "o") {
		for (var i = 0; i < organizations.length; i++) {
			var organization = organizations[i]
			var lower = input.toLowerCase()
			//console.log(request.organization.indexOf(input));
			if (organization.name.toLowerCase().indexOf(lower) > -1) {
				var node = document.createElement("TR");
				node.style = "text-align: left; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); height: 110px";                
				
				var orgText;
				orgText = document.createElement("P");
				orgText.innerHTML = organization.name;
				orgText.style = "display: block"; 

				var button = document.createElement("BUTTON"); 
				button.style = "margin-top: 10px"; 
				var buttonText;  
				buttonText = document.createTextNode("Profile");
				button.appendChild(buttonText);  

				node.appendChild(orgText);
				node.appendChild(button);           
				document.getElementById("Output").appendChild(node);  
				button.addEventListener('click', orgHandler, false);           	
				results = true;
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
		var grandchildren = children[i].childNodes;
		for (var j = 0; j < grandchildren.length; j++) {
			if (grandchildren[j] == element) {
				var text = grandchildren[0].innerHTML
				localStorage.setItem("selectedname", text);
				localStorage.setItem("type", "Organization");
				goToProfile();
			}
		}
	}
}

function reqHandler(event) {
	var element = event.target;
	var children = document.getElementById("Output").childNodes;
	for (var i = 0; i < children.length; i++) {
		var grandchildren = children[i].childNodes;
		for (var j = 0; j < grandchildren.length; j++) {
			if (grandchildren[j] == element) {
				var text = grandchildren[0].innerHTML
				localStorage.setItem("requestname", text);
				goToRequest();
			}
		}
	}
}

function useHandler(event) {
	var element = event.target;
	var children = document.getElementById("Output").childNodes
	for (var i = 0; i < children.length; i++) {
		var grandchildren = children[i].childNodes;
		for (var j = 0; j < grandchildren.length; j++) {
			if (element == grandchildren[j]) {
				var text = grandchildren[0].innerHTML
				localStorage.setItem("selectedname", text);
				localStorage.setItem("type", "Volunteer");
				goToProfile();
			}
		}
	}
}

function goToRequest() {
	window.location.href = "./requestpage.html";
}

function goToProfile() {
	window.location.href = "./profile.html";
}