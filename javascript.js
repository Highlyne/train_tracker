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
    // $("#name").append(childName);
    // $("#arvLoc").append(childDestination);
    // $("#freq").append(childFrequency);


    //Parse the frequency "string" into an integer | Obtain current time & log
    var frequency = parseInt(childFrequency);
    console.log("Current Time: " + moment().format('HH:mm'));

    //Converting time of new train (firstTrain) and retrieving current time and converting it to miltary format (HH:mm) and logging the results
    var dateConvert = moment(snapshot.val().firsttr, 'HH:mm').subtract(1, 'years');
    console.log("Date converted: " + dateConvert);
    var trainTime = moment(dateConvert).format('HH:mm');
    console.log("Train Time : " + trainTime);

    //Calculating difference between the two times
    var timeConvert = moment(trainTime, 'HH:mm').subtract(1, 'years');
    var timeDiff = moment().diff(moment(timeConvert), 'minutes');
    console.log("Difference in Times: " + timeDiff);

    //Using Modulus % to calculate the remainder
    var timeRemain = timeDiff % frequency;
    console.log("First Train arrives: " + timeRemain);

    //Frequency minus timeRemain (modulus) yeilds minutes until arrival
    var minutesAway = frequency - timeRemain;
    console.log("Minutes until next Train: " + minutesAway);

    //Adding minutes away to the current time to project the trains arrival time and console logs the result in military format
    var firstTrain = moment().add(minutesAway, 'minutes');
    console.log("Arrival time: " + moment(firstTrain).format('HH:mm'));

    //Appending new dataset to the HTML table
    $("table").append(
      
      "<tr><td>" + childName + 
     "</td><td>" + childDestination +
      "</td><td>" + childFrequency +
      "</td><td id='next'>" + moment(firstTrain).format("HH:mm") +
      "</td><td id='minAway'>" + minutesAway + ' minutes until arrival' + "</td></tr>"
      );
  }, 
  
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


