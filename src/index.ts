import { Authorization } from "./Calendar/Authentification";
import { Calendrier } from "./Calendar/Calendrier";
import { OAuth2Client } from "google-auth-library";
import { Arrosage } from "./Calendar/Arrosage";
import NodeCache from "node-cache";

(new Authorization).authorize().then((oauth: OAuth2Client) => {
    const calendrier = new Calendrier(oauth);
    
    calendrier.prochainArrosage().then((arrosage: Arrosage) => {
        console.log(arrosage);

        if (arrosage.start < new Date) {

            const cache = new NodeCache();

            const found = cache.get(arrosage.id);

            console.log('aze', found);
        }
    });
});
