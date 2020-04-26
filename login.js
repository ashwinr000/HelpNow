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
	var volunteer = document.getElementById('volunteer');
	var organization = document.getElementById('organization');
	submit.onclick = function() {
        login();
    };
    volunteer.onclick = function() {
        volunteerSignup();
    };
    organization.onclick = function() {
    	organizationSignup();
    }
}

function organizationSignup() {
	window.location.href = "./orgsignup.html";
}


function volunteerSignup() {
	window.location.href = "./signup.html";
}

function login() {
  var passwordInput = document.getElementById("password").value
  var emailInput = document.getElementById("email").value
  var db = firebase.firestore();
  firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput).catch(function(error) {
	  // Handle Errors here.
	  console.log(error.code);
	  console.log(error.message);
	  // ...
	});
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
	        	window.location.href = "./welcome.html";
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
			        	window.location.href = "./welcome.html"
			        }
		        });
	    	})
	    }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}