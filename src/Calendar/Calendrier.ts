import { calendar_v3, google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

export class Calendrier
{
    private calendrierId: string = 'u2ppdhitu0faoia5oo5e709n8o@group.calendar.google.com';
    private calendar: calendar_v3.Calendar;

    constructor (private auth: OAuth2Client) {
        this.calendar = google.calendar({version: "v3", auth: this.auth});
    }

    public arrosages() {
        this.calendar.events.list({
            calendarId: this.calendrierId,
            maxResults: 10,
            timeMin: (new Date()).toISOString(),
            singleEvents: true,
        }, (err, res) => {
            console.log(err, res.data.items);
        });
    }
}