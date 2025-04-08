import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import { connectDb } from "./src/config/db.js";

// connect to db
connectDb();

// listening server
app.listen(process.env.PORT,(req,res)=>{
    console.log("server running on port "+process.env.PORT);
})