"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
var Cache = /** @class */ (function () {
    function Cache(path) {
        if (path === void 0) { path = 'cache/'; }
        this.path = path;
    }
    Cache.prototype.get = function (key) {
    };
    Cache.prototype.set = function (key, value) {
    };
    return Cache;
}());
exports.Cache = Cache;
