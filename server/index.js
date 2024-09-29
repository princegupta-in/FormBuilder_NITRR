const express = require('express');
const dbconnect = require("./src/db/Connectdb");
const connectcloudinary = require("./src/utils/cloudinary");
const userrouter = require("./src/routes/userRroute");
const formrouter = require("./src/routes/formRoutes");
const responserouter = require("./src/routes/responseRoutes");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
require("dotenv").config();
const app = express();


dbconnect();

app.use(express.json());
connectcloudinary();
app.use(cookieparser());
app.use(cors({
    origin:"*",
    credentials:true,
}));

app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp",
}));
const PORT = process.env.PORT || 4000;
app.use("/api/v1",userrouter);
app.use("/api/v1/form", formrouter);
app.use("/api/v1/form-response", responserouter);
app.listen(PORT,()=>{
    console.log("app is listning");
})
