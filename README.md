# 🚀 DevTinder

**A platform where developers connect, interact, and collaborate.**  
Think Tinder, but for developers looking to network, find project partners, and build professional relationships.

---

## 📋 Overview

**DevTinder** is a social networking application tailored for developers. It empowers tech professionals to:

- Showcase their skills, experience, and projects
- Network with like-minded individuals
- Collaborate on exciting ventures
- Seek mentorship or offer guidance

---

## ✨ Features

- 🔐 **User Authentication** – Secure signup & login using JWT
- 👨‍💻 **Developer Profiles** – Showcase skills, education, experience, and projects
- 📝 **Profile Management** – Easily edit profile and skills
- 🔒 **Password Management** – Update password securely
- 🤝 **Social Connections** – Match with devs based on skills and interests

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (with Mongoose)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Password Security:** bcryptjs  
- **Validation:** Custom middleware

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devtinder.git
   cd devtinder

2. **Install dependencies**
   ```bash
   npm install

3. **Create .env file**
   ```bash
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/devtinder
   JWT_SECRET=your_jwt_secret

3. **Run the server**
   ```bash
   npm start

3. **Development mode (with auto-restart)**
   ```bash
   npm run dev


## 🔍 API Endpoints

### 🔐 Authentication

- `POST /auth/signup` – Register a new user  
- `POST /auth/login` – Authenticate a user and return a JWT

### 👤 Profile

- `POST /profile/view` – Retrieve the profile information of a user  
- `PATCH /profile/edit` – Update the user's profile details (name, skills, etc.)  
- `PATCH /profile/edit/password` – Change the user's password securely

## 📁 Code Structure
- src/
├── models/ # Database models (e.g., User, Profile)
├── routes/ # API route handlers for different endpoints
├── middlewares/ # Custom middleware (e.g., authentication, validation)
├── utils/ # Reusable utility/helper functions
└── index.js # Main entry point of the application

## 🔐 Security Features

- **Password Hashing** – User passwords are securely hashed using `bcryptjs` before being stored in the database.

- **JWT Authentication** – JSON Web Tokens are used to manage secure user sessions and authorize API requests.

- **Strong Password Validation** – Enforces strong password requirements to enhance account security.

- **Protected Routes** – Middleware ensures only authenticated users can access protected resources.

## 🤝 Contributing

We welcome contributions! Follow these steps to contribute:

1. **Fork** the repository  
2. **Create a feature branch**  
   ```bash
   git checkout -b feature/amazing-feature


3. **Commit your changes**
   ```bash
   git commit -m "Add some amazing feature"

4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature

5. **Open a pull request**
    ```bash
    Provide a clear description of the feature or fix

    Link any related issues


## 👨‍💻 Authors

**Your Name** – [GitHub Profile](https://github.com/piyusdev2006)  
Made with ❤️ for developers, by developers.
