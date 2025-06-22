// ==UserScript==
// @name         Uranium Auto Clicker po nazwach
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Klikanie elementów o nazwach Auto Collector, Shard Multiplier, Conveyor Booster co 30s z odstępem 1s
// @author       You
// @include      *geturanium.io*
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/mxxx3/skrypty/main/uranium.js
// @downloadURL  https://raw.githubusercontent.com/mxxx3/skrypty/main/uranium.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const textsToClick = ["Auto Collector", "Shard Multiplier", "Conveyor Booster"];

    function triggerMouseEvent(node, eventType) {
        const event = new MouseEvent(eventType, {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
        });
        node.dispatchEvent(event);
    }

    function clickElement(el) {
        if (!el) return;
        triggerMouseEvent(el, 'mousedown');
        triggerMouseEvent(el, 'mouseup');
        triggerMouseEvent(el, 'click');
        console.log(`Kliknięto element z tekstem: "${el.textContent.trim()}"`);
    }

    function findElementByText(text) {
        const xpath = `//*[contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${text.toLowerCase()}')]`;
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue;
    }

    function clickAllByText() {
        textsToClick.forEach((text, i) => {
            setTimeout(() => {
                const el = findElementByText(text);
                if (el) {
                    clickElement(el);
                } else {
                    console.warn(`Nie znaleziono elementu z tekstem: "${text}"`);
                }
            }, i * 1000);
        });
    }

    // Klikaj od razu po załadowaniu strony
    clickAllByText();

    // Powtarzaj co 30 sekund
    setInterval(clickAllByText, 30000);

})();
