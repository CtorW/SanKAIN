const reel = document.querySelector('.reel');
const spinButton = document.querySelector('#spin-button');
const customCursor = document.querySelector('.cursor');
const parallaxShapes = document.querySelectorAll('.shape');
const logo = document.querySelector('.logo');

const restaurants = [
    'Jollibee', 'Chowking', 'Mang Inasal', 'Greenwich',
    'Tropical Hut', 'Red Ribbon', 'Goldilocks', "McDonald's",
    'KFC', 'Pizza Hut', "Shakey's", 'Burger King',
    'Taco Bell', 'Popeyes', 'Tokyo Tokyo', 'Yellow Cab',
    'Potato Corner', 'Karinderya', 'Street Food'
];

const ITEM_HEIGHT = 90;
let isSpinning = false;

window.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';

    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;

    parallaxShapes.forEach(shape => {
        const speed = shape.getAttribute('data-speed');
        shape.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
    });
});

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

function populateReel() {
    const fullReelList = [...shuffle([...restaurants]), ...shuffle([...restaurants]), ...shuffle([...restaurants])];
    reel.innerHTML = '';

    fullReelList.forEach(name => {
        const item = document.createElement('div');
        item.className = 'reel-item';
        item.textContent = name;
        reel.appendChild(item);
    });

    return fullReelList;
}

function spin() {
    if (isSpinning) return;
    isSpinning = true;
    spinButton.disabled = true;

    const fullReelList = populateReel();
    reel.style.transition = 'none';
    reel.style.transform = 'translateY(0)';

    setTimeout(() => {
        const winnerIndex = Math.floor(Math.random() * restaurants.length);
        const targetIndex = restaurants.length + winnerIndex;
        const targetPosition = targetIndex * ITEM_HEIGHT;

        reel.style.transition = 'transform 5s cubic-bezier(0.2, 1, 0.4, 1)';
        reel.style.transform = `translateY(-${targetPosition}px)`;
    }, 50);
}

reel.addEventListener('transitionend', () => {
    isSpinning = false;
    spinButton.disabled = false;
});

spinButton.addEventListener('click', spin);

const addHoverEffect = () => customCursor.classList.add('hover-effect');
const removeHoverEffect = () => customCursor.classList.remove('hover-effect');

spinButton.addEventListener('mouseenter', addHoverEffect);
spinButton.addEventListener('mouseleave', removeHoverEffect);
logo.addEventListener('mouseenter', addHoverEffect);
logo.addEventListener('mouseleave', removeHoverEffect);

populateReel();