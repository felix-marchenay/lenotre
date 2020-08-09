import { google } from "googleapis";
import fs = require('fs');
import readline = require('readline');
import { Credentials, OAuth2Client } from "google-auth-library";

export class Authorization
{
    constructor(
        private credentialsPath: string = 'credentials.json',
        private tokenPath: string = 'token.json',
        private scopes: Array<string> = ['https://www.googleapis.com/auth/calendar.events']
    ){}

    public async authorize(): Promise<OAuth2Client> {

        const credentials = JSON.parse(fs.readFileSync(this.credentialsPath).toString());

        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        let token = null;
        try {
            token = this.getLocalToken();
            console.log('Token trouvé -');
        } catch (err) {
            console.log('UPSSSSSSSSSS', err);
            token = await this.generateToken(oAuth2Client);
            fs.writeFileSync(this.tokenPath, JSON.stringify(token));
        }

        oAuth2Client.setCredentials(token);

        return oAuth2Client;
    }

    private getLocalToken(): Credentials {
        return JSON.parse(fs.readFileSync(this.tokenPath).toString());
    }

    private generateToken(oAuth2Client: OAuth2Client): Promise<Credentials> {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.scopes,
        });

        console.log('Authorize this app by visiting this url:', authUrl);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve) => {
            rl.question('Enter the code from that page here: ', (code) => {
                rl.close();
    
                oAuth2Client.getToken(code, (err, token: Credentials) => {
                    if (err) return console.error('Error retrieving access token', err);    
                    resolve(token);
                });
            });
        });
    }
}