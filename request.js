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

	var post = document.getElementById('post');
	post.onclick = function() {
        postRequest();
    }

    var descriptor = document.getElementById('add');
	descriptor.onclick = function() {
        addDescriptor();
    }

}

function addDescriptor() {
	var name = document.createElement("INPUT");   
	name.type = "text";   
	name.placeholder = "Descriptor Name" 
	name.style = "margin: 0 auto; border-radius: 5px; height: 30px; width: 300px; font-size: 16px; display:block; margin-top: 5px; margin-bottom: -10px"
	var textnode = document.createTextNode("");     
	name.appendChild(textnode); 

	var lineBreak = document.createElement("BR");

	var info = document.createElement("TEXTAREA");   
	info.type = "text";        
	info.rows = "4"; 
	info.cols = "30"; 
	info.style = "margin-bottom: 15px"
	info.placeholder = "Descriptor Value"
	var textnode = document.createTextNode("");     
	info.appendChild(textnode)            

	document.getElementById("descriptors").appendChild(name); 
	document.getElementById("descriptors").appendChild(lineBreak); 
	document.getElementById("descriptors").appendChild(info);  
}


function postRequest() {
  var dict = {}
  var descriptionInput = document.getElementById("description").value
  var nameInput = document.getElementById("name").value
  var children = document.getElementById("descriptors").childNodes
  for (var i = 0; i < children.length; i += 3) {
  	dict[children[i].value] = children[i + 2].value
  }
  var db = firebase.firestore();
  db.collection("Requests").add({
	    organization: localStorage.getItem("name"),
	    name: nameInput,
	    description: descriptionInput,
	    descriptors: dict
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});

}