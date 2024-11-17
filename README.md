# E-Commerce Website

A full-stack e-commerce website built using React, Node.js, Express, and MySQL.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Run the Project](#run-the-project)

## Features
- User authentication (Login, Signup,Forget Password and Password Reset)
- Product browsing with category filtering
- Shopping cart and wishlist functionality
- Secure checkout system
- Admin panel for managing products and orders
- Responsive design with Tailwind CSS

## Tech Stack
**Frontend:**
- React
- Tailwind CSS

**Backend:**
- Node.js
- Express

**Database:**
- MySQL



## Installtion : 
Download the Zip File Direct from Github .

**Frontend:**
navigate to Frontend folder and run npm install , to install all dependencies

**Backend:**
in the Root directory directly run npm install


## Database Setup

To set up the database, follow these steps:

1. **Open MySQL Workbench**:
   - Launch MySQL Workbench and connect to your local MySQL server.

2. **Import the Database**:
   - In MySQL Workbench, go to **File > Open SQL Script**.
   - Select the `E_commerce.sql` file from the 'Database' folder which is in `E Commerce Project` folder.
   - Click **Open** to load the file.
   - With the script loaded, click the **Execute** button (lightning bolt icon) to create the database and tables and populate them with initial data.

3. **Confirm Database Creation**:
   - Refresh the schema list in MySQL Workbench to see the `INFORMATION` database.
   - You can verify the tables and data were created correctly by expanding the database.

4. **Update Connection Settings**:
   - In `Backend/server.js`, ensure that the database connection configuration matches your MySQL settings:
     ```javascript
     const connection = mysql.createConnection({
       host: '',                    // localhost mostly
       user: '',                    // your SQL user name
       password: '',                //your SQL password
       database: ''                 // Database (INFORMATION)
     });
     ```

---



## Run the Project

1. Frontend :

To run the Frontend:

1. Navigate to the Frontend folder .
2. Start the development server:
   
    npm start


2. Backend

To run the backend:

1. Navigate to the root directory (where server.js is present):
  

2. Start the server:
  
    nodemon server.js
   
