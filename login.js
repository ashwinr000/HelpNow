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

	var submit = document.getElementById('login');
	submit.onclick = function() {
        login();
    };
}


function login() {
  var passwordInput = document.getElementById("password").value
  var emailInput = document.getElementById("email").value
  var db = firebase.firestore();
  firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput).then(function() {
  	console.log("hello");
  	db.collection("Users").get().then(function(querySnapshot) {
    	var found = false;
        querySnapshot.forEach(function(doc) {
        	if (doc.data().email == emailInput) {
	        	var gusername = doc.data().name
	        	localStorage.setItem("name", gusername);
	        	var gemail = doc.data().email
			    localStorage.setItem("email", gemail);
	        	var glat = doc.data().latitude
	        	localStorage.setItem("latitude", glat);
	        	var glng = doc.data().longitude
	        	localStorage.setItem("longitude", glng);
	        	found = true;
	        	localStorage.setItem("gtype", "Volunteer");
	        	window.parent.location.href = "./welcome.html";
	        }
        });
        if (!found) {
	        db.collection("Organizations").get().then(function(querySnapshot) {
		        querySnapshot.forEach(function(doc) {
		        	if (doc.data().email == emailInput) {
			        	var gusername = doc.data().name
			        	localStorage.setItem("name", gusername);
			        	var gemail = doc.data().email
			        	localStorage.setItem("email", gemail);
			        	var glat = doc.data().latitude
			        	localStorage.setItem("latitude", glat);
			        	var glng = doc.data().longitude
			        	localStorage.setItem("longitude", glng);
			            found = true;
			            localStorage.setItem("gtype", "Organization");
			        	window.parent.location.href = "./welcome.html"
			        }
		        });
	    	})
	    }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }).catch(function(error) {
	  // Handle Errors here.
	  console.log(error.code);
	  console.log(error.message);
	  switch (error.code) {
	  	case "auth/user-not-found":
	  		document.getElementById("error").innerHTML = "No existing user";
	  		break;
	  	case "auth/wrong-password":
	  		document.getElementById("error").innerHTML = "Wrong password";
	  		break;
	  	default:
	  		break;
	  }
	  document.getElementById("error").style.display = "inline";
	  // ...
	});
    
}