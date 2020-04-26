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
	if (localStorage.getItem("type") == "Volunteer") {
		db.collection("Users").get().then(function(querySnapshot) {
		    querySnapshot.forEach(function(doc) {
		    	if (doc.data().name == localStorage.getItem("selectedname")) {
					document.getElementById("Name").innerHTML = localStorage.getItem("selectedname")
					document.getElementById("Type").innerHTML = localStorage.getItem("type")
		        	document.getElementById("Email").innerHTML = doc.data().email

		        }
		    });
	    })
	} else {
		db.collection("Organizations").get().then(function(querySnapshot) {
		    querySnapshot.forEach(function(doc) {
		    	if (doc.data().name == localStorage.getItem("selectedname")) {
					document.getElementById("Name").innerHTML = localStorage.getItem("selectedname")
					document.getElementById("Type").innerHTML = localStorage.getItem("type")
		        	document.getElementById("Email").innerHTML = doc.data().email
		        }
		    });
		    db.collection("Requests").get().then(function(querySnapshot) {
		    	var hr = document.createElement("HR"); 
				document.getElementById("Requests").appendChild(hr);
			    querySnapshot.forEach(function(doc) {
			    	if (doc.data().organization == localStorage.getItem("selectedname")) {
			        	var node = document.createElement("LI");             
						var textnode = document.createTextNode(doc.data().name + ": " + doc.data().description);     
						node.appendChild(textnode);              
						document.getElementById("Requests").appendChild(node); 
						var button = document.createElement("BUTTON");             
						var buttonText = document.createTextNode("GO");     
						button.appendChild(buttonText);   
						button.addEventListener('click', clickHandler, false);           
						document.getElementById("Requests").appendChild(button)
						button.style = "margin-bottom: 10px";  
						var hr = document.createElement("HR"); 
						document.getElementById("Requests").appendChild(hr);
			        }
			    });
			    document.getElementById("requestsTitle").innerHTML = "Requests";
	    	})
	    })
	}

	var chat = document.getElementById('Chat');
	chat.onclick = function() {
        goToChat();
    };
   
}

function clickHandler(event) {
	var element = event.target;
	var children = document.getElementById("Requests").childNodes
	for (var i = 0; i < children.length; i++) {
		if (children[i] == element) {
			var text = children[i - 1].innerHTML
			var split = text.split(":")[0];
			localStorage.setItem("requestname", split);
			goToRequest();
		}
	}
}
function goToChat() {
	localStorage.setItem("selectedchat", localStorage.getItem("selectedname"))
	window.location.href = "./chatapp.html";
}

function goToRequest() {
	window.location.href = "./requestpage.html";
}