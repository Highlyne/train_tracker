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
// moment js gives exact time
  var clock = moment().format('LLLL');


  var database= firebase.database();

  // I console logged this vars out so I can define the below; trying to get trName to show
  var trName;
  var dest;
  var freq;
  var firsttr;

  // putting time on the front page
  $("#time_clock").text(clock);

  // Everything I want to happen when the submit button is clicked
  $("#btn-submit").on("click", function(event) {
      event.preventDefault();
      
      //very strange that the trainName and frequency is not picking up during click of btn
      trName = $("#trnName").val().trim();
      freq = $("#frequency").val().trim();
      //dest and firsttr does pick up and shows in the console log when submit btn is clicked
     dest = $("#arrLocation").val().trim();
      firsttr = $("#trainTime").val().trim();
      console.log("looking for train name: " + trName);
      console.log("I really need to see " + freq);

      var train = {
        trName: trName,
        dest: dest,
        freq: freq,
        firsttr: firsttr
      }
      
      database.ref().push(train);
// This will clear my form fields after btn has been clicked
     $("#trnName").val("");
     $("#frequency").val("");
     $("#arrLocation").val("");
     $("#trainTime").val("");
  });

  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
//Everything in the object console logs except for the train name and freq
    var childName = snapshot.val().trName;
    var childDestination = snapshot.val().dest;
    var childFrequency = snapshot.val().freq;
    var childFirstTrain = snapshot.val().firsttr;

    console.log(childDestination, childName, childFrequency, childFirstTrain);

    //none of this below works properly now that freq will not git picked up from the click of the button

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

    //Appending new data to the HTML table
    $("table").append(
      
      "<tr><td>" + childName + 
     "</td><td>" + childDestination +
      "</td><td>" + childFrequency +
      "</td><td id='next'>" + moment(firstTrain).format("HH:mm") +
      "</td><td id='minAway'>" + minutesAway + ' minutes until arrival' + "</td></tr>"
      );
  }, 
  // run this to log out any errors
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


