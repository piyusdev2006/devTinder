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