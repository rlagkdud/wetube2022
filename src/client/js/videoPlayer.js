console.log("video player");

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlay = (c) => {
  // if the video is playing, pause it
  if (video.paused) {
    playBtn.innerHTML = "Pause";
    video.play();
  } else {
    playBtn.innerText = "Play";
    video.pause();
  }
  // else play the video
};

const handleMute = (c) => {};

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handlePlay);
