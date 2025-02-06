// importing express module 
const express = require('express');

// create a new application of express js 
const app = express();

// handling request

// this will match all the HTTP method API calls to test
app.use("/user",(req, res) => {
    res.send("HAHAHAHHHAA...")
})

// this will only handle the GET call to the user
app.get("/user", (req, res) => {
    res.send({ firstName: "Naveen", lastName: "Singh" });
})
app

app.post("/user", (req, res) => {
    // sving data to DB
    res.send("Data Successfully saved to databse");
    
});

app.delete("/user", (req, res) => {
    res.send("Data Successfully deleted from databse");
});
    

app.listen(3000, () => {
    console.log("Server is running on the port 3000..");
    
});