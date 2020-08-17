"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
                _this.calendar.events.list({
                    calendarId: _this.calendrierId,
                    maxResults: 5,
                    singleEvents: true,
                    timeMin: minuitAujd.toISOString()
                }, function (err2, res2) {
                    var events = __spreadArrays(res.data.items, res2.data.items);
                    console.log(events.length + ' events total');
                    console.log(events);
                    resolve(events.map(function (payload) { return Arrosage_1.Arrosage.fromPayload(payload); }));
                });
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
