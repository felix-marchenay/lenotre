"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrosoir = void 0;
var Arrosoir = /** @class */ (function () {
    function Arrosoir(pompeOut) {
        this.pompeOut = pompeOut;
    }
    Arrosoir.prototype.run = function () {
        var _this = this;
        console.log('Activation de la pompe');
        this.pompeOut.writeSync(1);
        setTimeout(function () {
            _this.pompeOut.writeSync(0);
            console.log('Désactivation.');
        }, 15000);
    };
    return Arrosoir;
}());
exports.Arrosoir = Arrosoir;
