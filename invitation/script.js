function flipCard() {
    const card = document.getElementById('card');
    card.classList.toggle('open');
    if (navigator.vibrate) navigator.vibrate(15);
}

(function loadConfig() {
    function getByPath(obj, path) {
        var keys = path.split('.');
        for (var i = 0; i < keys.length; i++) {
            if (obj == null) return undefined;
            obj = obj[keys[i]];
        }
        return obj;
    }

    function setText(el, value, isHtml) {
        if (value == null || value === '') return;
        if (isHtml) {
            el.innerHTML = String(value).replace(/\n/g, '<br>');
        } else {
            el.textContent = value;
        }
    }

    function applyConfig(config) {
        if (!config || !config.inside) return;
        document.querySelectorAll('[data-config]').forEach(function (el) {
            var key = el.getAttribute('data-config');
            if (key.indexOf('inside.') !== 0) return;
            var value = getByPath(config, key);
            if (value == null) return;
            var useHtml = key === 'inside.stampText';
            setText(el, value, useHtml);
        });
    }

    function mergeParams(config, params) {
        if (!params || !config.inside) return config;
        if (params.get('rank')) config.inside.rank = params.get('rank');
        if (params.get('name')) config.inside.name = params.get('name');
        if (params.get('date')) config.inside.dateMain = params.get('date');
        if (params.get('dateSub')) config.inside.dateSub = params.get('dateSub');
        if (params.get('place')) config.inside.placeMain = params.get('place');
        if (params.get('placeSub')) config.inside.placeSub = params.get('placeSub');
        return config;
    }

    var params = new URLSearchParams(window.location.search);

    function tryApply(config) {
        if (config && config.inside) applyConfig(mergeParams(config, params));
    }

    var config = {
        inside: {
            rank: '宇宙最强王者荣耀高手',
            name: '少先队大队长',
            dateMain: '2026.02.15 21:00(周日)',
            dateSub: '乙巳年 腊月廿八 亥时',
            placeMain: '王者荣耀五排房间',
            placeSub: 'No.TAKEmeFly666',
            stampText: '上分\n大吉'
        }
    };

    tryApply(mergeParams(config, params));
})();
