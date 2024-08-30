const app = Vue.createApp({
    data() {
        return {
            windowWidth: window.innerWidth,
            scrollPosition: 0,
            sectionOffsets: {},
        };
    },
    mounted() {
        window.addEventListener("resize", this.updateWindowWidth);
        window.addEventListener("resize", this.updateSectionOffsets);
        window.addEventListener("scroll", this.scrollTop);
        this.setHeight();
        this.updateSectionOffsets();
    },
    methods: {
        setHeight() {
            $("#music").css("height", $(window).height() + "px")
        },
        goToSection(name) {
            const targetElement = `#${name}`;
            $("html, body").animate({
                scrollTop: $(targetElement).offset().top - 55
            }, 1500);
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