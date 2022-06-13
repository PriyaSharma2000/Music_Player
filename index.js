let songs = [
  {
    songName: "Mic Drop",
    artist: "BTS",
    fileName: "song1.mp3",
    coverName: "cover1.jpg",
  },
  {
    songName: "Get Low",
    artist: "Dillon Francis & DJ Snake",
    fileName: "song2.mp3",
    coverName: "cover2.jpg",
  },
  {
    songName: "Hall Of Fame",
    artist: "The Script",
    fileName: "song3.mp3",
    coverName: "cover3.jpg",
  },
  {
    songName: "Thunder",
    artist: "Imagine Dragons",
    fileName: "song4.mp3",
    coverName: "cover4.jpg",
  },
  {
    songName: "Counting Stars",
    artist: "OneRepublic",
    fileName: "song5.mp3",
    coverName: "cover5.jpg",
  },
];

let playIcon = document.getElementById("playIcon");
var music = document.getElementById("music");

playIcon.addEventListener("click", () => {
  let music = document.getElementById("music");
  if (music.paused || music.currentTime == 0) {
    music.play();
    playIcon.classList.remove("fa-play-circle");
    playIcon.classList.add("fa-pause-circle");
  } else {
    music.pause();
    playIcon.classList.remove("fa-pause-circle");
    playIcon.classList.add("fa-play-circle");
  }
});

var progressBar = document.getElementById("progressBar");
music.addEventListener("timeupdate", () => {
  var progress = Math.round((music.currentTime / music.duration) * 100);
  console.log(progress);
  progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
  music.currentTime = (progressBar.value * music.duration) / 100;
});

songs.map((elm, index) => {
  document.getElementById("list").innerHTML += `
    <div class="item" id="${index}">
            <h2 id="${index}">${elm.songName}</h2>
            <h3 id="${index}">${elm.artist}</h3>
        </div>
    `;
});

songIndex = 0;
let item = document.querySelectorAll(".item");
for (var i = 0; i < item.length; i++) {
  item[i].addEventListener("click", function (e) {
    songIndex = parseInt(e.target.id);
    console.log(songIndex);
    loadsong(songs[songIndex]);
    music.currentTime = 0;
    music.play();
    playIcon.classList.remove("fa-play-circle");
    playIcon.classList.add("fa-pause-circle");
  });
}

function loadsong(songs) {
  document.getElementById("song_name").textContent = songs.songName;
  document.getElementById("song_artist").textContent = songs.artist;
  document.getElementById("art").src = songs.coverName;
  document.getElementById("music").src = songs.fileName;
}


let next = document.getElementById("next");
next.addEventListener('click' , nextSong);
let prev = document.getElementById("prev");
prev.addEventListener('click' , previousSong);

music.addEventListener("ended", nextSong);

function nextSong() {
    songIndex = (songIndex+1) % songs.length;
    loadsong(songs[songIndex]);
    music.currentTime = 0;
    music.play();
    playIcon.classList.remove("fa-play-circle");
    playIcon.classList.add("fa-pause-circle");
}

function previousSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadsong(songs[songIndex]);
    music.currentTime = 0;
    music.play();
    playIcon.classList.remove("fa-play-circle");
    playIcon.classList.add("fa-pause-circle");
}