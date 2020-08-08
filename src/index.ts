import { Authorization } from "./Calendar/Authentification";
import { Calendrier } from "./Calendar/Calendrier";
import { OAuth2Client } from "google-auth-library";

(new Authorization).authorize().then((oauth: OAuth2Client) => {
    const calendrier = new Calendrier(oauth);
    
    calendrier.prochainArrosage();
});
