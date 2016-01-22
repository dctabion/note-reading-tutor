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

// Start Game App Here ======================
window.onload = function() {
  console.log('game.js is running!!');

  // Grab UI elements ============================
  var flashcard =document.getElementById('flashcard');
  flashApp.els.flashCardNote = document.getElementById('flashcardNote');
  flashApp.els.flashCardNote.style.display = 'none';
  flashApp.els.userNote = document.getElementById('userNote');
  flashApp.els.userNote.style.display = 'none';
  var statusMsg = document.getElementById('status_msg');
  statusMsg.innerHTML = "Loading game.  Please wait...";

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
  flashcard.addEventListener('click', function(){
    console.log('click');
    flashApp.els.flashCardNote.style.display = 'block';

    var randCardIndex = getRandomInt(0, flashcards.length);
    flashApp.els.flashCardNote.style.top = noteNameToPosition[flashcards[randCardIndex]];
  });

};
