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
	var submit = document.getElementById('register');
	var login = document.getElementById('login');
	var volunteer = document.getElementById('volunteer');
	volunteer.onclick = function() {
        volunteerSignup();
    };
	submit.onclick = function() {
        register();
    };
    login.onclick = function() {
        goToLogin();
    };
}

function volunteerSignup() {
	window.location.href = "./signup.html";
}

function goToLogin() {
	window.location.href = "./login.html";
}

function register() {
  var passwordInput = document.getElementById("password").value
  var emailInput = document.getElementById("email").value
  var nameInput = document.getElementById("name").value
  var latitudeInput = localStorage.getItem("latitude")
  var longitudeInput = localStorage.getItem("longitude")
  firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput).catch(function(error) {
	  // Handle Errors here.
	  console.log(error.code);
	  console.log(error.message);
	  // ...
	});
  var db = firebase.firestore();
  db.collection("Organizations").add({
	    email: emailInput,
	    name: nameInput,
	    latitude: latitudeInput,
	    longitude: longitudeInput
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
   localStorage.setItem("name", usernameInput);
   localStorage.setItem("email", emailInput);
   localStorage.setItem("gtype", "Organization");
   window.location.href = "./welcome.html";
}
