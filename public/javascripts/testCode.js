function setTestButtonTones(button, instrument, ctx) {

  button.onclick = function(){
    console.log('click!');
    instrument.play('C3',ctx.currentTime, 5);
    instrument.play('G3',ctx.currentTime+0.1, 5);
    instrument.play('D4',ctx.currentTime+0.2, 5);
    instrument.play('Eb4',ctx.currentTime+0.3, 5);
    instrument.play('Bb4',ctx.currentTime+0.4, 5);
    instrument.play('F5',ctx.currentTime+0.5, 5);
    instrument.play('D6',ctx.currentTime+0.6, 5);
  };
}
