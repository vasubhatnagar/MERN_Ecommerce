const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling Uncaught Exceptions. 
process.on("uncaughtException", (err) =>{
    console.log(`ERROR :: UNCAUGHT EXCEPTION ${err.message}`);
    console.log(`SHUTTING DOWN THE SERVER DUE TO UNCAUGHT REJECTION`);
    server.close(()=>{
        process.exit(1);
    });
})

//configure dotenv
dotenv.config({
    path:"Backend/config/config.env"
});

connectDatabase();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`App is working fine on ${process.env.PORT}`);
});

process.on("uncaughtException", err =>{
    console.log(`ERROR :: UNHANDLES EXCEPTION ${err.message}`);
    console.log(`SHUTTING DOWN THE sERVER DUE TO UNANDLES PROMISE REJECTION`);
    server.close(()=>{
        process.exit(1);
    });
})