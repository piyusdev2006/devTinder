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

 