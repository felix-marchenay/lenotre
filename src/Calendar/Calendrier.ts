import { calendar_v3, google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { Arrosage } from "./Arrosage";

export class Calendrier
{
    private calendrierId: string = 'u2ppdhitu0faoia5oo5e709n8o@group.calendar.google.com';
    private calendar: calendar_v3.Calendar;

    constructor (
        private auth: OAuth2Client
    ) {
        this.calendar = google.calendar({version: "v3", auth: this.auth});
    }

    public prochainArrosage(): Promise<Arrosage> {
        const minuitAujd = new Date();
        minuitAujd.setHours(0);
        minuitAujd.setMinutes(0);

        return new Promise((resolve) => {
            this.calendar.events.list({
                calendarId: this.calendrierId,
                maxResults: 1,
                timeMin: minuitAujd.toISOString()
            }, (err, res) => {
                const element = res.data.items[0];
                resolve(
                    new Arrosage(
                        new Date(element.start.dateTime),
                        element.id
                    )
                );
            });
        });
    }
}