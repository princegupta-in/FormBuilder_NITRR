const express = require('express');
const dbconnect = require("./src/db/Connectdb");
const userrouter = require("./src/routes/userRroute");
const app = express();


dbconnect();
app.use(express.json());
app.use("/api/v1",userrouter);
app.listen(4000,()=>{
    console.log("app is listning");
})

