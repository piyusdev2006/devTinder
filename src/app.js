// importing express module 
const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth.js');

// create a new application of express js 
const app = express();


app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your error message here
    res.status(500).send("Something went wrong");
  }
});

// handling request
app.get('/getUserData', (req, res) => {
    // try {
      // logic of DB call and get user data

      throw new Error("Something went wrong");
      res.send("User Data sent");
        
//     } catch (error) {
//         res.status(500).send("Something went wrong");
//    }
    
})

// Order of parameters matter here
app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your error message here
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
    console.log("Server is running on the port 3000..");
    
});