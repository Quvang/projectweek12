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
const getDataCountry = function(ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile(`/countrydata/${ev.target.value}`, showDataCountry);
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
    sel.addEventListener('change', getDataCountry);
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
const showDataCountry = function (e) {
    console.log(e.target.getResponseHeader("Content-Type"));
    let element = $("countrydata");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let div = document.createElement("div");
    let h3 = document.createElement('h2');
    let txt = document.createTextNode('Country data');
    h3.appendChild(txt);
    div.appendChild(h3);
    let countries = JSON.parse(e.target.responseText);
    let div1 = document.createElement("div");
    let tabel = document.createElement("table");
    let th1 = document.createElement('th');
    let name = document.createTextNode("Name");
    let th2 = document.createElement('th');
    let cc = document.createTextNode("Country Code");
    let th3 = document.createElement('th');
    let con = document.createTextNode("Continent");
    let th4 = document.createElement('th');
    let popu = document.createTextNode("Population");
    let th5 = document.createElement('th');
    let gov = document.createTextNode("Govermentform");
    let th6 = document.createElement('th');
    let del= document.createTextNode("delete");

    th1.appendChild(name);
    th2.appendChild(cc);
    th3.appendChild(con);
    th4.appendChild(popu);
    th5.appendChild(gov);
    th6.appendChild(del);
    tabel.appendChild(th1);
    tabel.appendChild(th2);
    tabel.appendChild(th3);
    tabel.appendChild(th4);
    tabel.appendChild(th5);
    tabel.appendChild(th6);

    countries.forEach(function(country) {

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let name1 = document.createTextNode(country.name);
        let td2 = document.createElement('td');
        let cc1 = document.createTextNode(country.code);
        let td3 = document.createElement('td');
        let con1 = document.createTextNode(country.continent);
        let td4 = document.createElement('td');
        let popu1 = document.createTextNode(country.population);
        let td5 = document.createElement('td');
        let gov1 = document.createTextNode(country.governmentform);
        let td6 = document.createElement('td');
        let form = document.createElement('form');
        form.setAttribute("method", "POST");
        form.setAttribute("action", "/country");

        let input = document.createElement('input');
        input.setAttribute("value", country.name);
        input.setAttribute("name", "slet");
        input.setAttribute("type", "hidden");

        let delB = document.createElement('button');
        let deltext = document.createTextNode("SLET");
        delB.setAttribute('class', "Delete");

        td1.appendChild(name1);
        td2.appendChild(cc1);
        td3.appendChild(con1);
        td4.appendChild(popu1);
        td5.appendChild(gov1);
        form.appendChild(input);
        form.appendChild(delB);
        delB.appendChild(deltext);
        td6.appendChild(form);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tabel.appendChild(tr);
    });

    div1.appendChild(tabel);
    $("countrydata").appendChild(div);
    $("countrydata").appendChild(div1);
};

window.addEventListener("load", getContinents);                   // kick off JS
