// ==UserScript==
// @name         Revert To Vector 2010 (Extend)
// @version      0.0.1
// @author       sunafterrainwm
// @description  Rewrite URLs and links in the page to force legacy Vector skin when user is not logged into WMF wikis.
// @description:zh  在用户未登入 WMF wikis 时重写网址及页面中的链接以强制使用旧版 Vector 皮肤。
// @description:zh-TW  在使用者未登入 WMF wikis 時重寫網址及頁面中的連結以強制使用舊版 Vector 外觀。
// @description:zh-HK  在用戶未登入 WMF wikis 時重寫網址及頁面中的連結以強制使用舊版 Vector 外觀。
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
// @updateURL    https://raw.githubusercontent.com/sunafterrainwm/RevertToVector2010/master/RevertToVector2010-extend.user.js
// @downloadURL  https://raw.githubusercontent.com/sunafterrainwm/RevertToVector2010/master/RevertToVector2010-extend.user.js
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

    /**
     * @param {string} link
     */
	function rewriteLink(link) {
		const url = new URL(link);
		if (url.searchParams.has('useskin')) {
			return false;
		}
		url.searchParams.set('useskin', 'vector');
		return url.href;
	}

	// Base on https://github.com/diskdance/VariantAlly/blob/24907c3/gadgets/variant-ally/src/controller.ts
	// Author: diskdance, License: BSD-3-Clause
	function rewriteAnchors() {
		window.jQuery(window.document).on('click auxclick dragstart', (ev) => {
			const target = /** @type {Node} */(ev.target);

			if (target instanceof Element) {
				const anchor = target.closest('a');

				if (anchor) {
					const newLink = rewriteLink(anchor.href);

					if (!newLink) {
						// Link no modify
						return;
					}

					if (ev.originalEvent instanceof DragEvent && ev.originalEvent.dataTransfer) {
						// Modify drag data directly because setting href has no effect in drag event
						for (const type of ev.originalEvent.dataTransfer.types) {
							ev.originalEvent.dataTransfer.setData(type, newLink);
						}
					} else {
						anchor.href = newLink;
					}
				}
			}
		});
	}

	readyWrapper(() => {
		const mw = window.mw;
		if (
			!mw
			|| window.location.pathname === '/w/api.php'
			|| !mw.user.isAnon()
		) {
			// Not MediaWiki / Api Document / Loginned
			return;
		}
		if (!window.location.search.match(/[?&]useskin=]/)) {
			// Not Force Skin
			const newSearchParams = new URLSearchParams(window.location.search);
			newSearchParams.set('useskin', 'vector');
			window.location.search = String(newSearchParams);
		} else if (mw.config.get('skin') === 'vector') {
			// Rewrite All Anchor
			rewriteAnchors();
		}
	});
})();
