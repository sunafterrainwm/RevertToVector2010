// ==UserScript==
// @name         Revert To Vector 2010
// @version      0.0.1
// @author       sunafterrainwm
// @description  Rewrite URLs to force legacy Vector skin when user is not logged in.
// @description:zh  在用户未登入 WMF wikis 时重写网址以强制使用旧版 Vector 皮肤。
// @description:zh-TW  在使用者未登入 WMF wikis 時重寫網址以強制使用舊版 Vector 外觀。
// @description:zh-HK  在用戶未登入 WMF wikis 時重寫網址以強制使用舊版 Vector 外觀。
// @match        *://*.wikimedia.org/*
// @match        *://*.wikipedia.org/*
// @match        *://*.wiktionary.org/*
// @match        *://*.wikiquote.org/*
// @match        *://*.wikibooks.org/*
// @match        *://*.wikisource.org/*
// @match        *://*.wikinews.org/*
// @match        *://*.wikiversity.org/*
// @match        *://*.wikivoyage.org/*
// @match        *://*.mediawiki.org/*
// @match        *://*.wikidata.org/*
// @grant        none
// @run-at       document-idle
// @license      BSD 3-Clause
// @namespace    https://github.com/sunafterrainwm/RevertToVector2010
// @homepageURL  https://github.com/sunafterrainwm/RevertToVector2010
// @supportURL   https://github.com/sunafterrainwm/RevertToVector2010/issues
// @updateURL    https://raw.githubusercontent.com/sunafterrainwm/RevertToVector2010/master/RevertToVector2010.user.js
// @downloadURL  https://raw.githubusercontent.com/sunafterrainwm/RevertToVector2010/master/RevertToVector2010.user.js
// ==/UserScript==
(() => {
    /**
     * @param {() => void} callback
     */
    function readyWrapper(callback) {
        try {
            window.jQuery(callback);
        } catch (e) {
            window.addEventListener('load', callback);
        }
    }

    readyWrapper(() => {
        const mw = window.mw;
        if (
            !mw
            || window.location.pathname === '/w/api.php'
            || mw.config.get('skin') !== 'vector-2022'
            || window.location.search.match(/[?&]useskin=vector-2022(&|$)/)
            || !mw.user.isAnon()
        ) {
            // Not MediaWiki / Api Document / Force Skin / Loginned
            return;
        }
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.delete('useskin');
        newSearchParams.append('useskin', 'vector');
        window.location.search = String(newSearchParams);
    });
})();
