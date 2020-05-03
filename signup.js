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

	localStorage.setItem("setAddress", false);

	var organization = document.getElementById('organization');
	var submit = document.getElementById('register');
	var login = document.getElementById('login');
	organization.onclick = function() {
        organizationSignup();
    };
	submit.onclick = function() {
		if (localStorage.getItem("setAddress") && (document.getElementById("password").value != "") && (document.getElementById("email").value != "") && (document.getElementById("username").value != "")) {
        	register();
		}
    };
    login.onclick = function() {
        goToLogin();
    };
}

function goToLogin() {
	window.location.href = "./login.html";
}

function organizationSignup() {
	window.location.href = "./orgsignup.html";
}

function register() {
	console.log("register");
  var latitudeInput = localStorage.getItem("latitude")
  var longitudeInput = localStorage.getItem("longitude")
  var passwordInput = document.getElementById("password").value
  var emailInput = document.getElementById("email").value
  var usernameInput = document.getElementById("username").value
  var db = firebase.firestore();

  firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput).then(function() {
	  	db.collection("Users").add({
		    email: emailInput,
		    name: usernameInput,
		    latitude: latitudeInput,
		    longitude: longitudeInput
		})
		.then(function(docRef) {
		    console.log("Document written with ID: ", docRef.id);
		    localStorage.setItem("name", usernameInput);
	   		localStorage.setItem("email", emailInput);
	   		localStorage.setItem("gtype", "Volunteer");
	   		window.location.href = "./welcome.html";
		})
		.catch(function(error) {
		    console.error("Error adding document: ", error);
		});
	})
  	.catch(function(error) {
	  // Handle Errors here.
	  console.log(error.code);
	  console.log(error.message);
	  switch (error.code) {
	  	case "auth/weak-password":
	  		document.getElementById("error").innerHTML = "Password must be at least 6 characters";
	  		break;
	  	case "auth/invalid-email":
	  		document.getElementById("error").innerHTML = "Email is invalid";
	  		break;
	  	case "auth/email-already-in-use":
	  		document.getElementById("error").innerHTML = "Email is already is use";
	  		break;
	  	default:
	  		break;
	  }
	  document.getElementById("error").style.display = "block";
	  // ...
	});
  
  
}