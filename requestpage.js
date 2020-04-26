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
	var id;

	db.collection("Requests").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        	if (doc.data().name == localStorage.getItem("requestname")) {
        		document.getElementById("name").innerHTML = doc.data().name
        		document.getElementById("description").innerHTML = doc.data().description
        		document.getElementById("organization").innerHTML = doc.data().organization
        		var descriptorList = doc.data().descriptors
        		for (var key in descriptorList) {
        			var node = document.createElement("LI");                
					var textnode = document.createTextNode(key + ": " + descriptorList[key]);     
					node.appendChild(textnode);              
					document.getElementById("descriptors").appendChild(node); 
        		}
        		id = doc.id;
        		if (doc.data().organization == localStorage.getItem("name")) {
        			document.getElementById("signup").innerHTML = "See Signups"
        		}
        	}
	        	
        });
    })

    var signup = document.getElementById('signup');
	signup.onclick = function() {
        requestSignup(id, signup.innerHTML == "Signup");
    }

    var profile = document.getElementById('profile');
	profile.onclick = function() {
		localStorage.setItem("selectedname", document.getElementById("organization").innerHTML);
		localStorage.setItem("type", "Organization");
        goToProfile();
    }
}


function goToProfile() {
	window.location.href = "./profile.html";
}

function clickHandler(event) {
	var element = event.target;
	var children = document.getElementById("signups").childNodes
	for (var i = 0; i < children.length; i++) {
		if (children[i] == element) {
			var text = children[i - 1].innerHTML
			var split = text.split(":")[0];
			localStorage.setItem("selectedname", split);
			localStorage.setItem("type", "Volunteer");
			goToProfile();
		}
	}
}

function requestSignup(id, mode) {
	var db = firebase.firestore();
	if (mode) {
		db.collection("Requests").doc(id).collection("Entries").add({
		    email: localStorage.getItem("email"),
		    name: localStorage.getItem("name")
		})
		.then(function(docRef) {
		    console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
		    console.error("Error adding document: ", error);
		});
	} else {
		db.collection("Requests").doc(id).collection("Entries").get().then(function(querySnapshot) {
			var label = document.createElement("H3");	
			label.id = "label"    	
		    var labelnode = document.createTextNode("Signups"); 
		    label.appendChild(labelnode); 
		    document.getElementById("signups").appendChild(label); 
		    querySnapshot.forEach(function(doc) {
		    	var node = document.createElement("LI");             
				var textnode = document.createTextNode(doc.data().name + ": " + doc.data().email);     
				node.appendChild(textnode);              
				document.getElementById("signups").appendChild(node);
				var button = document.createElement("BUTTON");             
				var buttonText = document.createTextNode("See Profile");     
				button.appendChild(buttonText);   
				button.addEventListener('click', clickHandler, false);           
				document.getElementById("signups").appendChild(button); 
	    	});
	    })
		.then(function(docRef) {
		    console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
		    console.error("Error adding document: ", error);
		    document.getElementById("label").innerHTML = "No Signups";
		});
	}
}