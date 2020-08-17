"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
var googleapis_1 = require("googleapis");
var fs = require("fs");
var readline = require("readline");
var Authorization = /** @class */ (function () {
    function Authorization(credentialsPath, tokenPath, scopes) {
        if (scopes === void 0) { scopes = ['https://www.googleapis.com/auth/calendar.events']; }
        this.credentialsPath = credentialsPath;
        this.tokenPath = tokenPath;
        this.scopes = scopes;
    }
    Authorization.prototype.authorize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, _a, client_secret, client_id, redirect_uris, oAuth2Client, token, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        credentials = JSON.parse(fs.readFileSync(this.credentialsPath).toString());
                        _a = credentials.installed, client_secret = _a.client_secret, client_id = _a.client_id, redirect_uris = _a.redirect_uris;
                        oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
                        token = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 2, , 4]);
                        token = this.getLocalToken();
                        console.log('Token trouvé -');
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _b.sent();
                        console.log('UPSSSSSSSSSS', err_1);
                        return [4 /*yield*/, this.generateToken(oAuth2Client)];
                    case 3:
                        token = _b.sent();
                        fs.writeFileSync(this.tokenPath, JSON.stringify(token));
                        return [3 /*break*/, 4];
                    case 4:
                        oAuth2Client.setCredentials(token);
                        return [2 /*return*/, oAuth2Client];
                }
            });
        });
    };
    Authorization.prototype.getLocalToken = function () {
        return JSON.parse(fs.readFileSync(this.tokenPath).toString());
    };
    Authorization.prototype.generateToken = function (oAuth2Client) {
        var authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.scopes,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        return new Promise(function (resolve) {
            rl.question('Enter the code from that page here: ', function (code) {
                rl.close();
                oAuth2Client.getToken(code, function (err, token) {
                    if (err)
                        return console.error('Error retrieving access token', err);
                    resolve(token);
                });
            });
        });
    };
    return Authorization;
}());
exports.Authorization = Authorization;
