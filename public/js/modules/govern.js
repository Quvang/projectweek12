"use strict";
import {$} from "./modules/nQuery.js";
import {Ajax} from "./modules/Ajax.js";

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
const getLanguage = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/languages/${ev.target.value}`, showLang);
};
//Show Continents
const showContinents = function(e) {
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
        opt.setAttribute("value", continent.name);
        opt.appendChild(opttext);
        sel.appendChild(opt);
    });
    div.appendChild(sel);
    $("contdata").appendChild(div);
}
//Show Countries
const showCountries = function (e) {
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("countdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h3');
    let txt = document.createTextNode('Countries');
    h3.appendChild(txt);
    div.appendChild(h3);
    let countries = JSON.parse(e.target.responseText);
    let sel = document.createElement('select');
    sel.setAttribute('id', 'chooseCountry');
    sel.addEventListener('change', getLanguage);
    countries.forEach(function(country) {
        let opt = document.createElement('option');
        let opttext = document.createTextNode(country.name);
        opt.setAttribute("value", country.code);
        opt.appendChild(opttext);
        sel.appendChild(opt);
    });
    div.appendChild(sel);
    $("countdata").appendChild(div);
};
//Show Country data
const showLang = function (e) {
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("langdata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h2');
    let txt = document.createTextNode('Language');
    h3.appendChild(txt);
    div.appendChild(h3);
    let languages = JSON.parse(e.target.responseText);
    let div1 = document.createElement("div");
    let tabel = document.createElement("table");
    let th1 = document.createElement('th');
    let name = document.createTextNode("Name");
    let th2 = document.createElement('th');
    let cc = document.createTextNode("Country Code");
    let th3 = document.createElement('th');
    let off = document.createTextNode("Official");
    let th4 = document.createElement('th');
    let per = document.createTextNode("Percentage");
    
    th1.appendChild(name);
    th2.appendChild(cc);
    th3.appendChild(off);
    th4.appendChild(per);
    tabel.appendChild(th1);
    tabel.appendChild(th2);
    tabel.appendChild(th3);
    tabel.appendChild(th4);

    languages.forEach(function(countrylanguage) {
        
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let name1 = document.createTextNode(countrylanguage.language);
        let td2 = document.createElement('td');
        let cc1 = document.createTextNode(countrylanguage.countrycode);
        let td3 = document.createElement('td');
        let off1 = document.createTextNode(countrylanguage.isofficial);
        let td4 = document.createElement('td');
        let per1 = document.createTextNode(countrylanguage.percentage);

        td1.appendChild(name1);
        td2.appendChild(cc1);
        td3.appendChild(off1);
        td4.appendChild(per1);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tabel.appendChild(tr);
    });

    div1.appendChild(tabel);
    $("langdata").appendChild(div);
    $("langdata").appendChild(div1);
};

window.addEventListener("load", getContinents);                   // kick off JS

