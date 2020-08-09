import { Authorization } from "./Calendar/Authentification";
import { Calendrier } from "./Calendar/Calendrier";
import { OAuth2Client } from "google-auth-library";
import { Arrosage } from "./Calendar/Arrosage";
import { Arrosoir } from "./Arrosoir";

(new Authorization).authorize().then((oauth: OAuth2Client) => {
    const calendrier = new Calendrier(oauth);
    
    calendrier.arrosagesDuJour().then((arrosages: Array<Arrosage>) => {

        console.log(arrosages);

        const aTraiter = arrosages.filter((arrosage: Arrosage) => arrosage.aTraiter);

        if (aTraiter.length > 0) {
            // arroser
            const arrosoir = new Arrosoir;

            console.log(aTraiter);

            calendrier.setDone(aTraiter);
        } else {
            console.log('Aucun arrosage à traiter');
        }
    });
});
