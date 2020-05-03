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

	var title = document.getElementById("requestsTitle");
	var db = firebase.firestore();
	console.log(localStorage.getItem("selectedname"));
	if (localStorage.getItem("type") == "Volunteer") {
		title.innerHTML = "";
		db.collection("Users").get().then(function(querySnapshot) {
		    querySnapshot.forEach(function(doc) {
		    	if (doc.data().name == localStorage.getItem("selectedname")) {
					document.getElementById("Name").innerHTML = localStorage.getItem("selectedname")
					document.getElementById("Type").innerHTML = localStorage.getItem("type")
		        	document.getElementById("Email").innerHTML = doc.data().email

		        }
		    });
		    db.collection("Requests").get().then(function(querySnapshot) {
			    querySnapshot.forEach(function(doc) {
			    	var request = doc.data();
			    	var ref = firebase.firestore().collection("Requests").doc(doc.id).collection("Entries");
			    	ref.get().then(function(querySnapshot) {
					    querySnapshot.forEach(function(doc) {
					    	if (doc.data().name == localStorage.getItem("name")) {

					        	var node = document.createElement("TR");              
					        	node.style = "text-align: left; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";                            

								var reqName;
								reqName = document.createElement("P");
								reqName.innerHTML = request.name;
								reqName.style = "display: block; font-size: 18px"; 

								var reqDes;
								reqDes = document.createElement("P");
								reqDes.innerHTML = request.description;
								reqDes.style = "display: block";
		     

								var button = document.createElement("BUTTON");             
								var buttonText = document.createTextNode("More Info");  
								button.style = "margin-bottom: 15px";    
								button.appendChild(buttonText);   
								button.addEventListener('click', clickHandler, false);  

								
								node.appendChild(reqName); 
								node.appendChild(reqDes);
								node.appendChild(button); 


								document.getElementById("Requests").appendChild(node);
					        }
			    		});
			    
	    			})
			    });
			    document.getElementById("requestsTitle").innerHTML = "Signups";
	    	})
	    })
	} else {
		db.collection("Organizations").get().then(function(querySnapshot) {
		    querySnapshot.forEach(function(doc) {
		    	if (doc.data().name == localStorage.getItem("selectedname")) {
					document.getElementById("Name").innerHTML = localStorage.getItem("selectedname")
					document.getElementById("Type").innerHTML = localStorage.getItem("type")
		        	document.getElementById("Email").innerHTML = doc.data().email
		        	var node = document.createElement("TR"); 
		        	var label = document.createElement("TH");
		        	var link = document.createElement("A");
		        	label.style = "background-color:#dddddd; width:70px; text-align:center"
		        	label.innerHTML = "Website";
		        	var website = document.createElement("TH");
		        	link.href = doc.data().website;
		        	link.innerHTML = doc.data().website;
		        	website.appendChild(link);

		        	node.appendChild(label);
					node.appendChild(website);
					document.getElementById("info").appendChild(node);

		        }
		    });
		    db.collection("Requests").get().then(function(querySnapshot) {
			    querySnapshot.forEach(function(doc) {
			    	if (doc.data().organization == localStorage.getItem("selectedname")) {
			    		var request = doc.data();

			        	var node = document.createElement("TR");              
			        	node.style = "text-align: left; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";                            

						var reqName;
						reqName = document.createElement("P");
						reqName.innerHTML = request.name;
						reqName.style = "display: block; font-size: 18px"; 

						var reqDes;
						reqDes = document.createElement("P");
						reqDes.innerHTML = request.description;
						reqDes.style = "display: block";
     

						var button = document.createElement("BUTTON");             
						var buttonText = document.createTextNode("More Info");  
						button.style = "margin-bottom: 15px";    
						button.appendChild(buttonText);   
						button.addEventListener('click', clickHandler, false);  

						
						node.appendChild(reqName); 
						node.appendChild(reqDes);
						node.appendChild(button); 


						document.getElementById("Requests").appendChild(node);
			        }
			    });
			    document.getElementById("requestsTitle").innerHTML = "Requests";
	    	})
	    })
	}

   
}

function clickHandler(event) {
	var element = event.target;
	var children = document.getElementById("Requests").childNodes;
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
function goToChat() {
	localStorage.setItem("selectedchat", localStorage.getItem("selectedname"))
	window.location.href = "./chatapp.html";
}

function goToRequest() {
	window.location.href = "./requestpage.html";
}