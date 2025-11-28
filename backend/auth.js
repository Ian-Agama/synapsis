import { google } from "googleapis";
import credentials from "./credentials.json" with { type: "json" };
import { OAuth2Client } from "google-auth-library";

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

export const oauth2client = new OAuth2Client({
    clientId: credentials.web.client_id,
    clientSecret: credentials.web.client_secret,
    redirectUri: credentials.web.redirect_uris[0],
});

export function oauthUrl() {
    return oauth2client.generateAuthUrl({
        scope: SCOPES,
        access_type: "offline",
        prompt: "consent"
    });
}

export async function getToken(code) {
    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);
    return oauth2client;
}

export async function readEmail(auth, res) {
    const gmail = google.gmail({ version: 'v1', auth });

    const response = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 10,
    });

    const messages = response.data.messages;
    if (messages.length) {
        res.send(`
            <h2>Last 10 messages:</h2>
            <ul>
                ${messages.map(message => `<li>${message.id}<li>${message.payload}</li></li>`)} 
            </ul>
        `);
    } else {
        res.send('<p>No messages found.</p>');
    }
}