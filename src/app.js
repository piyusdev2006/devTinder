// importing express module 
const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth.js');

// create a new application of express js 
const app = express();




//   -> handle auth middleware for all types of the routes
app.use('/admin',adminAuth);
// app.use('/user',userAuth);


// handling routes
app.get('/admin/getAllData', (req, res) => {

        res.send("Admin Data sent successfully"); 
})

// Here alos now Auth route not checked 
app.get("/User", userAuth, (req, res) => {
  res.send("User data sent successfully");
});


app.post('/user/login', (req, res) => {
    res.send("User logged in successfully");
});


/*
    -> this code in itself explain why do we need to write middlewares function and pass it into the api call wherever needed

    -> here for every admin api i need to write the logic of checking if the request is authorized, this problem can be solved by writing a middleware function

    -> example:
    app.get("/admin/deleteUser", (req, res) => {
  
        logic of checking if the request is authorized
        const token = "jsdfh";
        const isAadminAuthorized = token === "jsdfh";

       if (isAadminAuthorized) {
         res.send("Admin Deleted a user successfully");
       } else {
         res.status(401).send("Unauthorized Access");
       }
   res.send("Admin Deleted a user successfully");
});
 */



app.get("/admin/deleteUser", (req, res) => {
  
    res.send("Admin Deleted a user successfully");
    
});






app.listen(3000, () => {
    console.log("Server is running on the port 3000..");
    
});