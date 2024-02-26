const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//configure dotenv
dotenv.config({
    path:"Backend/config/config.env"
});

connectDatabase();

app.listen(process.env.PORT, ()=>{
    console.log(`App is working fine on ${process.env.PORT}`);
});