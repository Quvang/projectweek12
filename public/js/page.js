"use strict";
import {$} from "./modules/nQuery.js";
import {Ajax} from "./modules/Ajax.js";

/*
 * Event handler for button - create ajax object and get data
 */
const getContinents = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/continents", showContinents);
};
const getCountries = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/countries/${ev.target.value}`, showCountries);
};
const getCities = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/cities/${ev.target.value}`, showCities);
};
const getWeather = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile("http://api.openweathermap.org/data/2.5/weather?q="+`${ev.target.value}`+"&appid=326f0c938795278b3996cca76932457c", showWeather);
};
/*
 * callback function for the above AJaX
 */
const showContinents = function(e) {
    /*
     * here you put the ajax response onto your page DOM
     */
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("contdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let continents = JSON.parse(e.target.responseText);
    let sel = document.createElement('select');
    sel.setAttribute('id', 'chooseContinent');
    sel.addEventListener('change', getCountries);
    continents.forEach(function(continent) {
        let opt = document.createElement('option');
        let opttext = document.createTextNode(continent.name);
        opt.appendChild(opttext);
        sel.appendChild(opt);
    });
    div.appendChild(sel);
    $("contdata").appendChild(div);
}

const showCountries = function (e) {
    /*
     * here you put the ajax response onto your page DOM
     */
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("countdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('The Countries');
    h3.appendChild(txt);
    div.appendChild(h3);
    let countries = JSON.parse(e.target.responseText);
    let sel = document.createElement('div');
    sel.setAttribute('id', 'chooseCountry');
    sel.addEventListener('change', getCities);
    countries.forEach(function(country) {
        let opt = document.createElement('button');
        let opttext = document.createTextNode(country.name);
        opt.addEventListener('click', getCities);
        opt.setAttribute('value', country.code);
        opt.appendChild(opttext);
        sel.appendChild(opt);
    });
    div.appendChild(sel);
    $("countdata").appendChild(div);
};

const showCities = function (e) {
    /*
     * here you put the ajax response onto your page DOM
     */
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("citydata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('The Cities');
    h3.appendChild(txt);
    div.appendChild(h3);
    let cities = JSON.parse(e.target.responseText);
    let sel = document.createElement('div');
    sel.setAttribute('id', 'chooseCity');
    cities.forEach(function(city) {
        let opt = document.createElement('button');
        let opttext = document.createTextNode(city.name);
        opt.addEventListener('click', getWeather);
        opt.appendChild(opttext);
        sel.appendChild(opt);
    });
    div.appendChild(sel);
    $("citydata").appendChild(div);
};

const showWeather = function (e) {
    /*
     * here you put the ajax response onto your page DOM
     */
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("weatherdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('How is the weather');
    h3.appendChild(txt);
    div.appendChild(h3);
    
    //Weather stuff
    
    $("weatherdata").appendChild(div);
};

const showStarter = function () {
    $('gcont').addEventListener('click', getContinents);
}

window.addEventListener("load", showStarter);                   // kick off JS
