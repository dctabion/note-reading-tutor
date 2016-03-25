function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function areResourcesLoaded(resourceKey) {
  var allLoaded = false;
  var resources = flashApp.resources;

  // set resource loaded to true
  resources[resourceKey] = true;

  // Loop through all resources
  for (var key in resources) {
    // console.log("resources." + key + " :" + resources[key]);
    // if the current resource is still loading, stop the loop and return false
    if (resources[key] == false) {
      console.log(key + " is still loading...");
      return false;
    }
    console.log('All resources loaded!!');
    flashApp.els.resourcesLoaded.dispatchEvent(flashApp.misc.allLoadedEvent);
    // if it gets through the loop, then something all resources are loaded
    return true;
  }
}

function startGame() {
  console.log('startGame()');
  // Hide Loading Gif
  flashApp.els.loadingGifContainer.style.display = "none";

  if (flashApp.misc.inputsRegistered) {
    // Set inputMode
    flashApp.misc.inputMode = "MIDI";
  }
  else {
    flashApp.misc.inputMode = "keyboard";
    // Inform user to use computer keyboard for input
    $('#modal-no-midi-instrument').openModal();
  }

  // Wait for user to click to start game
  flashApp.els.statusMsg.innerHTML = "<br>Click here to start playing!";
  flashApp.els.statusMsg.addEventListener('click', startGameClick );
};


function startGameClick() {
  // User Clicked
  console.log('click');

  // register keyup listener if no MIDI
  if (flashApp.misc.inputMode == "keyboard") {
    $(document).on('keyup', function(event){
      console.log('got a keyup! event.keyCode=', event.keyCode);
      // lookup noteName
      // TODO fix this mapping of noteName
      var noteName = keyCodeToNoteName(event.keyCode);

      flashApp.soundfont.instrument.play(noteName,flashApp.soundfont.ctx.currentTime, 1);
      console.log('noteName: ' + noteName);
      flashApp.els.userNote.style.top = noteNameToPosition[noteName];
      flashApp.els.userNote.style.display = 'block';

      checkIfCorrectAnswer(noteName);
    });
  }

  flashApp.els.flashCard.style.display = "block";
  // create a new deck of cards
  flashApp.game.flashCards = allCards;
  console.log('Current Deck: ' + flashApp.game.flashCards);

  // initialize results object
  flashApp.game.results = {};
  for (var index in flashApp.game.flashCards) {
    flashApp.game.results[flashApp.game.flashCards[index]] = 0;
  }
  console.log('Results: ', flashApp.game.results);


  // Remove event listener
  flashApp.els.flashCard.removeEventListener('click', startGameClick);

  flashApp.els.statusMsg.innerHTML = "Play the notes, dood!";

  // Allow user input from MIDI device and set game into play mode
  flashApp.game.inProgress = true;

  // Display note
  flashApp.els.flashCardNote.style.display = 'block';

  // Choose a card from the deck and display
  getRandomCardAndDisplay();
};

function getRandomCardAndDisplay() {
  flashApp.game.currentCardIndex = getRandomInt(0, flashApp.game.flashCards.length);
  console.log('index: ' + flashApp.game.currentCardIndex + ' card: ' + flashApp.game.flashCards[flashApp.game.currentCardIndex]);
  flashApp.els.flashCardNote.style.top = noteNameToPosition[flashApp.game.flashCards[flashApp.game.currentCardIndex]];
}

// This checks if the answer is correct or not.
// update results for each card.
// discards and choose new card.
// when deck completed sends data to server to store
function checkIfCorrectAnswer(noteName) {
  // does it match the flash card?
  if (noteName == flashApp.game.flashCards[flashApp.game.currentCardIndex]) {
    console.log('correct!');
    flashApp.els.statusMsg.innerHTML = noteName.charAt(0) + " CORRECT!";

    // Let transition finish and continue processing correctAnswer logic
    flashApp.els.userNote.classList.add('correctAnswer');
    setTimeout(function() {
      console.log('got timeout');

      // Visual Feedback.  Do something cool!
      flashApp.els.userNote.classList.remove('correctAnswer');
      flashApp.els.userNote.style.display = "none";

      // Remove card from Deck
      flashApp.game.flashCards.splice(flashApp.game.currentCardIndex ,1);
      console.log('current cards: ' + flashApp.game.flashCards);
      if (flashApp.game.flashCards.length == 0)
      {
        // stop accepting MIDI input and evaluating answers
        flashApp.game.inProgress = false;

        // Display the results of the game
        // TODO Make pretty
        flashApp.els.statusMsg.innerHTML = "<br>DECK COMPLETED! GREAT JOB!!! Results:<BR>";
        for (var key in flashApp.game.results) {
          flashApp.els.statusMsg.innerHTML += key;
          flashApp.els.statusMsg.innerHTML += ':';
          flashApp.els.statusMsg.innerHTML += flashApp.game.results[key];
          flashApp.els.statusMsg.innerHTML += '  ';
        }
        // flashApp.els.statusMsg.innerHTML += "<br>results: " + flashApp.game.results;
        console.log(flashApp.game.results);
        // Send results to server if there logged in
        var username = document.getElementById('studentUsername').innerHTML;
        console.log('username from DOM: ', username);
        if( username != "") {
          console.log('someone signed in.  calling sendResults()');
          sendResults();
        }
      }
      // still more cards. Choose new card
      else{
        getRandomCardAndDisplay();
      }
    },1000);
  } // end correct answer

  // Wrong answer
  else {
    console.log('wrong!');

    // Tell user he/she is wrong
    flashApp.els.statusMsg.innerHTML = noteName.charAt(0) + " INCORRECT! <BR>Try again!";

    // Animate
    flashApp.els.userNote.classList.add('incorrectAnswer');
    setTimeout(function() {
      console.log('got timeout');
      flashApp.els.userNote.classList.remove('incorrectAnswer');
      flashApp.els.userNote.style.display = "none";
    } ,1000);


    var currentCard = flashApp.game.flashCards[flashApp.game.currentCardIndex];

    // increase number of wrong attempts in results
    flashApp.game.results[currentCard] = flashApp.game.results[currentCard] + 1;
  }

  console.log('results: ', flashApp.game.results);
}

function sendResults() {
  var studentData = {};
  studentData.studentUsername = document.getElementById('studentUsername').innerHTML;
  studentData.cards = flashApp.game.results;
  console.log('studentData: ');
  console.log(studentData);

  jsonStringStudentData = JSON.stringify(studentData);
  console.log('jsonString');
  console.log(jsonStringStudentData);

  // setup url for http or https to match server side
  var url = window.location.protocol + "//" + window.location.host + "/results/store"
  console.log('url: ' + url);
  // $('.spinner').show(); // <div class="spinner">...
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'text',
    // data: jsonStringStudentData,
    data: studentData,
    success: function(data) {
      console.log('resultSaved and got response from server! ',data);
    },
    error: function(err) {
      console.log('error: ', err);
    }
  });
}

function resultSaved(data) { console.log('resultSaved():', data); }


function keyCodeToNoteName(keyCode) {
  // figure out which range it is in upper or lower
  var currentCard = flashApp.game.flashCards[flashApp.game.currentCardIndex];
  console.log('currentCard: ', currentCard);
  if (  (currentCard == 'C4') ||
        (currentCard == 'D4') ||
        (currentCard == 'E4') ||
        (currentCard == 'F4') ||
        (currentCard == 'G4') ||
        (currentCard == 'A4') ||
        (currentCard == 'B4')   ) {
    console.log('card in lower range');
    mapping = keyCodeToNoteName4LowRangeCard;
  }
  else {
    console.log('card in upper range');
    mapping = keyCodeToNoteName4HiRangeCard
  }

  // resolve mapping of keycode to note name
  var selectedNoteName = mapping[keyCode];
  console.log('resolved mapping - selectedNoteName:', selectedNoteName);

  return selectedNoteName;
}
