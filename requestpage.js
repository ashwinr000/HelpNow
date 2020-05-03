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
	var toggle = "open";
	var signupNames = [];
	var signupEmails = [];

	db.collection("Requests").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        	if (doc.data().name == localStorage.getItem("requestname")) {
        		document.getElementById("name").innerHTML = doc.data().name
        		document.getElementById("description").innerHTML = doc.data().description
        		document.getElementById("organization").innerHTML = doc.data().organization

        		if (doc.data().organization == localStorage.getItem("name")) {
        			document.getElementById("remove").style.display = "block";
        		} else {
        			document.getElementById("remove").style.display = "none";
        		}


        		var descriptorList = doc.data().descriptors
        		for (var key in descriptorList) {
        			var node = document.createElement("LI");                
					var textnode = document.createTextNode(key + ": " + descriptorList[key]);     
					node.appendChild(textnode);              
					document.getElementById("descriptors").appendChild(node); 
        		}
        		id = doc.id;

        		db.collection("Requests").doc(id).collection("Entries").get().then(function(querySnapshot) {
						var label = document.createElement("H3");	
						label.id = "label"   	
					    label.innerHTML = "Signups";
					    document.getElementById("signups").appendChild(label); 

					    querySnapshot.forEach(function(doc) {              
			              	signupEmails.push(doc.data().email);
			              	signupNames.push(doc.data().name);
							
				    	});
				    	if (signupNames.length == 0) {
				    		label.innerHTML = "No Signups";
				    	}
				    	if (document.getElementById("organization").innerHTML == localStorage.getItem("name")) {
				    		for (var i = 0; i < signupNames.length; i++) {
		        				var node = document.createElement("TR");             
					        	node.style = "text-align: left; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); height: 150px;";                            

								var sName;
								sName = document.createElement("P");
								sName.innerHTML = signupNames[i];
								sName.style = "display: block; font-size: 18px"; 

								var sEmail;
								sEmail = document.createElement("P");
								sEmail.innerHTML = signupEmails[i];
								sEmail.style = "display: block";           

								var button = document.createElement("BUTTON");             
								var buttonText = document.createTextNode("Profile");  
								button.style = "margin: 0 auto; position: absolute; display: block; margin-top: 10px";    
								button.appendChild(buttonText);   
								button.addEventListener('click', clickHandler, false);             

								node.appendChild(sName);
								node.appendChild(sEmail);
								node.appendChild(button); 


								document.getElementById("signups").appendChild(node);
							}
						} else if (localStorage.getItem("gtype") == "Volunteer") {
							document.getElementById("signup").style.display = "block";
							document.getElementById("label").innerHTML = ""
							if (signupNames.indexOf(localStorage.getItem("name")) > -1) {
								document.getElementById("signup").innerHTML = "Remove Signup"
							}
						}

				   }).catch(function(error) {
					    console.error("Error finding document: ", error);
					    document.getElementById("label").innerHTML = "No Signups";
					});
        		
        	}
	        	
        });
    })
	   
    var signup = document.getElementById('signup');
	signup.onclick = function() {
        requestSignup(id);
    }

    var remove = document.getElementById('remove');
	remove.onclick = function() {
        deleteRequest(id);
    }

    var profile = document.getElementById('profile');
	profile.onclick = function() {
		console.log("profile");
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
		var grandchildren = children[i].childNodes;
		for (var j = 0; j < grandchildren.length; j++) {
			if (grandchildren[j] == element) {
				var text = grandchildren[0].innerHTML
				localStorage.setItem("selectedname", text);
				localStorage.setItem("type", "Volunteer");
				goToProfile();
			}
		}
	}
}

function requestSignup(id) {
	var db = firebase.firestore();
	var mode = document.getElementById("signup").innerHTML;
	if (mode == "Signup") {
		db.collection("Requests").doc(id).collection("Entries").add({
		    email: localStorage.getItem("email"),
		    name: localStorage.getItem("name")
		})
		.then(function(docRef) {
		    console.log("Document written with ID: ", docRef.id);
		    document.getElementById("signup").innerHTML = "Remove Signup";
		})
		.catch(function(error) {
		    console.error("Error adding document: ", error);
		});
	} else {
		db.collection("Requests").doc(id).collection("Entries").get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				if (doc.data().name == localStorage.getItem("name")) {
					db.collection("Requests").doc(id).collection("Entries").doc(doc.id).delete().then(function() {
					    console.log("Document successfully deleted!");
					    document.getElementById("signup").innerHTML = "Signup";
					}).catch(function(error) {
					    console.error("Error removing document: ", error);
					});
				}
        	});
		});
	}
}

function deleteRequest(id) {
	db.collection("Requests").doc(id).delete().then(function() {
	    console.log("Document successfully deleted!");
	    window.location.href = "./profile.html";
	}).catch(function(error) {
	    console.error("Error removing document: ", error);
	});
}