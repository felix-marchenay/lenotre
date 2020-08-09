"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrosoir = void 0;
var Arrosoir = /** @class */ (function () {
    function Arrosoir() {
    }
    Arrosoir.prototype.run = function () {
        console.log('Activation de la pompe');
        // this.pompeOut.writeSync(1);
        setTimeout(function () {
            // this.pompeOut.writeSync(0);
            console.log('Désactivation.');
        }, 3000);
    };
    return Arrosoir;
}());
exports.Arrosoir = Arrosoir;
