import "dotenv/config";
import http from "http";
import app from "./app.js";
import connectToDB from "./db/db.connect.js";
import { config, sendMail } from "./utils/mailer.js"

const server = http.createServer(app);

const PORT = process.env.PORT;

await config(
    process.env.USER_EMAIL,
    process.env.APP_PASSWORD,
    process.env.SMTP_HOST,
    process.env.SMTP_PORT

);

//await sendMail("pandeysaurabhraj45@gmail.com", "Otp","Your Otp is:475340");

server.listen(PORT, ()=>{
    console.log(`Server is running very fast on PORT:${PORT}`);
    connectToDB();
});