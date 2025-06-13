
const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    
    if (!firstName || !lastName) {
        throw new Error("firstName or lastName is not found");
    }
    else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("please enter strong password.");
    }
};


const validateProfileEditData = (req) => {
    const allowedEditFeilds = [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoUrl",
        "skills",
        "about",
        "email"
    ];

   const isEditAllowed = Object.keys(req.body).every(
        (field) => allowedEditFeilds.includes(field)
    );

    return isEditAllowed;

    
};


const validatePasswordChangeData = (req) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new Error("Old password and new password are required");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("New password must be strong");
    }
    
    if (oldPassword === newPassword) {
      throw new Error("New password must be different from the old password");
    }

  return true;
};

module.exports = {
    validateSignUpData,
    validateProfileEditData,
    validatePasswordChangeData
};