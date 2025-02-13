/* 
    -> handle auth middleware for all types of the routes 
    -> writing a middleware function for all the requests coming to admin api or route and put it on top of all the routes
    -> We don't generally write middleware function code in routing or server file , instead we create a separate folder for and pass it into the api call by requring it in the routing or server file
    -> folder name : middlewares/
*/

const adminAuth = (req, res, next) => {
    console.log("Admin Auth is getting checked");
    const token = "jsdfh";
    const isAadminAuthorized = token === "jsdfh";
    if (!isAadminAuthorized) {
        res.status(401).send("Unauthorized Access");
    } else {
        next();
    }
}; 


const userAuth = (req, res, next) => {
  console.log("User Auth is getting checked");
  const token = "kjdjh";
  const isUserAuthorized = token === "kjdfh";
  if (!isUserAuthorized) {
    res.status(401).send("Unauthorized Access");
  } else {
    next();
  }
}; 

module.exports = {adminAuth, userAuth};
