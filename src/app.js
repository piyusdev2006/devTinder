// importing express module 
const express = require('express');

// create a new application of express js 
const app = express();


// handling routes

app.get(
    "/user",
    (req, res, next) => {
        console.log("Handling the route user 2");
        // res.send("Response from the user route handler 2");
        next()
      
    
    }
);

app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user 1");
    res.send("Response from the user route handler 1"); 
    next();
  }
);



app.listen(3000, () => {
    console.log("Server is running on the port 3000..");
    
});