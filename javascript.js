console.log("this is connected");

$("#btn-submit").on("click", function(event) {
    event.preventDefault();
    console.log("button worked");
});


//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCBu27Q_2OJZZHRs4z_9CQUdy5pgf7i20U",
//     authDomain: "train-tracker-554a5.firebaseapp.com",
//     databaseURL: "https://train-tracker-554a5.firebaseio.com",
//     projectId: "train-tracker-554a5",
//     storageBucket: "train-tracker-554a5.appspot.com",
//     messagingSenderId: "199774892630"
//   };
//   firebase.initializeApp(config);

//   var database= firebase.database();

//   $("#submit").on("click", function() {
//       console.log("this works");
//   })