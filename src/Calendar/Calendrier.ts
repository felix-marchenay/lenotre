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

    public arrosagesDuJour(): Promise<Array<Arrosage>> {
        const minuitAujd = new Date();
        minuitAujd.setHours(0);
        minuitAujd.setMinutes(0);

        return new Promise((resolve) => {
            this.calendar.events.list({
                calendarId: this.calendrierId,
                maxResults: 5,
                // singleEvents: true,
                timeMin: minuitAujd.toISOString()
            }, (err, res) => {
                resolve(
                    res.data.items.map(payload => Arrosage.fromPayload(payload))
                );
            });
        });
    }

    public setDone(arrosages: Array<Arrosage>): void
    {
        arrosages.forEach((arrosage: Arrosage) => {
            this.calendar.events.update({
                calendarId: this.calendrierId,
                eventId: arrosage.id,
                requestBody: {
                    start: {
                        dateTime: arrosage.start.toISOString()
                    },
                    end: {
                        dateTime: arrosage.end.toISOString()
                    },
                    summary: arrosage.summary + ' -OK'
                }
            });
        });
    }
}