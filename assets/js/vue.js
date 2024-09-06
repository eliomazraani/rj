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
    {
        image: "assets/img/bgRect.jpg",
        source: "https://youtube.com"
    },
    {
        image: "assets/img/bgRect.jpg",
        source: "https://youtube.com"
    },
    {
        image: "assets/img/bgRect.jpg",
        source: "https://youtube.com"
    },
    {
        image: "assets/img/bgRect.jpg",
        source: "https://youtube.com"
    },
    {
        image: "assets/img/bgRect.jpg",
        source: "https://youtube.com"
    },
    {
        image: "assets/img/bgRect.jpg",
        source: "https://youtube.com"
    },
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
    "assets/img/bgC.jpg",
    "assets/img/bgSquare.png",
    "assets/img/bgC.jpg",
    "assets/img/bgSquare.png",
    "assets/img/bgC.jpg",
    "assets/img/bgSquare.png",
    "assets/img/bgC.jpg",
];

const app = Vue.createApp({
    data() {
        return {
            isLoading: true,
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
            videosFade: false,
            projectsFade: false,
            picturesFade: false,
            imageIndex: null,
            showModal: false,
        };
    },
    mounted() {
        window.addEventListener("resize", this.updateWindowWidth);
        window.addEventListener("resize", this.updateSectionOffsets);
        window.addEventListener("scroll", this.scrollTop);
        window.addEventListener("scroll", this.scrollFade);

        this.setHeight();
        this.updateSectionOffsets();
        this.setDurations();

        const audio = $("#currentTrack");
        audio.on("loadedmetadata", () => this.updateDuration());
        audio.on("timeupdate", () => this.updateTime());
        audio.on("ended", () => this.handleAudioEnded());
        
        setTimeout(() => {
            this.isLoading = false;
            $("#music .logo").addClass("fade");
        }, 2000);

        const today = new Date();
        $("footer #date").html(today.getFullYear());
    },
    methods: {
        setHeight() {
            $("#music").css("height", $(window).height() + "px");
        },
        setDurations() {
            for (let index = 0; index < songs.length; index++) {
                const track = $(`#track${index + 1}`);
                track.on('loadedmetadata', () => {
                    const duration = track[0].duration;
                    const minutes = Math.floor(duration / 60);
                    const seconds = Math.floor(duration % 60);
                    const time = $(`#time${index + 1}`);
                    time.html(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
                });
            }
        },        
        updateDuration() {
            const audio = $("#currentTrack");
            const duration = audio[0].duration;
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
            const audio = $("#currentTrack");

            if (this.playClicked) {
                audio[0].play();
            } else {
                audio[0].pause();
            }
        },
        updateTime() {
            const audio = $("#currentTrack")[0];
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            this.time = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            const percentagePlayed = (audio.currentTime / audio.duration) * 100;
            $(".timeSlider").css("width", percentagePlayed + "%");
        },
        handleAudioEnded() {
            this.playClicked = false;
            const audio = $("#currentTrack")[0];
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
        showImage(index, fromModal = false) {
            if (fromModal) {
                const direction = index === 1 ? "slide-left" : "slide-right";
                $(".modalContent img").addClass(direction);
                setTimeout(() => {
                    $(".modalContent img").removeClass("slide-left slide-right");
                }, 600);
        
                this.imageIndex += index;
                if (this.imageIndex < 0) {
                    this.imageIndex = this.gallery.length - 1;
                }
                if (this.imageIndex == this.gallery.length) {
                    this.imageIndex = 0;
                }
            } else {
                this.imageIndex = index;
            }
            
            $("#modal img").attr("src", this.gallery[this.imageIndex]);
            this.showModal = true;
        },        
        closeModal() {
            this.showModal = false;
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
        },
        scrollFade() {
            if (this.scrollPosition >= this.sectionOffsets.videos - 150) {
                this.videosFade = true;
            }
            if (this.scrollPosition >= this.sectionOffsets.projects - 150) {
                this.projectsFade = true;
            }
            if (this.scrollPosition >= this.sectionOffsets.pictures - 150) {
                this.picturesFade = true;
            }
        }
    },
});

app.mount("#app");