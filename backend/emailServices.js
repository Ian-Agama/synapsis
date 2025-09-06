 import {google} from 'googleapis';
 
 export const googleApi = () => {
    //connecting to the auth client 
    const oauth2Client = new google.auth.OAuth2(
        "972053213679-790p0klreruomigd7vf897q2e3njtd93.apps.googleusercontent.com",
        "",
        "http://localhost:3001/oauth2callback"
    )

    return oauth2Client;

}

// Step 2: Exchange code for token
export async function getToken(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

// Step 3: Fetch user emails
export async function fetchEmails() {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const res = await gmail.users.messages.list({ 
      userId: 'me', 
      maxResults: 5 
    });
    return res.data.messages || []; // Handle case where messages is undefined
  } catch (error) {
    console.error("Error fetching emails:", error.message);
    throw error; // Re-throw for the controller to handle
  }
}
//gooogle.ts7
//export googleApi
/*
v
*/