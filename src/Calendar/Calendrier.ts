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
        const moins5H = new Date();
        const plus5H = new Date();
        moins5H.setHours(moins5H.getHours() - 5);
        plus5H.setHours(plus5H.getHours() + 5);

        return new Promise((resolve) => {
            this.calendar.events.list({
                calendarId: this.calendrierId,
                maxResults: 3,
                singleEvents: true,
                timeMin: moins5H.toISOString(),
                timeMax: plus5H.toISOString()
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
            this.calendar.events.patch({
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