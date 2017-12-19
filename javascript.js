console.log("this is connected");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCBu27Q_2OJZZHRs4z_9CQUdy5pgf7i20U",
    authDomain: "train-tracker-554a5.firebaseapp.com",
    databaseURL: "https://train-tracker-554a5.firebaseio.com",
    projectId: "train-tracker-554a5",
    storageBucket: "train-tracker-554a5.appspot.com",
    messagingSenderId: "199774892630"
  };

  firebase.initializeApp(config);

  var database= firebase.database();

  var name ="";
  var dest ="";
  var freq = "";
  var firstTr ="";

  $("#btn-submit").on("click", function(event) {
      event.preventDefault();
      
      name = $("#trainName").val()
      freq = $("#frequency").val();
      dest = $("#arrLocation").val();
      firstTr = $("#trainTime").val();
      console.log("freq works" + freq);
      console.log("dest works" + dest);

      database.ref().push( {
          trainName: name,
          destination: dest,
          frequency: freq,
          firstTrain: ftrain
      });
  });

  // database.ref().on("value", function(snapshot){

  //   $("#name").text(snapshot.val().trainName);
  //   $("#depLoc").text(snapshot.val().departure);
  //   $("#arvLoc").text(snapshot.val().arrival);
  // })
 

