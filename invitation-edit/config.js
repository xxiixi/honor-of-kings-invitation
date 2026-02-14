/**
 * 邀请链接相关配置（编辑页「生成邀请链接」用）
 */
(function (global) {
    global.INVITATION_CONFIG = {
        // 只读邀请页基础地址（生成后的链接会在此基础上追加 ?rank=...&name=... 等参数）
        readOnlyBaseUrl: 'https://aicoding.juejin.cn/pens/7606617272433852454'

        // 本地测试时可将上一行注释，取消下一行注释，并保证同目录下有 invitation-read-only 页面
        // readOnlyBaseUrl: (function () {
        //     var href = location.href;
        //     return href.replace(/\/invitation-edit(\/index\.html)?(\?.*)?$/i, '/invitation-read-only/index.html');
        // })()
    };
})(typeof window !== 'undefined' ? window : this);
