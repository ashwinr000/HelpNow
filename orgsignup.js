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
  var usernameInput = document.getElementById("name").value
  var websiteInput = document.getElementById("website").value
  var db = firebase.firestore();
  var latitudeInput = localStorage.getItem("latitude")
  var longitudeInput = localStorage.getItem("longitude")
  firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput).then(function() {
  		db.collection("Organizations").add({
		    email: emailInput,
		    name: usernameInput,
		    website: websiteInput,
		    latitude: latitudeInput,
		    longitude: longitudeInput
		})
		.then(function(docRef) {
		    console.log("Document written with ID: ", docRef.id);
		       localStorage.setItem("name", usernameInput);
			   localStorage.setItem("email", emailInput);
			   localStorage.getItem("website", websiteInput)
			   localStorage.setItem("gtype", "Organization");
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
	});
  

}
