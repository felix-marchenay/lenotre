"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendrier = void 0;
var googleapis_1 = require("googleapis");
var Calendrier = /** @class */ (function () {
    function Calendrier(auth) {
        this.auth = auth;
        this.calendrierId = 'u2ppdhitu0faoia5oo5e709n8o@group.calendar.google.com';
        this.calendar = googleapis_1.google.calendar({ version: "v3", auth: this.auth });
    }
    Calendrier.prototype.arrosagesDuJour = function () {
        var _this = this;
        var minuitAujd = new Date();
        minuitAujd.setHours(0);
        minuitAujd.setMinutes(0);
        return new Promise(function (resolve) {
            _this.calendar.events.list({
                calendarId: _this.calendrierId,
                maxResults: 5,
                singleEvents: false,
                timeMin: minuitAujd.toISOString()
            }, function (err, res) {
                console.log(res.data.items);
                // this.calendar.events.list({
                //     calendarId: this.calendrierId,
                //     maxResults: 5,
                //     singleEvents: true,
                //     timeMin: minuitAujd.toISOString()
                // }, (err2, res2) => {
                //     const events = [...res.data.items, ...res2.data.items];
                //     console.log(events.length + ' events total');
                //     console.log(events);
                //     resolve(
                //         events.map(payload => Arrosage.fromPayload(payload))
                //     );
                // });
            });
        });
    };
    Calendrier.prototype.setDone = function (arrosages) {
        var _this = this;
        arrosages.forEach(function (arrosage) {
            _this.calendar.events.patch({
                calendarId: _this.calendrierId,
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
    };
    return Calendrier;
}());
exports.Calendrier = Calendrier;
