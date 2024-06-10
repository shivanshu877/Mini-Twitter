# Mini Twitter 🐦

This is a full-stack Twitter clone application built with Node.js, Express, TypeScript, MongoDB, React, and Cloudinary. It allows users to register, log in, create/edit/delete tweets with images or videos, follow/unfollow users, and view a timeline of tweets from followed users. Users can also upload media for their tweets using Cloudinary.

## 🚀 Live Demo

Visit the live demo: [Mini Twitter 🎉](https://mini-twitter-kohl.vercel.app/loginsignup)

## ✨ Features

### Backend

- 📝 User registration with a unique username and password
- 🔒 User authentication using JWT (JSON Web Tokens)
- 🖋️ Create, edit, and delete tweets with optional image or video uploads
- 🔄 Follow/unfollow users
- 🕒 View timeline of tweets from followed users in chronological order
- 👥 View followers and following users
- 👤 See your own posts

### Frontend

- 🔑 User login and signup
- 🏠 Home page displaying tweets from followed users with images or videos
- 📋 Users section to see and follow/unfollow all users
- 📅 View posts from followed users on the home screen
- 👥 Followers and following sections showing usernames
- 📝 My posts section to see and manage your own posts (edit/delete)
- 📷 Create post section with content and media upload functionality using Cloudinary
- 👤 Profile section displaying the user's name
- 🚪 Logout button to log out

## 🛠️ Technologies Used

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt for password hashing

### Frontend

- React
- Axios
- Cloudinary for media uploads

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>=14.x)
- npm (>=6.x)
- MongoDB

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/twitter-clone.git
    cd twitter-clone/backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your environment variables:

    ```env
    MONGODB_URI=mongodb://localhost:27017/twitter-clone
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

4. Start the server:

    ```bash
    npm start
    ```

    The server will start on the port specified in the `.env` file (default is 3000).

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd ../frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add your environment variables:

    ```env
    REACT_APP_API_URL=http://localhost:3000
    REACT_APP_cloudnary_preset_name=your_cloudinary_upload_preset
    REACT_APP_cloudnary_cloud_name=your_cloudinary_cloud_name
    ```

4. Start the frontend development server:

    ```bash
    npm start
    ```

    The development server will start on port 3000.

## 📖 API Endpoints

### Authentication

- **Register**: `POST /api/auth/register`
  - Request Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "message": "User registered successfully" }`

- **Login**: `POST /api/auth/login`
  - Request Body: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token" }`

### Tweets

- **Create Tweet**: `POST /api/tweets`
  - Headers: `{ "Authorization": "Bearer jwt_token" }`
  - Request Body: `{ "content": "string", "mediaUrl": "string (optional)" }`
  - Response: `Tweet object`

- **Edit Tweet**: `PUT /api/tweets/:tweetId`
  - Headers: `{ "Authorization": "Bearer jwt_token" }`
  - Request Body: `{ "content": "string", "mediaUrl": "string (optional)" }`
  - Response: `Updated Tweet object`

- **Delete Tweet**: `DELETE /api/tweets/:tweetId`
  - Headers: `{ "Authorization": "Bearer jwt_token" }`
  - Response: `{ "message": "Tweet deleted" }`

- **View Timeline**: `GET /api/tweets/timeline`
  - Headers: `{ "Authorization": "Bearer jwt_token" }`
  - Response: `Array of Tweet objects`

### Follow/Unfollow

- **Follow User**: `POST /api/follow/follow/:userId`
  - Headers: `{ "Authorization": "Bearer jwt_token" }`
  - Response: `{ "message": "User followed" }`

- **Unfollow User**: `POST /api/follow/unfollow/:userId`
  - Headers: `{ "Authorization": "Bearer jwt_token" }`
  - Response: `{ "message": "User unfollowed" }`

## 💖 Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [React](https://reactjs.org/)
- [Cloudinary](https://cloudinary.com/)

Feel free to contribute to this project by opening issues or submitting pull requests.

### Author

Shivanshu - [GitHub](https://github.com/shivanshu877)
