
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

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
