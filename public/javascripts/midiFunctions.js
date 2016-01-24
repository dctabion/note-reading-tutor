// midi functions
function setupMidiAccess() {
  if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
          sysex: false
      }).then(onMIDISuccess, onMIDIFailure);
  } else {
      alert("No MIDI support in your browser.");
  }
}

function onMIDISuccess(midi) {
    console.log('onMIDISucess() - got MIDI access');
    // when we get a succesful response, run this code
    // midi is our raw MIDI data, inputs, outputs, and sysex status
    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        console.log('registering another input');
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
    console.log('done registering MIDI input(s)');
    areResourcesLoaded('midi');
}

function onMIDIFailure(e) {
    // when we get a failed response, run this code
    consol.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

function onMIDIMessage(message) {
  data = event.data,
  cmd = data[0] >> 4,
  channel = data[0] & 0xf,
  type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
  note = data[1],
  velocity = data[2];

  // only respond to MIDI input if game is in progress
  if (flashApp.game.inProgress == true) {
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
    if(midiNote >= 1 && midiNote <= 108) {
      noteName = midiNoteToNoteName[midiNote];
      flashApp.soundfont.instrument.play(noteName,flashApp.soundfont.ctx.currentTime, 1);
      console.log('noteName: ' + noteName);
      flashApp.els.userNote.style.top = noteNameToPosition[noteName];
      flashApp.els.userNote.style.display = 'block';

      // does it match the flash card?
      if (noteName == flashApp.game.flashCards[flashApp.game.currentCardIndex]) {
        console.log('correct!');
      }
      else {
        console.log('wrong!');
        // no, shake and switch card
        flashApp.els.userNote.classList.remove('shake');
        flashApp.els.userNote.classList.add('shake');
      }

    }
  }

  // Note released (velocity == 0)
  else {
    // TODO kill note

    // Hide note
    // flashApp.els.userNote.style.display = 'none';
  }
  console.log('noteOn()');
}

function noteOff(midiNote, velocity){
  // do something when note is released
  console.log('noteOff()');
}
