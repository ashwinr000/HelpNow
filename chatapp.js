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
	
	var send = document.getElementById('send');
	var load = document.getElementById('load');


	var chatId;
	var chatData;

	load.onclick = function() {
        var db = firebase.firestore();
		db.collection("Chats").get().then(function(querySnapshot) {
	        querySnapshot.forEach(function(doc) {
	        	var userTwo = doc.data().userTwo
	        	var userOne = doc.data().userOne
	        	var user1 = document.getElementById("person").value
	        	var user2 = localStorage.getItem("name")
	        	if (((userTwo == user2) && (userOne == user1)) || ((userOne == user2) && (userTwo == user1))) {
	        		var id = doc.id
	        		chatId = id
					db.collection("Chats").doc(id).collection("Entries").orderBy("timestamp").get().then(function(querySnapshot) {
						var users = []
						var messages = []
				        querySnapshot.forEach(function(doc) {
				        	var user = doc.data().user
				        	var message = doc.data().message
				        	var node = document.createElement("LI");                
							var textnode = document.createTextNode(user + ": " + message);     
							node.appendChild(textnode);              
							document.getElementById("chatbox").appendChild(node);  
				        
				        });
				    })
	        	}
	        });
	        if (chatId == null) {
			    db.collection("Chats").add({
				    userOne: localStorage.getItem("name"),
				    userTwo: document.getElementById("person").value
				}).then(function(docRef) {
					console.log("Document written with ID: ", docRef.id);
					chatId = docRef.id
				}).catch(function(error) {
				    console.error("Error adding document: ", error);
				});
	        }
	    })
	    
	};

    send.onclick = function() {
        sendMessage(chatId);
    };

    if (localStorage.getItem("selectedchat") != "") {
		document.getElementById("person").value = localStorage.getItem("selectedchat");
		localStorage.setItem("selectedchat", "");
		load.click();
	}
}


function sendMessage(id) {
    var db = firebase.firestore();
    var time = firebase.firestore.FieldValue.serverTimestamp();
	db.collection("Chats").doc(id).collection("Entries").add({
	    user: localStorage.getItem("name"),
	    message: document.getElementById("chat").value,
	    timestamp: time
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	    var node = document.createElement("LI");                
		var textnode = document.createTextNode(localStorage.getItem("name") + ": " + document.getElementById("chat").value);     
		node.appendChild(textnode);              
		document.getElementById("chatbox").appendChild(node); 
		var chat = document.getElementById("chatbox");
		chat.scrollTop = chat.scrollHeight
		document.getElementById("chat").value = "" 
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}