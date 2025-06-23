# Devtinder APIs

## authRouter
- POST/signup 
- - Creating or registering the user for first time
- POST/login 
- - login using the registered credential of a user
- POST/logout 
- - logout the user


## profileRouter
- GET/profile/view
- - to get the personal data or viewing the data from the server
- PATCH/profile/edit 
- - Updating the details of a user except email and password
- PATCH/profile/password
- - only for password

## connectionRequestRouter
- POST/request/send/:status/:userId  -- status:{ignored/intrested}

- POST/request/review/:status/:requestId -- status:{accepted/rejected}


## userRouter

- GET/user/requests/received
- - for getting all the request coming to our profile
- GET/user/connections 
- - getting all the connections
- GET/user/feed 
- - Get you the profiles of other users on your feed



# sent or receved connecton status: 

## when sending the connection request
- ingored -> when we left swipe means reject the request of a user

- intrested -> when we right swipe means accept the request of a user

## when receiving the connection request
- accepted -> when someone right swipe means accepted in the request of a user

- rejected -> when someone left swipe means reject the request of a user

 # Deployment
- signup on AWS account with all the personal , contact and billing information
- Launch an EC2 instance 
- Modify the .pem file using command "chmod 400 'devsphere-secret.pem'"
- Login to ur EC2 machine{ubuntu OS} which u have created using SSH connect command "ssh -i 'devsphere-secret.pem' ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com"
- Install the software which Your project require like mine require Node.js
- Git clone the project from github


## Frontend Deployment
- After cloning the frontend and backend repositories get in the frontend project "cd devTinder-web"
- npm install -> install all the dependencies
- npm run build -> it build the project and create a dist folder
- sudo apt update -> it checks updates of local packages and update to the system
- sudo apt install nginx -> it install nginx updated pakage
- sudo systemctl start nginx -> it starts nginx HTTP/HTTPS web server
- sudo systemctl enable nginx -> it enable nginx to listen on ports
- copy code from dist(build files) to /var/www/html
- use this way to copy and paste -> "scp -r dist/* /var/www/html/"
- Enable PORT : 80 of Your Instance

## Backend Deployment
- update db password
- allowed ec2 instance public IP on mongoDB Server
-> pm2 is a prpcess manager which runs the server forever , manage the process and keep it running 24/7
- "npm install pm2 -g" -> install the pm2 package manager
- "pm2 start npm -- start" :- it runs the process  by default 
- "pm2 start npm --name "devSpherebackend" -- start" :- it starts the pm2 process with the custom name
- "pm2 logs" -> to check the logs 
- "pm2 flush npm" :- npm is process application name which is in our case(npm) -> it clear all the logs related to our running application
- "pm2 stop npm"  -> it stops the running processes
- "pm2 delete npm" -> it delete the pm2 processes


## Till here things goes like this

- our frontend and backend running on AWS like this

- Frontend running: http://65.2.57.49/
- Backend running: http://65.2.57.49:3000/

- Now if we map the IP with Domain Name (DNS) , it look like this.' 
- Domain Name => devSphere.com => 65.2.57.49

- Frontend running: devSphere.com
- Backend running: devSphere.com:3000

- map the backend with :- devSphere.com:3000 => devSphere.com/api 

-nginx configuration to map the /api with the backend running PORT:3000
- run this command to edit the nginx congix file at root level or at EC2 machine level: 
- sudo nano /etc/nginx/sites-available/default 

- and configure this things very care fully

- server {
    listen 80;
    server_name yourdomain.com || Your piblic IP : 65.2.57.49;

    location /api/ {
        proxy_pass http://localhost:3000/;  # Forward requests to Node.js on port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    additional configurstion goes here
}

- After configuration restart nginx run this command : "sudo systemctl restart nginx"

- Modify the base url in frontend project from "http://localhost:3000" with "/api"



# Aadding a custom domain name
- purchased domain name from godaddy
- signup on cloudflare & add a new domain name 
- change the nameserver on godaddy and point it to cloudflare
- wait for sometime till your nameserver are updated -15 minutes
- DNS record: A -> singhnavi.life -> 65.2.57.49
- Enable SSL for your website

# Sending Email via SES 
- Create an IAM user
- Give access to AmazonSESFullAccess
- Amazon SES: Create an Identity
- Verify your domain name
- verify your email address
- Install Amazon SDK for JavaScript for v3
- code Examples : https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/ses/src/ses_sendemail.
- Access Credentials created in IAM under security credential tab
- Add the credentials to .env file
- Write code for SES Client
- Make the email dynamic by passing more information


## Keeping our credentials safe using dotenv package
- insatll dotenv in your project
- npm i dotenv
- create a file named ".env" in root of your project
- Put all the secret credentials like connection strings, JWT_SECRET, PORT, AWS_ACCESS_KEY etc..
- add the .env folder in .gitignore file so that it cannot be pushed on github
- Wherever u have hardcoded the value of secret credentials just replace it with process.env.<secret_variable_name> from .env
- In the last , from where ur project starts executing require/import that package, save it and put the code on github

NOTE** -Your secret credentials are known to your local machine only, not even your github can have access to it 


## Pushing code on AWS EC2 machine 
- logged in to your machine using SSH connect with .pem folder password
- get into the backed folder
- pull all the code from github: git pull
- but it will not run the project because here .env file is not present
- We need to manually create a .env file using command "sudo nano .env"
- Paste all your credentials from local machine .env file
- Exit file using CTRL + X and save it by pressing Y
- Now run the pm2 command and run the project

## in frontend project make the BASE_URL dynamic 
- export const BASE_URL = location.hostname == "localhost" ? "http://localhost:3000" : "/api";
- And You are good to go , Run your project


## Scheduling CRON(command run on notice) jobs
- Install node cron jobs from npm : "npm i node-cron"
-  create a file for writing code for scheduling cron jobs in utils/ folder
- Learning about cron expressions syntax - crontabs.guru
- Schedule a cron job
- use date-fns npm package to find date
- Find all the unique email id who have got connection request in previous day
- send Email
- Explore queue mechanism to send bulk email
- Explore Amazon SES Bulk email
- Make sendEmail function dynamic by after amazn ses production access is granted we have hardcoded the value
- bee-queue and bullMQ npm ppackage explore it as an alternative to amazon ses for sending bulk email


## Razorpay Payment Gateway Integration
- sing up on razorpay & complete KYC with complete details
- it takes 3-5 days
- once Your account is verified You get access to your razorpay Dashboard
- Create a component UI for Premium page
- create an API for CreateOrder in backend
- Added my RAZORPAY_KEY_ID and RAZORPAY_SECRET_KEY in .env file
- Initialize razorpay in utils
- creating order on razorPay
- Created schema and model of razorpay payment
- saved the order in "Payment" collection
- make the "/payment/create" API dynamic

### Take reference from this url 
- Ref = https://github.com/razorpay/razorpay-node/blob/master/documents/order.md
- Ref = https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps


## Webhook integration
- after razorpay payment dialog opens and it's working and payment is made successfully , we need to remind the user that your payment is successfull or failed or anything after making payment to razorpay

- so we are validating the payment that it's is success or failure using razorpay webhook integration, that show user a dialog box whether his/her payment is successful or failed to the url endpoint u have configured in your razorpay account for webhook integration 
- so basically u create a webhook url from your webhook's section in your razorpay account 
- While setting the webhook URl , it ask for Webhook secert , set the secret carefully and remember while validating webhook it requires , so add it in .env files
RAZORPAY_WEBHOOK_SECRET="Dummy@$2345"
- Also select the event You want that razorpay will show u on your defined Apiendoint url dialogbox

- please make sure that the webhook url is same as your api endpoint url 
- Both webhookUrl and apiEndpointUrl must be same :- "https://singhnavi.life/payment/success" 

- Ref = https://razorpay.com/docs/webhooks/validate-test/

- This is where u can find the payment details : https://razorpay.com/docs/webhooks/payloads/payments/

## Push code on Ur AWS Machine and check it's working fine or not 
- Don't forgot to add the .evv file SECRET_KEYS to the AWS machine before running the app
Just open the .env file using "sudo nano .env" and copy-paste the secret Key from loacal env files


## update the UI that payment is successful or failed
- create an api so that frontend can verify whether the user is premium or not "/premium/verify"


## Web Socket & Socket.io Socket.js File Documentation
- Real-time chat using web-socket(socket.io) , websocket is an underlying concept and we are going to use the library socket.io 
- Build the UI for a chat window on "/chat/:targetUserId"
- setup socket.io in backend
- intsall socket.io using npm i socket.io
- also install socket.io for client using npm i socket.io-client


This file handles real-time chat functionality for the DevTinder application using Socket.IO WebSocket connections.

## Dependencies
- `socket.io` - For WebSocket server implementation
- `crypto` - For generating secure room IDs

## Functions

### getSecretRoomId(userId, targetUserId)
Generates a unique room identifier for two users to chat privately.
- Takes two user IDs as parameters
- Sorts the IDs alphabetically and joins them with "$" 
- Creates SHA256 hash of the combined string
- Returns deterministic room ID regardless of parameter order

### initializeSocket(server)
Sets up the Socket.IO server with event handlers.
- Configures CORS to allow connections from http://localhost:5173
- Handles three socket events: join-room, send-message, and disconnect

## Socket Events

### join-room
- Receives: firstName, userId, targetUserId
- Creates room ID using getSecretRoomId()
- Adds user's socket to the room
- Logs join activity to console

### send-message  
- Receives: firstName, userId, targetUserId, text
- Generates room ID for the conversation
- Emits "messageReceived" event to all users in that room
- Logs message activity to console

### disconnect
- Currently empty handler for when users disconnect

## Room Management
Uses deterministic room IDs so the same two users always join the same chat room. Room IDs are SHA256 hashes making them secure and unpredictable to outsiders.

## Message Broadcasting
Messages are only sent to users within the same room using Socket.IO's room functionality with `io.to(roomId).emit()`.



## Building Real-Time Live chat feature
- till now we have build the chat system using socket.io so that user can chat in a room using room id or user id
- now we have to store and save that chat so we are going to create chat schema and models so that we can store it in the database
- in models/ create chat.js folder

- Build the UI for a chat window on /chat/:targetUserId
- Setup socket.io in backend
- npm i socket.io
- Setup frontend socket.io-client
- Initialise the chat
- createSocketConnection
- Listen to events
- Homework:  improve the UI
- Homework: Fix Security Bug - auth in web ockets
- Homework: Fix bug - If I'm not fried, then I should not be able to send message
- Homework: feat: Show Green Symbol when online???? - [last Seen 2 hours ago]
- Homework: Limit messages when fetching from DB
