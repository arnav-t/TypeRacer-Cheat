// ==UserScript==
// @name         TypeRacer cheat
// @namespace    https://play.typeracer.com
// @version      0.1
// @description  Become a typing god
// @author       You
// @match        https://play.typeracer.com/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

var timer;
var masterTimer;
var typeTimer;
var keyStrokes = []

function triggerIfRace() {
    console.log('Checking for race...');
    var txt = $('.txtInput');
    if (txt.length == 0) {
        clearInterval(timer);
        return;
    }
    else {
        timer = setInterval(startRace, 500);
    }
}

function startRace() {
    console.log('Race detected!');
    clearInterval(masterTimer);
    var txt = $('.txtInput');
    if (txt.hasClass('txtInput-unfocused')) {
        return;
    }
    else {
        clearInterval(timer);
        console.log('Race started!')
        $('span[unselectable=on]').each(function(i,el) {
            keyStrokes.push(...$(el).text().split(''));
        });
        typeTimer = setInterval(function() {
            var char = keyStrokes.shift();
            if (char === undefined) {
                clearInterval(typeTimer);
                masterTimer = setInterval(triggerIfRace, 1000);
                return;
            }
            else {
                console.log(char);
                var txt = $('.txtInput')[0];
                txt.value += char;
                txt.dispatchEvent(new Event('mousemove'));
            }
        }, 120);
    }
}

(function() {
    'use strict';
    console.log('Cheat enabled!');
    masterTimer = setInterval(triggerIfRace, 1000);
    // Your code here...
})();
