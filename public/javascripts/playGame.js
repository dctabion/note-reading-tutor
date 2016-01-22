// Setup Global Namespace
var flashApp = flashApp || {};
flashApp.resources = {
  "sound-font": false,
  "midi": false
};
flashApp.currentCard = 0;
flashApp.theButton = null;

flashApp.soundfont = flashApp.soundfont || {};
flashApp.soundfont.ctx = null;
flashApp.soundfont.soundfont = null;
flashApp.soundfont.instrument = null;


window.onload = function() {
  console.log('game.js is running!!');

  // Grab UI elements ============================
  var flashcard = document.getElementById('flashcard');
  var flashcardNote = document.getElementById('flashcardNote');
  flashcardNote.style.display = 'none';
  var userNoteDisplayed = document.getElementById('userNoteDisplayed');
  userNoteDisplayed.style.display = 'none';
  var statusMsg = document.getElementById('status_msg');
  statusMsg.innerHTML = "Loading game.  Please wait...";
  // SETUP Soundfonts ========================================
  // playing instrument sounds, aka soundfonts
  setup_soundFont();

  // SETUP MIDI ========================================
  // request MIDI access
  if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
          sysex: false
      }).then(onMIDISuccess, onMIDIFailure);
  } else {
      alert("No MIDI support in your browser.");
  }





  // SETUP GAME ========================================
  // create a new deck of cards
  var flashcards = allCards;
  console.log(flashcards);

  // TODO remove this eventually
  // On click, generate a card and draw
  flashcard.addEventListener('click', function(){
    console.log('click');
    flashcardNote.style.display = 'block';

    var randCardIndex = getRandomInt(0, flashcards.length);
    flashcardNote.style.top = noteNameToPosition[flashcards[randCardIndex]];
  });

};
