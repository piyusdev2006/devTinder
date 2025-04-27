// importing express module 
const express = require('express');
const { connectToDB }  = require('./config/database');
const app = express();
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcryptjs');


app.use(express.json());

// creation and validation of signUp API and password encryption is also done
app.post('/signup', async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;
    
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
  

    // creating a new instance of the User Model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    // always use try-catch whenever make an asynchronous call

    // saving the user in the database
    await user.save();
    res.send("User saved successfully");
} catch (error) {
    res.status(400).send("Error: " + error.message);
}
});

// creating login API
app.post("/login", (req, res) => {
  
})

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
    res.status(400).send("server error" + error.message)
  }
});

// Feed API - GET/feed - get all the users from the database
app.get("/feed", async (req, res) => {

  try {
    const users = await User.find({});
    res.send(users);
    
  } catch (error) {
    res.status(400).send("server error" + error.message);
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
    res.status(400).send("something went wrong" + error.message);
  }
});

// Update data of the User
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATE = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "password"
    ];

    const isUpdateAllowed = Object.keys(data).every(
      (k) => ALLOWED_UPDATE.includes(k)
    );
    
    if (!isUpdateAllowed) {
      throw new Error("update not allowed")
    }
     
    const { skills } = req.body;
    if (skills && skills.length > 7) {
      return res
        .status(400)
        .json({ message: "You can only provide up to 7 skills." });
    }
    // update document by passing options and it will return the document after or before as per the given option 
    // const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "before" });
    // console.log(user);
    
    // update without passing options and it will return the document before update by default
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated sucessfully");
    
  } catch (error) {
    res.status(400).send("UPDATE FAILED: " + error.message);
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


