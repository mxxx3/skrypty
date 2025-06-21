// ==UserScript==
// @name         LejyonMining Reklamy + Auto TRX
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Klikanie dwóch reklam na zmianę oraz TRX co 100 ms na lejyonmining.netlify.app
// @author       Ty
// @match        https://lejyonmining.netlify.app/*
// @updateURL    https://raw.githubusercontent.com/mxxx3/skrypty/main/lejyon-auto.user.js
// @downloadURL  https://raw.githubusercontent.com/mxxx3/skrypty/main/lejyon-auto.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ====== MODUŁ 1: REKLAMY ======
    let reklamaTrwa = false;
    let kolejnaReklama = 1;

    const SELECTOR_REKLAMA_1 = '#root > div.relative.min-h-screen.bg-black > div > div > div.flex-1.flex.flex-col.items-center.justify-center > div.flex.flex-col.sm\:flex-row.items-center.justify-center.gap-4.mt-4 > div > button:nth-child(1) > div > img';

    const SELECTOR_REKLAMA_2 = '#root > div.relative.min-h-screen.bg-black > div > div > div.flex-1.flex.flex-col.items-center.justify-center > div.flex.flex-col.sm\:flex-row.items-center.justify-center.gap-4.mt-4 > div > button:nth-child(2) > div > img';

    function kliknijReklame(selector) {
        if (reklamaTrwa) return;

        const przycisk = document.querySelector(selector);
        if (przycisk) {
            console.log(`[AutoReklama] Klikam reklamę: ${selector}`);
            przycisk.click();
            reklamaTrwa = true;

            setTimeout(() => {
                kliknijXwIframe(() => {
                    reklamaTrwa = false;
                    kolejnaReklama = kolejnaReklama === 1 ? 2 : 1;
                    setTimeout(() => startCykl(), 2000);
                });
            }, 20000);
        } else {
            console.warn('[AutoReklama] Nie znaleziono przycisku reklamy!');
        }
    }

    function kliknijXwIframe(callback) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                const xBtn = iframeDoc.querySelector('svg[viewBox="0 0 14 14"]');
                if (xBtn) {
                    console.log('[AutoReklama] Klikam X w iframe!');
                    xBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                } else {
                    console.warn('[AutoReklama] Nie znaleziono przycisku X w iframe.');
                }
            } catch (e) {
                console.error('[AutoReklama] Błąd dostępu do iframe (cross-origin?):', e);
            }
        } else {
            console.warn('[AutoReklama] iframe nie istnieje — możliwe, że reklama sama się zamknęła.');
        }

        if (typeof callback === 'function') callback();
    }

    function startCykl() {
        if (kolejnaReklama === 1) {
            kliknijReklame(SELECTOR_REKLAMA_1);
        } else {
            kliknijReklame(SELECTOR_REKLAMA_2);
        }
    }

    setTimeout(() => {
        startCykl();
    }, 3000);

    setInterval(startCykl, 5000);


    // ====== MODUŁ 2: AUTO KLIK TRX ======
    function clickTRX() {
        const target = document.querySelector('#root > div.relative.min-h-screen.bg-black > div > div > div.flex-1.flex.flex-col.items-center.justify-center > div.relative.w-full.h-\\[180px\\].md\\:h-\\[280px\\].lg\\:h-\\[360px\\].rounded-xl.overflow-hidden.mb-6 > img');
        if (target) {
            target.click();
            console.log("[AutoTRX] Kliknięto TRX");
        }
    }

    setInterval(clickTRX, 100);

})();
