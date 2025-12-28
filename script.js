let tracks = [
  { title: "Трек 1", src: "tracks/track1.mp3", cover: "tracks/cover1.jpg" },
  { title: "Трек 2", src: "tracks/track2.mp3", cover: "tracks/cover2.jpg" },
  { title: "Трек 3", src: "tracks/track3.mp3", cover: "tracks/cover3.jpg" }
];

let favorites = [];
let current = 0;

const audio = document.getElementById("audio");
const trackListEl = document.getElementById("trackList");
const titleEl = document.getElementById("title");
const coverEl = document.getElementById("cover");
const progressEl = document.getElementById("progress");

function renderTracks() {
  trackListEl.innerHTML = "";
  tracks.forEach((track, index) => {
    const div = document.createElement("div");
    div.className = "track" + (favorites.includes(index) ? " favorite" : "");
    div.textContent = track.title;
    div.onclick = () => playTrack(index);
    div.ondblclick = () => toggleFavorite(index);
    trackListEl.appendChild(div);
  });
}

function playTrack(index) {
  current = index;
  audio.src = tracks[index].src;
  titleEl.textContent = tracks[index].title;
  coverEl.src = tracks[index].cover;
  audio.play();
  coverEl.classList.add("playing");
}

function toggle() {
  audio.paused ? audio.play() : audio.pause();
  if(audio.paused) coverEl.classList.remove("playing");
  else coverEl.classList.add("playing");
}

function next() {
  current = (current + 1) % tracks.length;
  playTrack(current);
}

function prev() {
  current = (current - 1 + tracks.length) % tracks.length;
  playTrack(current);
}

audio.ontimeupdate = () => {
  progressEl.value = (audio.currentTime / audio.duration) * 100 || 0;
};

progressEl.oninput = () => {
  audio.currentTime = (progressEl.value / 100) * audio.duration;
};

function toggleFavorite(index) {
  if (favorites.includes(index)) favorites = favorites.filter(i => i !== index);
  else favorites.push(index);
  renderTracks();
}

document.getElementById("favoritesBtn").addEventListener("click", () => {
  if(favorites.length === 0) return;
  trackListEl.innerHTML = "";
  favorites.forEach(i => {
    const track = tracks[i];
    const div = document.createElement("div");
    div.className = "track favorite";
    div.textContent = track.title;
    div.onclick = () => playTrack(i);
    div.ondblclick = () => toggleFavorite(i);
    trackListEl.appendChild(div);
  });
});

renderTracks();
