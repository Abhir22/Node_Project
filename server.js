const express = require("express");
const errorHandler = require("./moddleware/errorHandler");
const connectDB = require("./config/dbConnections");
// import routes
const app = express();

const dotenv = require("dotenv").config();

connectDB();
const port = process.env.PORT || 5000;

//const port = 5000;

//build in middleware used for get data from user or input from user
app.use(express.json());
//middleware 
app.use("/api/contacts" , require("./routes/contactsRoutes"));
//middleware = we use app.use when we use the file of other folder used in project or such as adding midddle ware
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);

});