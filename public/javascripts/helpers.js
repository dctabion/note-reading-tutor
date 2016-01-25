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
  flashApp.els.statusMsg.innerHTML += '<br>All resources loaded!  Let\' rock!';

  // Wait for user to click to start game
  flashApp.els.statusMsg.innerHTML += "<br>Click on the flashcard to start playing!";
  flashApp.els.flashCard.addEventListener('click', startGameClick );
};


function startGameClick() {
  // User Clicked
  console.log('click');

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

function checkIfCorrectAnswer(noteName) {
  // does it match the flash card?
  if (noteName == flashApp.game.flashCards[flashApp.game.currentCardIndex]) {
    console.log('correct!');
    flashApp.els.statusMsg.innerHTML = noteName + " CORRECT!";

    // Remove card from Deck
    flashApp.game.flashCards.splice(flashApp.game.currentCardIndex ,1);
    console.log('current cards: ' + flashApp.game.flashCards);
    if (flashApp.game.flashCards.length == 0)
    {
      // stop accepting MIDI input and evaluating answers
      flashApp.game.inProgress = false;

      // TODO Display results

      // TODO Send results to server

    }

    // Choose new card
    getRandomCardAndDisplay();

    // Choose new card
  }
  // Wrong answer
  else {
    console.log('wrong!');
    // TODO do something cool like shake and switch card
    // flashApp.els.userNote.classList.add('incorrectAnswer');
    // flashApp.els.userNote.style.fill = '#ace63c';
    // flashApp.els.userNote.addEventListener('transitioned', function() {
    // };
  // )

    flashApp.els.statusMsg.innerHTML = noteName + " is not the right note! <BR>Try again!";

    var currentCard = flashApp.game.flashCards[flashApp.game.currentCardIndex];
    // TODO update result object
    flashApp.game.results[currentCard] = flashApp.game.results[currentCard] + 1;
    console.log('results: ' + flashApp.game.results);
  }
}
