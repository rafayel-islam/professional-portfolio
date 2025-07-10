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

    // Active navigation link logic
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '' && link.getAttribute('href') === 'index.html#about')) { // For homepage
            link.classList.add('active');
        } else if (link.getAttribute('href').includes('#') && currentPath === 'index.html') {
            // Handle internal links on the homepage
            const targetId = link.getAttribute('href').split('#')[1];
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            navLinks.forEach(l => l.classList.remove('active'));
                            link.classList.add('active');
                        }
                    });
                }, { threshold: 0.5 }); // Adjust threshold as needed
                observer.observe(targetElement);
            }
        }
    });
});