
const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    
    if (!firstName || !lastName) {
        throw new Error("firstName or lastName is not found");
    }
    else if (!validator.isEmail(email)) {
        // console.log(email);
        throw new Error("Email is not valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("please enter strong password.");
    }
};

module.exports = {
    validateSignUpData
};