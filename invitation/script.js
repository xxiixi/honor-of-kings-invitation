function flipCard() {
    const card = document.getElementById('card');
    card.classList.toggle('open');
    if (navigator.vibrate) navigator.vibrate(15);
}
