// importing express module 
const express = require('express');
const { connectToDB } = require('./config/database');
const app = express();
const User = require('./models/user');

// 

app.use(express.json());


app.post('/signup', async (req, res) => {
  /*
  console.log(req.body );
  req.body is exactly same as the given defined object which we send through postman
  {
    firstName: "Naveen",
    lastName: "Singh",
    email: "FtYlS@example.com",
    password: "123456",
  */

  // creating a new instance of the User Model
  const user = new User(req.body);

  // always use try-catch whenever make an asynchronous call
  try {
    // saving the user in the database
    await user.save();
    res.send("User saved successfully");
  } catch (error) {
    res.status(500).send("Error saving  the user: ", error.message);
  }
})


connectToDB()
    .then(() => {
      console.log("Database connection successful");
      app.listen(3000, () => {
        console.log("Server is running on the port 3000..");
      });
    })
    .catch((err) => {
  console.error("Database connection lost");
});


