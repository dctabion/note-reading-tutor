// Setup Global Namespace ======================
var flashApp = flashApp || {};
flashApp.resources = {
  "soundfont": false,
  "midi": false
};
flashApp.currentCard = 0;

flashApp.els = flashApp.els || {};
flashApp.els.userNote = null;
flashApp.els.flashCardNote = null;
flashApp.els.theButton = null;
flashApp.soundfont = flashApp.soundfont || {};
flashApp.soundfont.ctx = null;
flashApp.soundfont.soundfont = null;
flashApp.soundfont.instrument = null;

flashApp.misc = flashApp.misc || {};

// Start Game App Here ======================
window.onload = function() {
  console.log('game.js is running!!');

  // Grab UI elements ============================
  flashApp.els.flashCard = document.getElementById('flashcard');
  flashApp.els.flashCardNote = document.getElementById('flashcardNote');
  flashApp.els.flashCardNote.style.display = 'none';
  flashApp.els.userNote = document.getElementById('userNote');
  flashApp.els.userNote.style.display = 'none';
  flashApp.els.statusMsg = document.getElementById('status_msg');
  flashApp.els.statusMsg.innerHTML = "Loading game.  Please wait...";

  // SETUP Listener to Start game when all resources loaded
  flashApp.misc.allLoadedEvent = new Event('allLoadedEvent');
  flashApp.els.resourcesLoaded = document.getElementById('resourcesLoaded');
  flashApp.els.resourcesLoaded.addEventListener('allLoadedEvent', startGame);

  // SETUP Soundfonts: playing instrumental sounds, aka soundfonts========================================
  setupSoundfont();

  // SETUP MIDI ========================================
  setupMidiAccess();

  // SETUP GAME ========================================
  // create a new deck of cards
  var flashcards = allCards;
  console.log(flashcards);

  // TODO remove this eventually
  // On click, generate a card and draw
  console.log(flashApp.els.flashCard);
  flashApp.els.flashCard.addEventListener('click', function(){
    console.log('click');
    flashApp.els.flashCardNote.style.display = 'block';

    var randCardIndex = getRandomInt(0, flashcards.length);
    flashApp.els.flashCardNote.style.top = noteNameToPosition[flashcards[randCardIndex]];
  });

};
