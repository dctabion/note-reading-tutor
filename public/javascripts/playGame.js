// delete this TODO
var tone;
var ctx, soundfont, instrument;
var theButton;
var currentCard;


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

  // Setup soundfonts
  ctx = new AudioContext();
  soundfont = new Soundfont(ctx);
  // instrument = soundfont.instrument('music_box');
  instrument = soundfont.instrument('acoustic_grand_piano');
  theButton = document.getElementById('soundfontTestButton');

  // when instrument is loaded
  instrument.onready(function(){
    // TODO click to play!!
    console.log('ready!!')
    setTestButtonTones(theButton, instrument, ctx);
  });

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
