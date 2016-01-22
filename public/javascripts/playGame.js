// delete this TODO

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

  // create a new deck of cards
  var flashcards = allCards;
  console.log(flashcards);

  // Setup flashcard display
  var flashcard = document.getElementById('flashcard');
  var flashcardNote = document.getElementById('flashcardNote');
  flashcardNote.style.display = 'none';
  var userNoteDisplayed = document.getElementById('userNoteDisplayed');
  userNoteDisplayed.style.display = 'none';

  // Setup game page
  var statusMsg = document.getElementById('status_msg');

  // Setup soundfonts
  setup_soundFont();


  // On click, generate a card and draw
  flashcard.addEventListener('click', function(){
    console.log('click');
    flashcardNote.style.display = 'block';

    var randCardIndex = getRandomInt(0, flashcards.length);
    flashcardNote.style.top = noteNameToPosition[flashcards[randCardIndex]];
  });

  // SETUP MIDI ========================================
  var midi, data, cmd, channel, type, note, velocity;

    // request MIDI access
  if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
          sysex: false
      }).then(onMIDISuccess, onMIDIFailure);
  } else {
      alert("No MIDI support in your browser.");
  }



};
