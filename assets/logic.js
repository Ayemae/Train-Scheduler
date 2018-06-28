$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBGc3h8wIEe8pFHimbGmEYKYjZB0itfFUQ",
        authDomain: "a-fb-project-name.firebaseapp.com",
        databaseURL: "https://a-fb-project-name.firebaseio.com",
        projectId: "a-fb-project-name",
        storageBucket: "a-fb-project-name.appspot.com",
        messagingSenderId: "702052130023"
    };
    firebase.initializeApp(config);


    var database = firebase.database();
    var trainNo = 0;

    $("#submit-train").on("click", function (event) {
        event.preventDefault();

        var subTrName = $("#train-name").val().trim();
        var subTrDest = $("#destination").val().trim();
        var subTrOrig = $("#first-arrival").val().trim();
        var subTrFreq = $("#freq").val().trim();

        if ((!subTrName) || (!subTrDest) || (!subTrOrig) || (!subTrFreq)) {
            alert("Not a valid entry.");
        } else {

            var newTrain = {
                name: subTrName,
                destination: subTrDest,
                origin: subTrOrig,
                frequency: subTrFreq
            };

            database.ref().push(newTrain);


            $("#train-name").val("");
            $("#destination").val("");
            $("#first-arrival").val("");
            $("#freq").val("");
        } // end if variables exist

    }); // end onclick submit-train


    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var trName = childSnapshot.val().name;
        var trDest = childSnapshot.val().destination;
        var trOrig = childSnapshot.val().origin;
        var trFreq = childSnapshot.val().frequency;

        console.log("Current time: " + moment().format("hh:mm"));

        var cleanOrig = moment(trOrig, "HH:mm").subtract(1, "years");
        console.log("Formatted First Arrival Time: " + cleanOrig);
        var timeDiff = moment().diff(moment(cleanOrig), "minutes");
        console.log("Time Difference: " + timeDiff + " minutes");
        var divisible = timeDiff % trFreq;
        console.log("Freq Div: " + divisible)
        var trMins = trFreq - divisible;
        var trNext = moment().add(trMins, "minutes").format("hh:mm");


        var trainTable = $("#train-table");

        trainTable.append($("<div class='table-cell'>").text(trName));
        console.log("Name: " + trName)
        trainTable.append($("<div class='table-cell'>").text(trDest));
        console.log("Destination: " + trDest)
        trainTable.append($("<div class='table-cell'>").text(trFreq));
        console.log("Freq: " + trFreq)
        trainTable.append($("<div class='table-cell'>").text(trNext));
        console.log("Next Arrival: " + trName)
        trainTable.append($("<div class='table-cell'>").text(trMins));
        console.log("Minutes Away: " + trName)
        

    }); //end database on child_added



}); // end document ready