const express = require('express');
const dbconnect = require("./src/db/Connectdb");
const userrouter = require("./src/routes/userRoute");
const formrouter = require("./src/routes/formRoutes");
const responserouter = require("./src/routes/responseRoutes");
const app = express();
const cors = require('cors');

app.use(cors());
dbconnect();
app.use(express.json());
app.use("/api/v1", userrouter);
app.use("/api/v1/form", formrouter);
app.use("/api/v1/form-response", responserouter);
app.listen(4000, () => {
    console.log("app is listning on port 4000");
})
