# **Airbnb Clone**

## **Overview**

Airbnb Clone is a full-stack web application that mimics the core functionality of Airbnb. This project allows users to explore rental properties, create new listings, and manage their saved spots. The backend is built using **Express.js** with a **SQLite3** database, while the frontend leverages modern tools like **React** for an interactive user experience.

---

## **Features**

- **User Authentication**: 
  - Secure login and signup functionality.
  - Authentication using session-based storage.

- **Browse Listings**:
  - View all available rental properties with detailed descriptions.

- **Manage Spots**:
  - Users can create, edit, and delete their own property listings.

- **Reviews**:
  - View and add reviews for properties.
  - Manage reviews for properties owned by the user.

---

## **Technologies Used**

### **Backend**
- **Express.js**: Backend framework for creating RESTful APIs.
- **Sequelize**: ORM for database interaction.
- **SQLite3**: Relational database for storing application data.

### **Frontend**
- **React**: Framework for building user interfaces.
- **Redux**: State management for efficient UI updates.
- **CSS/HTML**: Styling and layout.

---

## **Getting Started**

### **Installation**
    npm install

### Set up the database:
    Create a .env file in the root directory with the following variables:
        PORT=3000
        DB_HOST=localhost
        DB_NAME=airbnb_db
        DB_USER=your_username
        DB_PASSWORD=your_password
        NODE_ENV=development

### Run the migrations and seed the database
    npx dotenv sequelize-cli db:migrate
    npx dotenv sequelize-cli db:seed:all

### Start the development server:
    backend: npm start
    frontend: npm run dev
