import express from "express"
import { oauthUrl, getToken, readEmail } from "./auth.js";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const url = oauthUrl();
    res.send(`<a href="${url}">Auth with google</a>`);
});

app.get('/auth', async (req, res) => {
    try {
        const { code } = req.query;
        const auth = await getToken(code);
        readEmail(auth, res);
    } catch (error) {
        console.log(error);
        throw error;
    }
});

app.listen(port, () => console.log(`Backend server running at http://localhost:${port}`));
