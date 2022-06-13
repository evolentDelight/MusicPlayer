const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");

//Song Titles
const song = [
  "Achaidh Cheide",
  "Darkest Child",
  "Local Forecast --slower",
  "Scheming Weasel --faster",
  "Take A Chance",
  "The Show Must Be Go",
  "Volatile Reaction",
];

//Keep track of songs
let songIndex = 6;

//Initially load song info DOM
loadSong(song[songIndex]);

//Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = song.length - 1;
  }

  loadSong(song[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > 6) {
    songIndex = 0;
  }

  loadSong(song[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth; //gives total width
  const clickX = e.offsetX; //gives value within the clientWidth
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Change track
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
