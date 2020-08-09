"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Authentification_1 = require("./Calendar/Authentification");
var Calendrier_1 = require("./Calendar/Calendrier");
var Arrosoir_1 = require("./Arrosoir");
(new Authentification_1.Authorization).authorize().then(function (oauth) {
    var calendrier = new Calendrier_1.Calendrier(oauth);
    calendrier.arrosagesDuJour().then(function (arrosages) {
        var aTraiter = arrosages.filter(function (arrosage) { return arrosage.aTraiter; });
        if (aTraiter.length > 0) {
            var arrosoir = new Arrosoir_1.Arrosoir();
            arrosoir.run();
            console.log(aTraiter);
            calendrier.setDone(aTraiter);
        }
        else {
            console.log('Aucun arrosage à traiter');
        }
    });
});
