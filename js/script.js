/* ==================== SONGS ==================== */

const songs = [
    { name:"Aa Chal Ke Tujhe", artist:"Kishore Kumar", year:"1964", era:"80's", file:"audio/Aa Chal Ke Tujhe.mp3" },
    { name:"Aye Mere Humsafar", artist:"Udit Narayan • Alka Yagnik", year:"1988", era:"80's", file:"audio/Aye Mere Humsafar.mp3" },
    { name:"Bade Achhe Lagte Hain", artist:"Amit Kumar", year:"1976", era:"80's", file:"audio/Bade Achhe Lagte Hain.mp3" },
    { name:"Dekha Ek Khwab", artist:"Kishore Kumar • Lata Mangeshkar", year:"1981", era:"80's", file:"audio/Dekha Ek Khwab.mp3" },
    { name:"In Ankhon Ki Masti Ke", artist:"Asha Bhosle", year:"1981", era:"80's", file:"audio/In Ankhon Ki Masti Ke.mp3" },
    { name:"Jab Koi Baat", artist:"Kumar Sanu • Sadhana Sargam", year:"1990", era:"90's", file:"audio/Jab Koi Baat.mp3" },
    { name:"Kabhi Kabhi Mere Dil Mein", artist:"Mukesh", year:"1976", era:"80's", file:"audio/Kabhi Kabhi Mere Dil Mein.mp3" },
    { name:"Kitna Haseen Chehra", artist:"Kumar Sanu", year:"1994", era:"90's", file:"audio/Kitna Haseen Chehra.mp3" },
    { name:"Kitni Hasrat Hai Hame", artist:"Kumar Sanu • Sadhana Sargam", year:"1993", era:"90's", file:"audio/Kitni Hasrat Hai Hame.mp3" },
    { name:"Kya Miliye Aise Logon Se", artist:"Mohammed Rafi", year:"1968", era:"80's", file:"audio/Kya Miliye Aise Logon Se.mp3" },
    { name:"Agar Tum Na Hote", artist:"Lata Mangeshkar", year:"1983", era:"80's", file:"audio/Agar Tum Na Hote.mp3" },
    { name:"Lag Ja Gale", artist:"Lata Mangeshkar", year:"1964", era:"80's", file:"audio/Lag Ja Gale.mp3" },
    { name:"Likhe Jo Khat Tujhe", artist:"Mohammed Rafi", year:"1968", era:"80's", file:"audio/Likhe Jo Khat Tujhe.mp3" },
    { name:"Nahin Yeh Ho Nahin Sakta", artist:"Kumar Sanu • Sadhana Sargam", year:"1995", era:"90's", file:"audio/Nahin Yeh Ho Nahin Sakta.mp3" },
    { name:"Neele Neele Ambar Par", artist:"Kishore Kumar", year:"1983", era:"80's", file:"audio/Neele Neele Ambar Par.mp3" },
    { name:"Pal Pal Dil Ke Paas", artist:"Kishore Kumar", year:"1973", era:"80's", file:"audio/Pal Pal Dil Ke Paas.mp3" },
    { name:"Pehla Nasha", artist:"Udit Narayan • Sadhana Sargam", year:"1992", era:"90's", file:"audio/Pehla Nasha.mp3" },
    { name:"Tere Bina Zindagi Se", artist:"Lata Mangeshkar • Kishore Kumar", year:"1975", era:"80's", file:"audio/Tere Bina Zindagi Se.mp3" },
    { name:"Tu Tu Hai Wahi", artist:"Kishore Kumar • Asha Bhosle", year:"1982", era:"80's", file:"audio/Tu Tu Hai Wahi.mp3" },
    { name:"Jab Hum Jawan Honge", artist:"Lata Mangeshkar • Shabbir Kumar", year:"1983", era:"80's", file:"audio/Jab Hum Jawan Honge.mp3" },
    { name:"Aap Ke Pyaar Mein", artist:"Alka Yagnik", year:"2002", era:"90's", file:"audio/Aap Ke Pyaar Mein.mp3" },
    { name:"Hamne Tumko Dil Ye De Diya", artist:"Alka Yagnik • Udit Narayan", year:"2002", era:"90's", file:"audio/Hamne Tumko Dil Ye De Diya.mp3" },
    { name:"Hum Tumko Nigahon Mein", artist:"Udit Narayan • Shreya Ghoshal", year:"2004", era:"90's", file:"audio/Hum Tumko Nigahon Mein.mp3" },
    { name:"Kitna Pyaara Hai Yeh Chehra", artist:"Alka Yagnik • Udit Narayan", year:"2002", era:"90's", file:"audio/Kitna Pyaara Hai Yeh Chehra.mp3" },
    { name:"Hamein Tumse Hua Hai Pyar", artist:"Alka Yagnik • Udit Narayan", year:"2004", era:"90's", file:"audio/Hamein Tumse Hua Hai Pyar.mp3" }
];


/* ==================== DOM CACHE ==================== */

const $ = id => document.getElementById(id);

const audio = $("audio");
const songGrid = $("songGrid");
const masterPlay = $("masterPlay");
const playerVinyl = $("playerVinyl");
const playerSong = $("playerSong");
const playerArtist = $("playerArtist");
const progressFill = $("progressFill");
const currentTimeEl = $("currentTime");
const durationEl = $("duration");
const volumeSlider = $("volumeSlider");
const volumeButton = $("volumeButton");

let currentSongIndex = -1;
let currentFilter = "all";


/* ==================== HELPERS ==================== */

const normalizeEra = value => String(value).replace(/\D/g, "");

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");

    return `${minutes}:${secs}`;
}

function scrollToPlaylist() {
    $("playlist")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* ==================== VOLUME ==================== */

audio.volume = 0.75;

function updateVolumeUI() {
    const volume = audio.muted ? 0 : audio.volume;

    volumeButton.textContent =
        volume === 0 ? "🔇" :
        volume < .45 ? "🔉" : "🔊";

    const percent = volume * 100;

    volumeSlider.style.background =
        `linear-gradient(90deg,#d39b4e ${percent}%,#4c3843 ${percent}%)`;
}

volumeSlider.addEventListener("input", e => {
    audio.volume = Number(e.target.value);
    audio.muted = false;
    updateVolumeUI();
});

function toggleMute() {
    audio.muted = !audio.muted;
    updateVolumeUI();
}

updateVolumeUI();


/* ==================== PLAYLIST ==================== */

function renderSongs(filter = "all") {
    const normalized = filter === "all" ? "all" : normalizeEra(filter);

    songGrid.innerHTML = "";

    const fragment = document.createDocumentFragment();
    let visible = 0;

    songs.forEach((song, index) => {
        const era = normalizeEra(song.era);

        if (normalized !== "all" && era !== normalized) return;

        visible++;

        const card = document.createElement("article");
        card.className = `song${index === currentSongIndex ? " active" : ""}`;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="cover">
                <div class="mini-vinyl"></div>
                <div class="song-year">${song.year}</div>
            </div>

            <div class="song-info">
                <div class="song-name">${song.name}</div>
                <div class="song-artist">${song.artist}</div>
                <div class="song-era">${era}'s golden melody</div>
            </div>

            <div class="song-actions">
                <span class="heart" title="Add to favourites">♡</span>
                <span class="play-circle">▶</span>
            </div>
        `;

        fragment.appendChild(card);
    });

    if (!visible) {
        songGrid.innerHTML = `
            <div class="empty-playlist">
                <div class="empty-note">♫</div>
                <h3>Is zamaane ke gaane nahi mile</h3>
                <p>Song ki era value check karein.</p>
                <button type="button" onclick="showAllSongs()">Show All Songs</button>
            </div>
        `;
        return;
    }

    songGrid.appendChild(fragment);
    markCurrentSong();
}


/*
One listener instead of 2 listeners
for every song card.
*/
songGrid.addEventListener("click", event => {
    const heart = event.target.closest(".heart");

    if (heart) {
        event.stopPropagation();
        heart.classList.toggle("active");
        heart.textContent = heart.classList.contains("active") ? "♥" : "♡";
        return;
    }

    const card = event.target.closest(".song");
    if (!card) return;

    playSong(Number(card.dataset.index));
});


function markCurrentSong() {
    document.querySelectorAll(".song").forEach(card => {
        card.classList.toggle(
            "active",
            Number(card.dataset.index) === currentSongIndex
        );
    });
}


/* ==================== FILTER ==================== */

function filterEra(era) {
    currentFilter = normalizeEra(era);
    renderSongs(currentFilter);
    requestAnimationFrame(scrollToPlaylist);
}

function showAllSongs() {
    currentFilter = "all";
    renderSongs("all");
    scrollToPlaylist();
}

function goPlaylist() {
    showAllSongs();
}


/* ==================== PLAYER ==================== */

function playSong(index) {
    const song = songs[index];
    if (!song) return;

    currentSongIndex = index;

    playerSong.textContent = song.name;
    playerArtist.textContent = song.artist;

    audio.src = encodeURI(song.file);

    markCurrentSong();

    audio.play().catch(error => {
        console.error("Song play nahi hua:", song.file, error);
        setPlayerState(false);
    });
}


function togglePlay() {
    if (currentSongIndex < 0) {
        const card = document.querySelector(".song");
        playSong(card ? Number(card.dataset.index) : 0);
        return;
    }

    if (audio.paused) {
        audio.play().catch(console.error);
    } else {
        audio.pause();
    }
}


function setPlayerState(playing) {
    masterPlay.textContent = playing ? "❚❚" : "▶";
    playerVinyl.classList.toggle("playing", playing);
}


function getCurrentVisibleIndexes() {
    if (currentFilter === "all") {
        return songs.map((_, index) => index);
    }

    const result = [];

    songs.forEach((song, index) => {
        if (normalizeEra(song.era) === currentFilter) {
            result.push(index);
        }
    });

    return result;
}


function nextSong() {
    const indexes = getCurrentVisibleIndexes();
    if (!indexes.length) return;

    const position = indexes.indexOf(currentSongIndex);
    const next = position < 0 ? 0 : (position + 1) % indexes.length;

    playSong(indexes[next]);
}


function previousSong() {
    const indexes = getCurrentVisibleIndexes();
    if (!indexes.length) return;

    const position = indexes.indexOf(currentSongIndex);

    const previous =
        position < 0
            ? indexes.length - 1
            : (position - 1 + indexes.length) % indexes.length;

    playSong(indexes[previous]);
}


/* ==================== AUDIO EVENTS ==================== */

audio.addEventListener("play", () => setPlayerState(true));

audio.addEventListener("pause", () => {
    if (!audio.ended) setPlayerState(false);
});

audio.addEventListener("ended", nextSong);

audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    if (!Number.isFinite(audio.duration)) return;

    progressFill.style.width =
        `${(audio.currentTime / audio.duration) * 100}%`;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});


function seek(event) {
    if (!Number.isFinite(audio.duration)) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
        0,
        Math.min(1, (event.clientX - rect.left) / rect.width)
    );

    audio.currentTime = ratio * audio.duration;
}


/* ==================== MEMORIES ==================== */

const memories = [
    {
        text:`Woh Sunday ki subah, jab ghar mein <em>purane gaane</em> bajte the.`,
        caption:"SUNDAY MORNING • OLD MUSIC • CHAI"
    },
    {
        text:`Woh pehla gaana, jo kisi <em>khaas insaan</em> ki yaad ban gaya.`,
        caption:"FIRST LOVE • FIRST MELODY"
    },
    {
        text:`Barish ki boondein, khidki aur <em>Kishore Kumar</em> ki awaaz.`,
        caption:"RAINY EVENINGS • GOLDEN SONGS"
    },
    {
        text:`Radio par achanak favourite gaana aana bhi <em>ek khushi thi.</em>`,
        caption:"RADIO DAYS • FAVOURITE SONG"
    },
    {
        text:`Ghar ki chhat, thandi hawa aur <em>purana nagma.</em>`,
        caption:"ROOFTOPS • EVENING BREEZE"
    },
    {
        text:`School ke woh din jab chhoti cheezein <em>badi khushi</em> diya karti thi.`,
        caption:"SCHOOL DAYS • LITTLE JOYS"
    },
    {
        text:`Woh tasveerein jinhe dekh kar waqt <em>thahar sa jaata hai.</em>`,
        caption:"OLD PHOTOS • OLD STORIES"
    },
    {
        text:`Kuch awaazein sunte hi purane chehre <em>saamne aa jaate hain.</em>`,
        caption:"FACES • PLACES • MEMORIES"
    },
    {
        text:`Raaste chhote the, magar safaron ki <em>yaadein lambi hain.</em>`,
        caption:"OLD ROADS • BEAUTIFUL JOURNEYS"
    },
    {
        text:`Waqt aage badhta raha, magar woh gaane <em>wahin reh gaye.</em>`,
        caption:"OLD SONGS • FOREVER YOUNG"
    }
];

const memoryCard = $("memoryCard");
const memoryText = $("memoryText");
const memoryCaption = $("memoryCaption");
const memoryNumber = $("memoryNumber");
const memoryDots = $("memoryDots");

let memoryIndex = 0;

const dotsFragment = document.createDocumentFragment();

memories.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = `memory-dot${index === 0 ? " active" : ""}`;
    dot.dataset.index = index;

    dotsFragment.appendChild(dot);
});

memoryDots.appendChild(dotsFragment);

memoryDots.addEventListener("click", event => {
    const dot = event.target.closest(".memory-dot");
    if (!dot) return;

    memoryIndex = Number(dot.dataset.index);
    changeMemory(memoryIndex);
});


function updateMemoryContent(index) {
    const memory = memories[index];

    memoryText.innerHTML = memory.text;
    memoryCaption.textContent = memory.caption;

    memoryNumber.textContent =
        `${String(index + 1).padStart(2,"0")} / ${String(memories.length).padStart(2,"0")}`;

    memoryDots.querySelectorAll(".memory-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}


function changeMemory(index) {
    memoryCard.classList.add("is-changing");

    setTimeout(() => {
        updateMemoryContent(index);
        memoryCard.classList.remove("is-changing");
    }, 280);
}


setInterval(() => {
    memoryIndex = (memoryIndex + 1) % memories.length;
    changeMemory(memoryIndex);
}, 4500);


/* ==================== TAP EFFECT ==================== */

const tapSymbols = ["♪","♫","♬","♩","♫","♪"];

function createTapEffect(x, y) {
    const fragment = document.createDocumentFragment();

    const ripple = document.createElement("span");
    ripple.className = "tap-ripple";
    ripple.style.cssText = `left:${x}px;top:${y}px`;
    fragment.appendChild(ripple);

    const elements = [ripple];

    for (let i = 0; i < 8; i++) {
        const note = document.createElement("span");

        const tx = (Math.random() - .5) * 210 - 50;
        const ty = -(80 + Math.random() * 150) - 50;
        const rot = (Math.random() - .5) * 100;
        const size = 32 + Math.random() * 45;

        note.className = "tap-note";
        note.textContent =
            tapSymbols[Math.floor(Math.random() * tapSymbols.length)];

        note.style.cssText =
            `left:${x}px;top:${y}px;font-size:${size}px;--tx:${tx}px;--ty:${ty}px;--rot:${rot}deg`;

        fragment.appendChild(note);
        elements.push(note);
    }

    document.body.appendChild(fragment);

    setTimeout(() => ripple.remove(), 800);

    setTimeout(() => {
        elements.slice(1).forEach(element => element.remove());
    }, 1400);
}


/* ==================== CHIME ==================== */

let chimeContext;

function playChime() {
    const AudioContextType =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextType) return;

    chimeContext ||= new AudioContextType();

    if (chimeContext.state === "suspended") {
        chimeContext.resume();
    }

    const now = chimeContext.currentTime;

    createTone(523.25, now, .18, .025);
    createTone(659.25, now + .06, .22, .018);
}


function createTone(frequency, start, duration, volume) {
    const oscillator = chimeContext.createOscillator();
    const gain = chimeContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);

    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + .015);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);

    oscillator.connect(gain);
    gain.connect(chimeContext.destination);

    oscillator.start(start);
    oscillator.stop(start + duration + .03);
}


window.addEventListener("pointerdown", event => {
    createTapEffect(event.clientX, event.clientY);
    playChime();
}, { capture:true });


/* ==================== KEYBOARD ==================== */

document.addEventListener("keydown", event => {
    const tag = document.activeElement?.tagName;

    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
        return;
    }

    if (event.shiftKey && event.key === "ArrowRight") {
        event.preventDefault();
        nextSong();
        return;
    }

    if (event.shiftKey && event.key === "ArrowLeft") {
        event.preventDefault();
        previousSong();
        return;
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();

        if (Number.isFinite(audio.duration)) {
            audio.currentTime = Math.min(
                audio.duration,
                audio.currentTime + 5
            );
        }

        return;
    }

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - 5);
        return;
    }

    if (event.key === "ArrowUp") {
        event.preventDefault();

        audio.muted = false;
        audio.volume = Math.min(1, audio.volume + .1);
        volumeSlider.value = audio.volume;

        updateVolumeUI();
        return;
    }

    if (event.key === "ArrowDown") {
        event.preventDefault();

        audio.muted = false;
        audio.volume = Math.max(0, audio.volume - .1);
        volumeSlider.value = audio.volume;

        updateVolumeUI();
        return;
    }

    if (event.key.toLowerCase() === "m") {
        toggleMute();
    }
});


/* ==================== START ==================== */

renderSongs("all");
