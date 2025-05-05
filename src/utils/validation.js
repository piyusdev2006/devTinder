
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


const validateProfileEditData = (req) => {
    const allowedEditFeilds = [
        "firstName",
        "LastName",
        "age",
        "gender",
        "photoUrl",
        "skills",
        "about",
        "email"
    ];

    // loop through each feild given in the allowedEdit field returns true or false 
   const isEditAllowed = Object.keys(req.body).every(
        (field) => allowedEditFeilds.includes(field)
    );

    return isEditAllowed;

    
};

module.exports = {
    validateSignUpData,
    validateProfileEditData
};