// ==UserScript==
// @name         Auto Click TRX - LejyonMining
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Klikaj TRX jak najszybciej na lejyonmining.netlify.app
// @author       Ty
// @match        https://lejyonmining.netlify.app/*
// @updateURL    https://raw.githubusercontent.com/mxxx3/skrypty/main/trx.js
// @downloadURL  https://raw.githubusercontent.com/mxxx3/skrypty/main/trx.js
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Funkcja klikająca w TRX
    function clickTRX() {
        const target = document.querySelector('#root > div.relative.min-h-screen.bg-black > div > div > div.flex-1.flex.flex-col.items-center.justify-center > div.relative.w-full.h-\\[180px\\].md\\:h-\\[280px\\].lg\\:h-\\[360px\\].rounded-xl.overflow-hidden.mb-6 > img');
        if (target) {
            target.click();
            console.log("Kliknięto TRX");
        } else {
            console.log("Nie znaleziono przycisku TRX");
        }
    }

    // Klikaj co 100 ms (10 razy na sekundę)
    setInterval(clickTRX, 100);
})();
