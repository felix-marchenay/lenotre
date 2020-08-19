"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendrier = void 0;
var googleapis_1 = require("googleapis");
var Arrosage_1 = require("./Arrosage");
var Calendrier = /** @class */ (function () {
    function Calendrier(auth) {
        this.auth = auth;
        this.calendrierId = 'u2ppdhitu0faoia5oo5e709n8o@group.calendar.google.com';
        this.calendar = googleapis_1.google.calendar({ version: "v3", auth: this.auth });
    }
    Calendrier.prototype.arrosagesDuJour = function () {
        var _this = this;
        var moins5H = new Date();
        var plus5H = new Date();
        moins5H.setHours(moins5H.getHours() - 5);
        plus5H.setHours(plus5H.getHours() + 5);
        return new Promise(function (resolve) {
            _this.calendar.events.list({
                calendarId: _this.calendrierId,
                maxResults: 3,
                singleEvents: true,
                timeMin: moins5H.toISOString(),
                timeMax: plus5H.toISOString()
            }, function (err, res) {
                resolve(res.data.items.map(function (payload) { return Arrosage_1.Arrosage.fromPayload(payload); }));
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
