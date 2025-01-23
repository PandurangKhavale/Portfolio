// JavaScript to enhance the portfolio website

document.addEventListener('DOMContentLoaded', () => {
    // Wave animation interaction
    const waveElement = document.querySelector('.wave');
    if (waveElement) {
        waveElement.addEventListener('mouseover', () => {
            waveElement.style.animation = 'wave-animation 1.5s infinite';
        });

        waveElement.addEventListener('mouseleave', () => {
            waveElement.style.animation = '';
        });
    }

    // Add hover effect to social media icons
    const socialIcons = document.querySelectorAll('.social-links a img');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.2s';
        });

        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1)';
        });
    });
});

// Keyframes for wave animation
const style = document.createElement('style');
style.textContent = `
@keyframes wave-animation {
    0%, 100% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(15deg);
    }
    50% {
        transform: rotate(-10deg);
    }
    75% {
        transform: rotate(15deg);
    }
}`;

document.head.appendChild(style);
