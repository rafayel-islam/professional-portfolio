document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const subtitles = ["Web Developer", "UI/UX Designer", "Freelancer"];
let subtitleIndex = 0;
let charIndex = 0;
const subtitleElement = document.querySelector('.subtitle');

function type() {
    if (charIndex < subtitles[subtitleIndex].length) {
        subtitleElement.textContent += subtitles[subtitleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        subtitleElement.textContent = subtitles[subtitleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        subtitleIndex = (subtitleIndex + 1) % subtitles.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", function() { 
    setTimeout(type, 500);
});