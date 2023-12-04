const express = require("express");
const errorHandler = require("./moddleware/errorHandler");
const connectDB = require("./config/dbConnections");
// import routes
const app = express();

const dotenv = require("dotenv").config();

connectDB();
const port = process.env.PORT || 5000;
//middleware 
app.use(express.json());

app.use("/api/contacts" , require("./routes/contactsRoutes"));
app.use("/api/users" , require("./routes/userRoutes"));

app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);

});