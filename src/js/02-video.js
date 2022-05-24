// Import Vimeo Player library
import Player from '@vimeo/player';

// Import lodash.throttle library
const throttle = require('lodash.throttle');

// Search for iframe#vimeo-player element
const video = document.querySelector("#vimeo-player");

// Create an instance of the Player class for the iframe#vimeo-player element
const player = new Player(video);

// Adding a timeupdate event listener for the 1 second delayed player instance
player.on("timeupdate", throttle(saveWatchTime, 1000));

// The function saves the current time of playing video to local storage
function saveWatchTime(evt) {
  localStorage.setItem("videoplayer-current-time", evt.seconds);
};

// Setting the time of the video played from local storage
player.setCurrentTime(localStorage.getItem("videoplayer-current-time"));