import express from "express"
import {google} from "googleapis"
import { googleApi } from "./emailServices.js"   
//import { openAsBlob } from "fs"
import cors from "cors"


const app = express()
const port = 3001 
app.use(cors());
app.get('/', async(req, res )=> 
{
    res.send("Google Oath ssr demo")
})

app.get('/auth', async (req,res) => {
    try {
        const ouath2Client = googleApi();
        const url = ouath2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ["https://www.googleapis.com/auth/gmail.readonly"] // Correct scope
        })  
        res.json({status :200,url})
    }catch( error){
        console.log(error); // sends an error if the message is not met 
    }
})
app.get('/auth/callback', async (req,res)=>{
    try{
        const code = req.query.code;
        const {oauth2Client} = await getTokens(code);
        const emails = await fetchEmails(oauth2Client);
        res.json({emails});

    }catch(error){
        console.log(error);

    }
})
app.listen(port, ()=> {
    console.log(`port is listening ${port}`)
});
