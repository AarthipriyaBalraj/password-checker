import express from "express";
import {dirname} from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const __dirname=dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var authorised=false;

app.use(bodyParser.urlencoded({extended:true}));

function authorisedpassword(req,res,next){
    if (req.body["password"]==="Iloveprogramming"){
        authorised=true;
        console.log("Password is correct here is your secret message");
    }else{   
        authorised=false;
        console.log("Sorry you typed wrong password")
    }
    next();
}


app.get("/", (req, res) => {
  res.sendFile(__dirname+"/public/index.html");
});

app.post("/check",authorisedpassword, (req, res) => {
    if(authorised){
        res.sendFile(__dirname+"/public/secret.html");
    }else{
        res.sendFile(__dirname+"/public/index.html");
    }
  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
