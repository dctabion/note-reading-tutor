
function setup_soundFont() {
  flashApp.soundfont.ctx = new AudioContext();
  flashApp.soundfont.soundfont= new Soundfont(flashApp.soundfont.ctx);
  // instrument = soundfont.instrument('music_box');
  flashApp.soundfont.instrument = flashApp.soundfont.soundfont.instrument('acoustic_grand_piano');
  flashApp.theButton = document.getElementById('soundfontTestButton');

  // when instrument is loaded
  flashApp.soundfont.instrument.onready(function(){
    // TODO click to play!!
    console.log('ready!!')
    setTestButtonTones(flashApp.theButton, flashApp.soundfont.instrument, flashApp.soundfont.ctx);
  });
}
