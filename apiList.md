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
