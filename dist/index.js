"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Authentification_1 = require("./Calendar/Authentification");
var Calendrier_1 = require("./Calendar/Calendrier");
var dotenv_1 = require("dotenv");
dotenv_1.config();
console.log(new Date);
(new Authentification_1.Authorization(process.env.CREDENTIALS, process.env.TOKEN)).authorize().then(function (oauth) {
    var calendrier = new Calendrier_1.Calendrier(oauth);
    calendrier.arrosagesDuJour().then(function (arrosages) {
        var aTraiter = arrosages.filter(function (arrosage) { return arrosage.aTraiter; });
        console.log(arrosages, aTraiter);
        if (aTraiter.length > 0) {
            // const arrosoir = new Arrosoir(new Gpio(2, 'out'));
            // arrosoir.run();
            calendrier.setDone(aTraiter);
        }
        else {
            console.log('Aucun arrosage à traiter');
        }
    });
});
