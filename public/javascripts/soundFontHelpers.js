
function setupSoundfont() {
  flashApp.soundfont.ctx = new AudioContext();
  flashApp.soundfont.soundfont= new Soundfont(flashApp.soundfont.ctx);
  // instrument = soundfont.instrument('music_box');
  flashApp.soundfont.instrument = flashApp.soundfont.soundfont.instrument('acoustic_grand_piano');
  flashApp.theButton = document.getElementById('soundfontTestButton');

  // when instrument is loaded
  flashApp.soundfont.instrument.onready(function(){
    // TODO click to play!!
    console.log('soundfont ready!!');
  });

  // TODO delete this test code
  flashApp.theButton.onclick = function(){
    console.log('click!');
    flashApp.soundfont.instrument.play('C3',flashApp.soundfont.ctx.currentTime, 5);
    flashApp.soundfont.instrument.play('G3',flashApp.soundfont.ctx.currentTime+0.1, 5);
    flashApp.soundfont.instrument.play('D4',flashApp.soundfont.ctx.currentTime+0.2, 5);
    flashApp.soundfont.instrument.play('Eb4',flashApp.soundfont.ctx.currentTime+0.3, 5);
    flashApp.soundfont.instrument.play('Bb4',flashApp.soundfont.ctx.currentTime+0.4, 5);
    flashApp.soundfont.instrument.play('F5',flashApp.soundfont.ctx.currentTime+0.5, 5);
    flashApp.soundfont.instrument.play('D6',flashApp.soundfont.ctx.currentTime+0.6, 5);
  };

}
