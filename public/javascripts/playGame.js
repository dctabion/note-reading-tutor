window.onload = function() {
  console.log('game.js is running!!');
  testHelper();


  // create a new deck of cards
  var flashcards = allCards;
  console.log(flashcards);

  // Setup flashcard display
  var flashcard = document.getElementById('flashcard');
  var note = document.getElementById('note');
  note.style.display = 'none';

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
    note.style.display = 'block';

    var randCardIndex = getRandomInt(0, flashcards.length);
    note.style.top = noteToPosition[flashcards[randCardIndex]];
  });

};
