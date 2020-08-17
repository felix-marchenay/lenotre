import { Authorization } from "./Calendar/Authentification";
import { Calendrier } from "./Calendar/Calendrier";
import { OAuth2Client } from "google-auth-library";
import { Arrosage } from "./Calendar/Arrosage";
import { Arrosoir } from "./Arrosoir";
import { Gpio } from "onoff";
import { config } from "dotenv";

config();

console.log(new Date);

(new Authorization(
    process.env.CREDENTIALS,
    process.env.TOKEN
)).authorize().then((oauth: OAuth2Client) => {
    const calendrier = new Calendrier(oauth);
    
    calendrier.arrosagesDuJour().then((arrosages: Array<Arrosage>) => {

        const aTraiter = arrosages.filter((arrosage: Arrosage) => arrosage.aTraiter);
        console.log(arrosages, aTraiter);

        if (aTraiter.length > 0) {
            
            // const arrosoir = new Arrosoir(new Gpio(2, 'out'));

            // arrosoir.run();

            calendrier.setDone(aTraiter);
        } else {
            console.log('Aucun arrosage à traiter');
        }
    });
});
