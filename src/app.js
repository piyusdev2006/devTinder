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
app.get("/ab?c", (req, res) => {
    res.send({
        name: "Naveen",
        age: 20
    })
})

/*
? , +  , * all have diffrent meanings and can be used in creating routes and we can also group them together 
ex - /ab?c -> /abc , /abbc {b is optional parameter}
- /ab+c -> /abc , /abbc , /abbbbc {b can be repeated any number of times}
- /ab*cd -> abkasjkdhcd {you can add anything in between ab and cd}
*/




app.listen(3000, () => {
    console.log("Server is running on the port 3000..");
    
});