// delete this TODO
var tone;

window.onload = function() {
  console.log('game.js is running!!');
  testHelper();

  // delete this TODO
  var tone;

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
  var ctx = new AudioContext();
  var soundfont = new Soundfont(ctx);
  var theButton = document.getElementById('soundfontTestButton');
  var instrument = soundfont.instrument('music_box');

  // Play notes
  instrument.onready(function(){
    // instrument.play('C3',0, 1);
    console.log('ready!!')
    theButton.onclick = function(){
      console.log('click!');
      instrument.play('C3',ctx.currentTime, 5);
      instrument.play('G3',ctx.currentTime+0.1, 5);
      instrument.play('D4',ctx.currentTime+0.2, 5);
      instrument.play('Eb4',ctx.currentTime+0.3, 5);
      instrument.play('Bb4',ctx.currentTime+0.4, 5);
      instrument.play('F5',ctx.currentTime+0.5, 5);
      instrument.play('D6',ctx.currentTime+0.6, 5);
    };
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

  // midi functions
  function onMIDISuccess(midiAccess) {
      // when we get a succesful response, run this code
      midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

      var inputs = midi.inputs.values();
      // loop over all available inputs and listen for any MIDI input
      for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
          // each time there is a midi message call the onMIDIMessage function
          input.value.onmidimessage = onMIDIMessage;
      }
  }

  function onMIDIFailure(e) {
      // when we get a failed response, run this code
      log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
  }

  function onMIDIMessage(message) {
    data = event.data,
    cmd = data[0] >> 4,
    channel = data[0] & 0xf,
    type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
    note = data[1],
    velocity = data[2];

    switch(type){
        case 144: // noteOn message
            noteOn(note, velocity);
            break;
        case 128: // noteOff message
            noteOff(note, velocity);
            break;
    }
    logger('MIDI data', data);
  }

  function logger(label, data) {
      data = data || null;
      messages = label + " [channel: " + (data[0] & 0xf) + ", cmd: " + (data[0] >> 4) + ", type: " + (data[0] & 0xf0) + " , note: " + data[1] + " , velocity: " + data[2] + "]";
      console.log(messages);
  }


  function noteOn(midiNote, velocity){
    // Note pressed
    if (velocity !=0) {
      // play note
      console.log('playing a note');

      // if in range, draw the note
      // TODO Remove hardcode. currently limited from C4-G5
      if(midiNote >= 72 && midiNote <91) {
        noteName = midiNoteToNoteName[midiNote];
        tone = instrument.play(noteName,ctx.currentTime, 5);
        console.log('noteName: ' + noteName);
        userNoteDisplayed.style.top = noteNameToPosition[noteName];
        userNoteDisplayed.style.display = 'block';
      }
    }

    // Note released (velocity == 0)
    else {
      // TODO kill note

      // Hide note
      userNoteDisplayed.style.display = 'none';
    }
    console.log('noteOn()');
  }

  function noteOff(midiNote, velocity){
    // do something when note is released
    console.log('noteOff()');
  }

};
