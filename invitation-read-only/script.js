function flipCard() {
    const card = document.getElementById('card');
    card.classList.toggle('open');
    if (navigator.vibrate) navigator.vibrate(15);
}

(function syncFromUrl() {
    var params = new URLSearchParams(window.location.search);

    function setText(selector, value) {
        if (value == null || value === '') return;
        var el = document.querySelector(selector);
        if (el) el.textContent = value;
    }

    setText('.rank-text', params.get('rank'));
    setText('.username-text', params.get('name'));
    setText('.date-main', params.get('date'));
    setText('.date-sub', params.get('dateSub'));
    setText('.place-main', params.get('place'));
    setText('.place-sub', params.get('placeSub'));
})();
