
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function allResourcesLoaded() {
  var allLoaded = false;
  var resources = flashApp.resources;
  // Loop through all resources
  for (var key in resources) {
    console.log("resources." + key + " :" + resources[key]);

    // if the current resource is still loading, stop the loop and return false
    if (resource[key] == false) {
      return false;
    }

    // if it gets through the loop, then something all resources are loaded
    return true;
  }
}
