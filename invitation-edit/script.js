(function initEditPage() {
    function enforceMaxLength(el) {
        var max = parseInt(el.getAttribute('data-maxlength'), 10);
        if (isNaN(max) || max < 0) return;
        var text = el.textContent || '';
        if (text.length > max) {
            el.textContent = text.slice(0, max);
            placeCaretAtEnd(el);
        }
    }
    function placeCaretAtEnd(el) {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
    document.querySelectorAll('[contenteditable="true"][data-maxlength]').forEach(function (el) {
        el.addEventListener('input', function () { enforceMaxLength(el); });
        el.addEventListener('paste', function (e) {
            e.preventDefault();
            var text = (e.clipboardData || window.clipboardData).getData('text').slice(0, parseInt(el.getAttribute('data-maxlength'), 10));
            var len = (el.textContent || '').length;
            var left = Math.max(0, parseInt(el.getAttribute('data-maxlength'), 10) - len);
            document.execCommand('insertText', false, text.slice(0, left));
        });
    });

    function getText(selector) {
        var el = document.querySelector(selector);
        return el ? (el.textContent || '').trim() : '';
    }

    function getReadOnlyBaseUrl() {
        var base = (window.INVITATION_CONFIG && window.INVITATION_CONFIG.readOnlyBaseUrl) || '';
        return typeof base === 'function' ? base() : base;
    }

    function buildInviteUrl() {
        var params = new URLSearchParams();
        var rank = getText('.rank-text');
        var name = getText('.username-text');
        var date = getText('.date-main');
        var dateSub = getText('.date-sub');
        var place = getText('.place-main');
        var placeSub = getText('.place-sub');
        if (rank) params.set('rank', rank);
        if (name) params.set('name', name);
        if (date) params.set('date', date);
        if (dateSub) params.set('dateSub', dateSub);
        if (place) params.set('place', place);
        if (placeSub) params.set('placeSub', placeSub);
        var base = getReadOnlyBaseUrl();
        var query = params.toString();
        return query ? base + '?' + query : base;
    }

    var btn = document.getElementById('btnGenerate');
    var output = document.getElementById('generatedUrl');
    var btnCopyAll = document.getElementById('btnCopyAll');
    if (btn && output) {
        btn.addEventListener('click', function () {
            var url = buildInviteUrl();
            output.value = url;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(function () {
                    output.placeholder = '已复制到剪贴板，可发给好友打开只读邀请页';
                }).catch(function () {
                    output.placeholder = '请点击「复制全部」按钮复制链接';
                });
            } else {
                output.placeholder = '请点击「复制全部」按钮复制链接';
            }
        });
    }
    if (btnCopyAll && output) {
        btnCopyAll.addEventListener('click', function () {
            var url = output.value ? output.value.trim() : '';
            if (!url) return;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(function () {
                    btnCopyAll.textContent = '已复制';
                    setTimeout(function () { btnCopyAll.textContent = '复制全部'; }, 1500);
                }).catch(function () {
                    output.placeholder = '请手动选择上方链接后复制';
                });
            } else {
                output.placeholder = '请手动选择上方链接后复制';
            }
        });
    }
})();
