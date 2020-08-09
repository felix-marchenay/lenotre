import { Authorization } from "./Calendar/Authentification";
import { Calendrier } from "./Calendar/Calendrier";
import { OAuth2Client } from "google-auth-library";
import { Arrosage } from "./Calendar/Arrosage";
import { Arrosoir } from "./Arrosoir";
import { Gpio } from "onoff";

(new Authorization).authorize().then((oauth: OAuth2Client) => {
    const calendrier = new Calendrier(oauth);
    
    calendrier.arrosagesDuJour().then((arrosages: Array<Arrosage>) => {

        const aTraiter = arrosages.filter((arrosage: Arrosage) => arrosage.aTraiter);

        if (aTraiter.length > 0) {
            
            const arrosoir = new Arrosoir(new Gpio(2, 'out'));

            arrosoir.run();

            console.log(aTraiter);

            calendrier.setDone(aTraiter);
        } else {
            console.log('Aucun arrosage à traiter');
        }
    });
});
