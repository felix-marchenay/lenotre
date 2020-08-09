"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrosage = void 0;
var Arrosage = /** @class */ (function () {
    function Arrosage(start, end, id, summary) {
        this.start = start;
        this.end = end;
        this.id = id;
        this.summary = summary;
    }
    Object.defineProperty(Arrosage.prototype, "enCours", {
        get: function () {
            var now = new Date;
            return now < this.end && now > this.start;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Arrosage.prototype, "done", {
        get: function () {
            return this.summary.match(/-OK/) !== null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Arrosage.prototype, "aTraiter", {
        get: function () {
            return !this.done && this.enCours;
        },
        enumerable: false,
        configurable: true
    });
    Arrosage.fromPayload = function (payload) {
        return new Arrosage(new Date(payload.start.dateTime), new Date(payload.end.dateTime), payload.id, payload.summary === undefined ? '' : payload.summary);
    };
    return Arrosage;
}());
exports.Arrosage = Arrosage;
