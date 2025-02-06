// importing express module 
const express = require('express');

// create a new application of express js 
const app = express();

// handling request

app.use("/",(req, res) => {
    res.send("Namaste from Dashboard");
})

app.use("/test",(req, res) => {
    res.send("Hello from Naveen")
})

app.use("/hello",(req, res) => {
    res.send("Hello hello hello")
})

app.listen(7777, () => {
    console.log("Server is running on the port 7777..");
    
});