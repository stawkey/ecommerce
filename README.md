# Leyndell - Fullstack E-commerce Shop

This application was developed as part of the "Introduction to Web Applications" course during the third semester of the Computer Science major at AGH University of Science and Technology in Kraków.

**Authors:**
- [stawkey](https://github.com/stawkey)
- [Mekost](https://github.com/Mekost)

## Overview

This project is a functional e-commerce platform built with a modern JavaScript stack. It allows users to browse products, register and log in, view their order history, and more.

## Features

Our e-commerce platform has the following functionalities:

*   **Navigation:** Easy-to-use Navbar
*   **Homepage:** Engaging landing page to welcome users and showcase the newest products
*   **User Authentication:** Secure user registration and login system
*   **Order History:** Users can track their past orders
*   **Search Functionality:** Robust search bar to find products quickly
*   **Product Pages:** Detailed pages for each product

## Tech Stack

**Backend:**
*   Node.js with Express.js
*   MongoDB with Mongoose for database management
*   JSON Web Tokens (JWT) for authentication (`express-jwt`, `jsonwebtoken`)
*   `bcrypt` for password hashing
*   `cors` for handling Cross-Origin Resource Sharing
*   `cookie-parser` for managing cookies
*   `dotenv` for environment variable management

**Frontend:**
*   React with Vite
*   `react-router-dom` for client-side routing
*   `axios` for making HTTP requests
*   `@fontawesome` for icons

**Common:**
*   `crypto` for cryptographic functionalities

## Getting Started

To get the project up and running on your local machine, follow these setup instructions:

### Prerequisites

Ensure you have Node.js and npm installed.
A MongoDB instance should be running and accessible.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/stawkey/ecommerce.git
    cd ecommerce
    ```

2.  **Backend Setup:**
    Navigate to the `backend` folder:
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and configure your environment variables.
    ```env
    PORT=your_backend_port
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
    Start the backend server:
    ```bash
    node server.js
    ```

3.  **Frontend Setup:**
    Navigate to the `frontend` folder:
    ```bash
    cd ../frontend
    npm install
    ```
    Start the frontend development server:
    ```bash
    npm run dev
    ```

Once both frontend and backend servers are running, you should be able to access the application in your browser (usually at `http://localhost:5173`).
