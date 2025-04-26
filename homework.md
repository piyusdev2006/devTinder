## Homework
- create a repository/folder
- initialize the repository
- Install express 
- create a server
- listen to port 7777
- write request handlers for /test  , /hello
- install nodemon and update scripts inside 
package.json

## Read more about it
- node modules , package.json , package-lock.json
- what are dependencies
- what is the use of "-g" while npm install 
- difference b/w caret and tilda (~ vs ^)


## Github homework

- initialize git
- create a gitignore file and put file and folder which we don't want to push on the github
- create a remote repo on github and connect the local repo with this remote repo 
- push all the local repo on the remote repo.
- play with the routes and routes extensions ex. /hello, / , /hello/2, /xyz



## Important Lesson 
- order of the routes matter most



## HTTP methods
- Install Postman app and make a workspace/collection => test API calls
- Write Logic to handle GET, POST , PATCH, PUT, DELETE and test them on Postman
- POST
- GET
- PATCH
- PUT
- DELETE

## API routes
- Exploring routing and use of ?, +, *, (), in the routes
- use of regex in routes /a/, /.*fly$/
- reading the query params in the routes
- reading the dynaminc routes




/*
? , +  , * all have diffrent meanings and can be used in creating routes and we can also group them together 
ex - /ab?c -> /abc , /abbc {b is optional parameter}
- /ab+c -> /abc , /abbc , /abbbbc {b can be repeated any number of times}
- /ab*cd -> abkasjkdhcd {you can add anything in between ab and cd}
*/


## Middleware and Error handler

- Multiple route handlers - play with the code 
- next()
- next function and errors along with the res.send()
- app.use('/route', rH, [rH2, rH3], rH4, rH4);


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


- what is middlewares
- how express js handles request behind the scenes 
- app.use()  vs app.all() there is small difference b/w routing
- write a dummy auth midddleware for admin
- write a dummy auth middleware for user
- error handling using app.use('/', (err , req, res, next) => {}); put these lines at the end of the code



## Database homeworkk

- create freec cluster on MongoDB official website (mongo atlas)
- Install mongoDB comapass
- Create a config Folder for database configuration with database,js file :- config/database.js
- connect your application to the database "connectionString/devTinder"
- call the connectToDB fucntion and connect to database before starting application on 3000
- create a User Schema & user Model
- create /signup API to add data to database
- push some data using API calls from POSTMAN
- do some error handling using try-catch


- Javascript object vs JSON object {differences}
- Add the express.json() middleware to your app
- Make your signup API to receive data from the end User{server , browser, console}
- User.findOne() with duplicate email , which mongoose object return from the database
- API -> Get user by email
- API -> feed API - GET/feed :- that get all the user from database
- API -> Get user by Id
- API -> create a delete user API
- Difference between PPATCH and PUT
- Explore the Mongoose documentation method specifically for Mongoose Model methods
- What are the options in a Model.findOneAndUpdate method , explore more about it
- API -> create an API to update user data by using userId
- API -> create an API to update user data by using email


## Data Sanitiztion and schema validation
# schema validation
- Explore scehmatype options from the mongoose documentation
- add validation like required, trim, min, minLength , maxLength, lowercase, unique
- Add default
- Create a custom validate function for gender and add runValidators in API
- Improve the DB schema Put all appropriate validations on each feild in schema
- Add timestamp in user schema 
- Data Sanitizaton - Add API validation on patch request and signup post api
- Add API validation for each feild
- install validator npm pakage
- Explore validator library functions and use validator funcs for password, email, photoUrl


## Never trust req.body
