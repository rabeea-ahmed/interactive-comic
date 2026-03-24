window.addEventListener("DOMContentLoaded", () => {
    const zoomElement = document.querySelector(".zoom-image");
    let scale = 1;

    window.addEventListener("scroll", () => {
        scale = 1 + window.pageYOffset / 500;
        zoomElement.style.transform = `scale(${scale})`;
    });
});

const images = document.querySelectorAll('#carousel img');
let current = 0;

document.getElementById('carousel').addEventListener('click', () => {
    images[current].classList.remove('active');

    current = (current + 1) % images.length;

    images[current].classList.add('active');
});

const section = document.querySelector('.panel2');
const img = document.getElementById('zoomImg');
const fade = document.querySelector('.fade');

window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = -rect.top / (rect.height - windowHeight);
    progress = Math.min(Math.max(progress, 0), 1);

    // zoom in (accelerating = more realistic pull)
    const scale = 1 + Math.pow(progress, 2) * 8;
    img.style.transform = `scale(${scale})`;

    // fade to black near the end
    if (progress > 0.6) {
        fade.style.opacity = (progress - 0.6) / 0.4;
    } else {
        fade.style.opacity = 0;
    }
});

const quote = document.querySelector(".quote");
const wrapper = document.querySelector(".quote-scroll-wrapper");

window.addEventListener("scroll", () => {
    const rect = wrapper.getBoundingClientRect();
    const scrollProgress = Math.min(
        Math.max(-rect.top / (rect.height - window.innerHeight), 0),
        1
    );

    const maxMove = quote.scrollWidth - window.innerWidth;

    quote.style.transform =
        `translateX(-${scrollProgress * maxMove}px)`;

});

// panel 5
const characters = ["ruxuan", "geetika", "rabeea", "vy"];

// store original sources
const originalSrcs = {};
characters.forEach(id => {
    const el = document.getElementById(id);
    originalSrcs[id] = el.src; // save the original image src
});

characters.forEach(id => {
    const el = document.getElementById(id);

    const clickHandler = () => {
        // remove character
        el.src = "";

        // load pop.gif after a short delay
        setTimeout(() => {
            el.src = "img/pop.gif?" + new Date().getTime();
            el.classList.add("pop");
        }, 50);

        // disable clicking while popped
        el.removeEventListener("click", clickHandler);

        // reappear after 7 seconds (7000ms)
        setTimeout(() => {
            el.src = originalSrcs[id];  // restore original image
            el.classList.remove("pop");

            // reattach click listener
            el.addEventListener("click", clickHandler);
        }, 7000);
    };

    el.addEventListener("click", clickHandler);
});


