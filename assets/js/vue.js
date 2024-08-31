var songs = [
    {
        name: "Hada Y2ella",
        source: "assets/audio/Hada_Y2ella.mp3",
    },
    {
        name: "Waat El Jadd",
        source: "assets/audio/Waat_El_Jadd.mp3",
    }
]

var videos = [
    "assets/img/bgRect.jpg",
    "assets/img/bgRect.jpg",
    "assets/img/bgRect.jpg",
    "assets/img/bgRect.jpg",
    "assets/img/bgRect.jpg",
    "assets/img/bgRect.jpg",
];

var projects = [
    "assets/img/bgRect.jpg",
    "assets/img/bgRect.jpg",
    "assets/img/bgRect.jpg",
    "assets/img/bgRect.jpg",
    "assets/img/bgRect.jpg",
    "assets/img/bgRect.jpg",
];

var gallery = [
    "assets/img/bgSquare.png",
    "assets/img/bgSquare.png",
    "assets/img/bgSquare.png",
    "assets/img/bgSquare.png",
    "assets/img/bgSquare.png",
    "assets/img/bgSquare.png",
    "assets/img/bgSquare.png",
    "assets/img/bgSquare.png",
];

const app = Vue.createApp({
    data() {
        return {
            page: "home",
            windowWidth: window.innerWidth,
            scrollPosition: 0,
            sectionOffsets: {},
            songs: songs,
            currentSong: songs[0],
            currentSongIndex: 0,
            videos: videos,
            projects: projects,
            gallery: gallery,
            playClicked: false,
            listShow: false,
            time: "0:00",
        };
    },
    mounted() {
        window.addEventListener("resize", this.updateWindowWidth);
        window.addEventListener("resize", this.updateSectionOffsets);
        window.addEventListener("scroll", this.scrollTop);
        this.setHeight();
        this.updateSectionOffsets();
        this.setDurations();
        const audio = document.getElementById("currentTrack");
        audio.addEventListener("loadedmetadata", this.updateDuration);
        audio.addEventListener("timeupdate", this.updateTime);
        audio.addEventListener('ended', this.handleAudioEnded);
    },
    methods: {
        setHeight() {
            $("#music").css("height", $(window).height() + "px");
        },
        setDurations() {
            for (let index = 0; index < songs.length; index++) {
                const track = document.getElementById(`track${index + 1}`);
                track.addEventListener('loadedmetadata', () => {
                    const duration = track.duration;
                    const minutes = Math.floor(duration / 60);
                    const seconds = Math.floor(duration % 60);
                    const time = document.getElementById(`time${index + 1}`);
                    time.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                });
            }
        },
        updateDuration() {
            const audio = document.getElementById("currentTrack");
            const duration = audio.duration;
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            this.time = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        },
        goToSection(name) {
            const targetElement = `#${name}`;
            $("html, body").animate({
                scrollTop: $(targetElement).offset().top - 55
            }, 1500);
        },
        playMusic() {
            this.playClicked = !this.playClicked;
            const audio = document.getElementById("currentTrack");

            if (this.playClicked) {
                audio.play();
            } else {
                audio.pause();
            }
        },
        updateTime() {
            const audio = document.getElementById("currentTrack");
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            this.time = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            const percentagePlayed = (audio.currentTime / audio.duration) * 100;
            $(".timeSlider").css("width", percentagePlayed + "%");
        },
        handleAudioEnded() {
            this.playClicked = false;
            const audio = document.getElementById("currentTrack");
            audio.currentTime = 0;
        },

        showList() {
            this.listShow = !this.listShow;
        },
        chooseTrack(index) {
            this.currentSong = songs[index];
            this.currentSongIndex = index;
            this.playClicked = false;
            this.listShow = false;
            $(".timeSlider").css("width", "0");
        },
        updateWindowWidth() {
            this.windowWidth = window.innerWidth;
        },
        scrollTop() {
            this.scrollPosition = $(window).scrollTop();
        },
        updateSectionOffsets() {
            this.sectionOffsets = {
                music: $("#music").offset().top - 55,
                videos: $("#videos").offset().top - 55,
                projects: $("#projects").offset().top - 55,
                biography: $("#biography").offset().top - 55,
                pictures: $("#pictures").offset().top - 55,
                contact: $("#contact").offset().top - 55,
            };
        }
    },
});

app.mount("#app");