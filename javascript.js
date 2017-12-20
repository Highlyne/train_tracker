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
// check out moment(); to give you exact time and date 
  var clock = moment();


  var database= firebase.database();

  var name;
  var dest;
  var freq;
  var firsttr;

  $("#time_clock").text(clock);

  $("#btn-submit").on("click", function(event) {
      event.preventDefault();
      
      name = $("#trainName").val().trim();
      freq = $("#frequency").val().trim();
      dest = $("#arrLocation").val().trim();
      firsttr = $("#trainTime").val().trim();

    
      var train = {
        name: name,
        dest: dest,
        freq: freq,
        firsttr: firsttr
      }
      
      database.ref().push(train);

     $("#trainName").val("");
     $("#frequency").val("");
     $("#arrLocation").val("");
     $("#trainTime").val("");
  });

  database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    // var sv = snapshot.val();

    console.log(snapshot.val());

    var childName = snapshot.val().name;
    var childDestination = snapshot.val().dest;
    var childFrequency = snapshot.val().freq;
    var childFirstTrain = snapshot.val().firsttr;

    console.log(childDestination, childName, childFrequency, childFirstTrain);

    // Console.loging the last user's data
    // console.log(sv.name);
    // console.log(sv.dest);
    // console.log(sv.frequency);
    // console.log(sv.firstTrain);

    // Change the HTML to reflect
    $("#name").text(childName);
    $("#arvLoc").text(childDestination);
    $("#freq").text(childFrequency);


  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


