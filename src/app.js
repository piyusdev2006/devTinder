// importing express module 
const express = require('express');

// create a new application of express js 
const app = express();


// handling routes

/*
multpli route handlers signatures r1 r2 r3 r4 r5 reperesent request handler functions
app.use('/user' , r1 , r2 , r3 , r4 , r5);
or
app.use('/user' , [r1 , r2 , r3 , r4 , r5]);
or
app.use('/user' , (r1 , r2 , r3 , r4 , r5));
or
app.use('/user' , [r1 , r2 , r3 , r4] , r5);
 */

app.use(
  "/user",
  [(req, res, next) => {
    console.log("Handling the route user 1");
    next();
    // res.send("Response from the user route handler 1");
  },
  (req, res, next) => {
    console.log("Handling the route user 2");
    //   res.send("Response from the user route handler 2");
    next();
  },
],
  (req, res, next) => {
    console.log("Handling the route user 3");
    // res.send("Response from the user route handler 3");
    next();
  },

  (req, res, next) => {
    console.log("Handling the route user 4");
    // res.send("Response from the user route handler 4");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 5");
    res.send("Response from the user route handler 5");
    // next();
  }
);



app.listen(3000, () => {
    console.log("Server is running on the port 3000..");
    
});