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
    if(midiNote >= 1 && midiNote <= 108) {
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