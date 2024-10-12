let text = document.getElementById('text');
let bookshelf = document.getElementById('bookshelf');
let hand = document.getElementById('hand');
let coffeeCup = document.getElementById('coffeeCup');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    text.style.marginTop = `${value * 2.5}px`;
    coffeeCup.style.left = `${value * 1.5}px`;
    hand.style.left = `${value * -1.5}px`;
    bookshelf.style.top = `${value * 1}px`;
})