window.onload = function() {
  console.log('game.js is running!!');
  testHelper();

  var flashcard = document.getElementById('flashcard');
  var note = document.getElementById('note');
  note.style.display = 'none';

  flashcard.addEventListener('click', function(){
    console.log('click');
    note.style.display = 'block';

    // note.setAttribute('fill', 'red');
    // note.setAttribute('stroke', 'green');
    // note.classList.add('move_note');

    var randCard = getRandomInt(0, flashcards.length);
    note.style.top = noteToPosition[flashcards[randCard]];
  });


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var flashcards = [
    "G5",
    "F5",
    "E5",
    "D5",
    "C5",
    "B4",
    "A4",
    "G4",
    "F4",
    "E4",
    "D4",
    "C4"
  ]
  var noteToPosition = {
    "G5" : "11px",
    "F5" : "16px",
    "E5" : "22px",
    "D5" : "28px",
    "C5" : "34px",
    "B4" : "40px",
    "A4" : "46px",
    "G4" : "52px",
    "F4" : "58px",
    "E4" : "64px",
    "D4" : "70px",
    "C4" : "76px"
  }


};
