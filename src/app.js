// importing express module 
const express = require('express');
const connectToDB  = require('./config/database');
const app = express();
const User = require('./models/user');


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
});

// Get User by email
app.get("/user", async (req, res) => {
  const usersEmail = req.body.email;

  try {
    // finding just one userof the same name or email
    const user = await User.findOne({ email: usersEmail });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }

    // finding all the users of the same name or email
    
    // const users = await User.findOne({ email: usersEmail });
    // if (users.length === 0) {
    //   res.status(404).send("user not found");
    // } else {
    //   res.send(users);
    // }
  } catch (error) {
    res.status(400).send("server error")
  }
});

// Feed API - GET/feed - get all the users from the database
app.get("/feed", async (req, res) => {

  try {
    const users = await User.find({});
    res.send(users);
    
  } catch (error) {
    res.status(400).send("server error");
  }
});

// Delete API --> delete the user by his userId from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // both are same according to the mongoose documentation
    // const user = await User.findByIdAndDelete({ _id: userId });
    const user = await User.findByIdAndDelete(userId);
    res.status(200).send("user deleted successfully");

  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

// Update data of the User
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    // update document by passing options and it will return the document after or before as per the given option 
    // const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "before" });
    // console.log(user);
    
    // update without passing options and it will return the document before update by default
    const user1 = await User.findByIdAndUpdate({ _id: userId }, data);
    console.log(user1);
    res.send("user updated sucessfully");
    
  } catch (error) {
    res.status(400).send("something went wrong");
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


