"use strict";
import {$} from "./modules/nQuery.js";
import {Ajax} from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
const getCities = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/continent/country/:city${ev.target.value}`, showCities);
};

/*
 * callback function for the above AJaX
 */
const showCities = function (e) {
    /*
     * here you put the ajax response onto your page DOM
     */
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("getcities");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('Choose City');
    h3.appendChild(txt);
    div.appendChild(h3);
    let cities = JSON.parse(e.target.responseText);
    let sel = document.createElement('select');
    sel.setAttribute('id', 'chooseCity');
    sel.addEventListener('change', getCities);
    var btn = document.createElement("BUTTON");   // Create a <button> element
    btn.innerHTML = "Click me";
    btn.setAttribute('id', 'gdat')
    cities.forEach(function(city) {
        let opt = document.createElement('option');
        opt.setAttribute('value', country.code);
        let opttext = document.createTextNode(city.name);
        opt.appendChild(opttext);
        sel.appendChild(opt);
    });
    div.appendChild(sel);
    div.appendChild(btn);

    $("getcities").appendChild(div);
};

const showStarter = function () {
    $('gcit').addEventListener('click', getCities);
}

window.addEventListener("load", showStarter);                   // kick off JS
