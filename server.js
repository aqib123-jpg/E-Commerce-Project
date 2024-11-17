// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(cors()); // Allows React frontend to communicate with this backend
// app.use(bodyParser.json()); // Parses JSON data from the request body

// // MySQL database connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'MySqL321@', // Your MySQL root password
//   database: 'INFORMATION' // Create this database in MySQL later
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL Database!');
// });

// app.get('/getWishlist/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const query = 'SELECT DATA, PRICE FROM WISHLIST WHERE FORLOGINID = ?';

//   connection.query(query, [userId], (err, results) => {
//     if (err) return res.status(500).send('Database error');
//     if (results.length > 0) {
//       try {
//         const wishlist = results.map(row => ({
//           name: JSON.parse(row.DATA),  
//           price: row.PRICE
//         }));
//         res.status(200).send(wishlist);
//         // const wishlistLength = results.length;
//         // res.status(200).send({ wishlist, length: wishlistLength });
//       } catch (error) {
//         res.status(500).send('Data parsing error');
//       }
//     } else {
//       res.status(404).send('No wishlist found');
//     }
//   });
// });


// app.get('/getCart/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const query = 'SELECT DATA, PRICE FROM CART WHERE FORLOGINID = ?';

//   connection.query(query, [userId], (err, results) => {
//     if (err) return res.status(500).send('Database error');
//     if (results.length > 0) {
//       try {
//         const cart = results.map(row => ({
//           name: JSON.parse(row.DATA),  
//           price: row.PRICE
//         }));
//         res.status(200).send(cart);
//         // const wishlistLength = results.length;
//         // res.status(200).send({ wishlist, length: wishlistLength });
//       } catch (error) {
//         res.status(500).send('Data parsing error');
//       }
//     } else {
//       res.status(404).send('No wishlist found');
//     }
//   });
// });

// app.get('/getWishlistLength/:userId', (req, res) => {
//   console.log("Here here");
//   const userId = req.params.userId;
//   const query = 'SELECT COUNT(*) AS wishlistLength FROM WISHLIST WHERE FORLOGINID = ?';
//   // console.log("LLength : ",query.length);
//   connection.query(query, [userId], (err, results) => {
//     if (err) {
//       return res.status(500).send('Database error');
//     }
    
//     if (results.length > 0) {
//       res.status(200).send({ length: results[0].wishlistLength });
//     } else {
//       res.status(404).send('No wishlist found');
//     }
//   });
// });

// app.get('/getCartLength/:userId', (req, res) => {
//   console.log("Here here");
//   const userId = req.params.userId;
//   const query = 'SELECT COUNT(*) AS cartLength FROM CART WHERE FORLOGINID = ?';
//   // console.log("LLength : ",query.length);
//   connection.query(query, [userId], (err, results) => {
//     if (err) {
//       return res.status(500).send('Database error');
//     }
    
//     if (results.length > 0) {
//       res.status(200).send({ length: results[0].cartLength});
//     } else {
//       res.status(404).send('No wishlist found');
//     }
//   });
// });

// app.post('/api/addData', (req, res) => {
//   const { uName, uPassword, action } = req.body;

//   if (action === 'signup') {
//     const checkQuery = 'SELECT * FROM FORLOGIN WHERE NAME = ? AND PASSWORD = ?';
//     connection.query(checkQuery, [uName,uPassword ], (err, results) => {
//       if (err) return res.status(500).send('Database error');
//       if (results.length > 0) {
//         return res.status(409).send('Data already exists');
//       } else {
//         const insertQuery = 'INSERT INTO FORLOGIN (NAME, PASSWORD) VALUES (?, ?)';
//         connection.query(insertQuery, [uName, uPassword], (err, results) => {
//           if (err) return res.status(500).send('Database error');
//           const userId = results.insertId; 
//           res.status(200).send({ message: 'Data inserted successfully', userId });
//         });
//       }
//     });
//   } else if (action === 'login') {
//     const loginQuery = 'SELECT * FROM FORLOGIN WHERE NAME = ? AND PASSWORD = ?';
//     connection.query(loginQuery, [uName, uPassword], (err, results) => {
//       if (err) return res.status(500).send('Database error');
//       if (results.length > 0) {
//         const userId = results[0].ID;  // <-- Get the ID of the logged-in user
//         res.status(200).send({ message: 'Login successful', userId });
//       } else {
//         res.status(409).send('Invalid credentials');
//       }
//     });
//   }
// });
// app.post('/api/addToWishlist', (req, res) => {
//   const { userId, wishlistData, wishlistPrice } = req.body;  // Get userId, wishlistData (name), and wishlistPrice from frontend

//   const insertOrUpdateWishlistQuery = `
//     INSERT INTO WISHLIST (FORLOGINID, DATA, PRICE) 
//     VALUES (?, ?, ?) 
//     ON DUPLICATE KEY UPDATE DATA = VALUES(DATA), PRICE = VALUES(PRICE)`;

//   connection.query(insertOrUpdateWishlistQuery, [userId, JSON.stringify(wishlistData), wishlistPrice], (err, results) => {
//     if (err) return res.status(500).send('Database error');
//     res.status(200).send('Wishlist item added/updated successfully');
//   });
// });

// app.post('/api/addToCart', (req, res) => {
//   const { userId, cartData, cartPrice } = req.body;  // Get userId, wishlistData (name), and wishlistPrice from frontend

//   const insertOrUpdatecartQuery = `
//     INSERT INTO CART (FORLOGINID, DATA, PRICE) 
//     VALUES (?, ?, ?) 
//     ON DUPLICATE KEY UPDATE DATA = VALUES(DATA), PRICE = VALUES(PRICE)`;

//   connection.query(insertOrUpdatecartQuery, [userId, JSON.stringify(cartData), cartPrice], (err, results) => {
//     if (err) return res.status(500).send('Database error');
//     res.status(200).send('Cart item added/updated successfully');
//   });
// });

// app.post('/api/deleteFromWishlist', (req, res) => {
//   const { userId, itemName } = req.body;
//   const quotedItemName = `"${itemName}"`;  // Adding quotes around itemName
//   console.log("User ID:", userId);
//   console.log("Item Name:", quotedItemName);

//   const deleteWishlistQuery = `DELETE FROM WISHLIST WHERE FORLOGINID = ? AND DATA = ?`;
//   connection.query(deleteWishlistQuery, [userId, quotedItemName], (err, results) => {
//     if (err) {
//       return res.status(500).send('Database error');
//     }
//     if (results.affectedRows > 0) {
//       res.status(200).send('Wishlist item deleted successfully');
//     } else {
//       res.status(404).send('Wishlist item not found');
//     }
//   });
// });

// app.post('/api/deleteFromCart', (req, res) => {
//   const { userId, itemName } = req.body;
//   const quotedItemName = `"${itemName}"`;  // Adding quotes around itemName
//   console.log("User ID:", userId);
//   console.log("Item Name:", quotedItemName);

//   const deleteWishlistQuery = `DELETE FROM CART WHERE FORLOGINID = ? AND DATA = ?`;
//   connection.query(deleteWishlistQuery, [userId, quotedItemName], (err, results) => {
//     if (err) {
//       return res.status(500).send('Database error');
//     }
//     if (results.affectedRows > 0) {
//       res.status(200).send('Cart item deleted successfully');
//     } else {
//       res.status(404).send('Cart item not found');
//     }
//   });
// });

// app.listen(3002, () => {
//   console.log('Server running on port 3002');
// });









const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors()); // Allows React frontend to communicate with this backend
app.use(bodyParser.json()); // Parses JSON data from the request body

const connection = mysql.createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: 'MySqL321@', 
  // database: 'INFORMATION'
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});

app.get('/getWishlist/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT DATA, PRICE FROM WISHLIST WHERE FORLOGINID = ?';

  connection.query(query, [userId], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length > 0) {
      try {
        const wishlist = results.map(row => ({
          name: JSON.parse(row.DATA),  
          price: row.PRICE
        }));
        res.status(200).send(wishlist);
        // const wishlistLength = results.length;
        // res.status(200).send({ wishlist, length: wishlistLength });
      } catch (error) {
        res.status(500).send('Data parsing error');
      }
    } else {
      res.status(404).send('No wishlist found');
    }
  });
});


app.get('/getCart/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT DATA, PRICE FROM CART WHERE FORLOGINID = ?';

  connection.query(query, [userId], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length > 0) {
      try {
        const cart = results.map(row => ({
          name: JSON.parse(row.DATA),  
          price: row.PRICE
        }));
        res.status(200).send(cart);
      } catch (error) {
        res.status(500).send('Data parsing error');
      }
    } else {
      res.status(404).send('No wishlist found');
    }
  });
});


app.get('/getWishlistLength/:userId', (req, res) => {
  console.log("Here here");
  const userId = req.params.userId;
  const query = 'SELECT COUNT(*) AS wishlistLength FROM WISHLIST WHERE FORLOGINID = ?';
  // console.log("LLength : ",query.length);
  connection.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    
    if (results.length > 0) {
      res.status(200).send({ length: results[0].wishlistLength });
    } else {
      res.status(404).send('No wishlist found');
    }
  });
});

app.get('/getCartLength/:userId', (req, res) => {
  console.log("Here here");
  const userId = req.params.userId;
  const query = 'SELECT COUNT(*) AS cartLength FROM CART WHERE FORLOGINID = ?';
  // console.log("LLength : ",query.length);
  connection.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    
    if (results.length > 0) {
      res.status(200).send({ length: results[0].cartLength});
    } else {
      res.status(404).send('No wishlist found');
    }
  });
});

app.post('/api/addData', (req, res) => {
  const { uName, uPassword, action ,uEmail } = req.body;
  // if (action === 'signup') {
  //   console.log("server js signup");
  //   const checkQuery = 'SELECT * FROM FORLOGIN WHERE EMAIL = ? OR NAME = ?';
  //   connection.query(checkQuery, [uEmail, uName], (err, results) => {
  //     if (err) return res.status(500).send('Database error');
  //     if (results.length > 0) {
  //       const existingUser = results[0];
  //       if (existingUser.EMAIL === uEmail) {
  //         return res.status(409).send('Email already exists');
  //       } else if (existingUser.NAME === uName) {
  //         return res.status(409).send('Username already exists');
  //       }
  //     } else {
  //       const insertQuery = 'INSERT INTO FORLOGIN (NAME, PASSWORD, EMAIL) VALUES (?, ?, ?)';
  //       connection.query(insertQuery, [uName, uPassword, uEmail], (err, results) => {
  //         if (err) return res.status(500).send('Database error');
  //         const userId = results.insertId;
  //         res.status(200).send({ message: 'Data inserted successfully', userId });
  //       });
  //     }
  //   });
  // }
  if (action === 'signup') {
    const checkQuery = 'SELECT * FROM FORLOGIN WHERE BINARY EMAIL = ? OR BINARY NAME = ?';
    connection.query(checkQuery, [uEmail,uName], (err, results) => {
      if (err) return res.status(500).send('Database error');
      if (results.length > 0) {
        if (results[0].EMAIL === uEmail) {
          return res.status(409).send('Email already exists');
        } else if (results[0].NAME === uName) {
          return res.status(409).send('Username already exists');
        }
      } else {
        const insertQuery = 'INSERT INTO FORLOGIN (NAME, PASSWORD , EMAIL) VALUES (?, ?, ?)';
        connection.query(insertQuery, [uName, uPassword, uEmail], (err, results) => {
          if (err) return res.status(500).send('Database error');
          const userId = results.insertId; 
          res.status(200).send({ message: 'Data inserted successfully', userId });
        });
      }
    });
  }  
  else if (action === 'login') {
    const loginQuery = 'SELECT * FROM FORLOGIN WHERE NAME = ? AND PASSWORD = ?';
    connection.query(loginQuery, [uName, uPassword], (err, results) => {
      if (err) return res.status(500).send('Database error');
      if (results.length > 0) {
        const userId = results[0].ID;  // <-- Get the ID of the logged-in user
        res.status(200).send({ message: 'Login successful', userId });
      } else {
        res.status(409).send('Invalid credentials');
      }
    });
  } else if (action === 'forgetPassword') {
    console.log("Today Today action : ",action);
    connection.query('SELECT EMAIL, PASSWORD FROM FORLOGIN WHERE NAME = ?', [uName], (err, results) => {
      if (err) {
        console.error('Error fetching user details: ', err);
        return res.status(500).send('Server error'); // Return an error response
      }
      if (results.length === 0) {
        console.log('User not found.');
        return res.status(404).send('User not found'); // Return user not found response
      }
      const userEmail = results[0].EMAIL;
      const userPassword = results[0].PASSWORD;
      console.log("Ye mila Email : ",userEmail);
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS, 
        },
       });
      
      let mailOptions = {
        from: 'aqibk5867@gmail.com',
        to: userEmail,
        subject: 'Your Forgotten Password',
        text: `Hi ${uName},\n\nYour password is: ${userPassword}\n\nPlease keep it safe!`,
      };
      console.log("Response is Here : ",mailOptions);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Error in Sending Email'); 
        }
        console.log('Email sent: ' + info.response);
        return res.status(200).send('Password sent to your email'); // Success response
      });
    });
  }
});


app.post('/api/addToWishlist', (req, res) => {
  const { userId, wishlistData, wishlistPrice } = req.body;  // Get userId, wishlistData (name), and wishlistPrice from frontend

  const insertOrUpdateWishlistQuery = `
    INSERT INTO WISHLIST (FORLOGINID, DATA, PRICE) 
    VALUES (?, ?, ?) 
    ON DUPLICATE KEY UPDATE DATA = VALUES(DATA), PRICE = VALUES(PRICE)`;

  connection.query(insertOrUpdateWishlistQuery, [userId, JSON.stringify(wishlistData), wishlistPrice], (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.status(200).send('Wishlist item added/updated successfully');
  });
});

app.post('/api/addToCart', (req, res) => {
  const { userId, cartData, cartPrice } = req.body;  // Get userId, wishlistData (name), and wishlistPrice from frontend

  const insertOrUpdatecartQuery = `
    INSERT INTO CART (FORLOGINID, DATA, PRICE) 
    VALUES (?, ?, ?) 
    ON DUPLICATE KEY UPDATE DATA = VALUES(DATA), PRICE = VALUES(PRICE)`;

  connection.query(insertOrUpdatecartQuery, [userId, JSON.stringify(cartData), cartPrice], (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.status(200).send('Cart item added/updated successfully');
  });
});

app.post('/api/deleteFromWishlist', (req, res) => {
  const { userId, itemName } = req.body;
  const quotedItemName = `"${itemName}"`;  // Adding quotes around itemName
  console.log("User ID:", userId);
  console.log("Item Name:", quotedItemName);

  const deleteWishlistQuery = `DELETE FROM WISHLIST WHERE FORLOGINID = ? AND DATA = ?`;
  connection.query(deleteWishlistQuery, [userId, quotedItemName], (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    if (results.affectedRows > 0) {
      res.status(200).send('Wishlist item deleted successfully');
    } else {
      res.status(404).send('Wishlist item not found');
    }
  });
});

app.post('/api/deleteFromCart', (req, res) => {
  const { userId, itemName } = req.body;
  const quotedItemName = `"${itemName}"`;  // Adding quotes around itemName
  console.log("User ID:", userId);
  console.log("Item Name:", quotedItemName);

  const deleteWishlistQuery = `DELETE FROM CART WHERE FORLOGINID = ? AND DATA = ?`;
  connection.query(deleteWishlistQuery, [userId, quotedItemName], (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    if (results.affectedRows > 0) {
      res.status(200).send('Cart item deleted successfully');
    } else {
      res.status(404).send('Cart item not found');
    }
  });
});


//can be deletted
app.post('/api/resetPassword', (req, res) => {
  const { id, password } = req.body;
  const query = 'UPDATE FORLOGIN SET PASSWORD = ? WHERE ID = ?';
  connection.query(query, [password, id], (err, results) => {
    if (err) {
      console.error('Error updating password:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).send('Password updated successfully');
  });
});

//can be deleted

//SHOW DATA TO ADMIN

app.get('/api/users', (req, res) => {
  const query = 'SELECT NAME, EMAIL,PASSWORD FROM FORLOGIN';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching users');
    }
    res.status(200).json(results);
  });
});

// Route to delete a user by ID
app.delete('/api/users/:email', (req, res) => {
  const userEmail = req.params.email; // Get user ID from the route parameter
  // alert(userId);
  const query = 'DELETE FROM FORLOGIN WHERE EMAIL = ?';
  
  connection.query(query, [userEmail], (err, results) => {
    if (err) {
      return res.status(500).send('Error deleting user');
    }
    res.status(200).send({ message: 'User deleted successfully' });
  });
});



//SHOW DATA TO ADMIN

//BACKEND HOMEPRODUCTS TABLE

app.get('/api/getTableData/:table', (req, res) => {
  const table=req.params.table;
  const query = `SELECT * FROM ${table}`;
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.delete('/api/productDelete/:id/:type', (req, res) => {
  const {id,type} = req.params;
  const query = `DELETE FROM ${type} WHERE ID = ?`;

  connection.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

app.post('/api/addProducts', (req, res) => {
  const {productCategory , productName, productPrice, imageUrl } = req.body;
  let query;
  if (!productName || !productPrice || !imageUrl) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (productCategory?.trim().toLowerCase() === 'home'){
    query = 'INSERT INTO HOMEPRODUCTS (HOME_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)';
  } else if (productCategory?.trim().toLowerCase() == 'sports' || productCategory?.trim().toLowerCase() == 'sport'){
    query = 'INSERT INTO SPORTSPRODUCTS (SPORTS_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)';  
  } else if (productCategory?.trim().toLowerCase() == 'sunglasses' || productCategory?.trim().toLowerCase() == 'glasses'){
    query = 'INSERT INTO SUNGLASSESPRODUCTS (SUNGLASSES_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)';  
  } else if (productCategory?.trim().toLowerCase() == 'beauty products' || productCategory?.trim().toLowerCase() == 'beauty product' || productCategory?.trim().toLowerCase() == 'beauty'){
    query = 'INSERT INTO BEAUTYPRODUCTS (BEAUTY_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)'; 
  } else if (productCategory?.trim().toLowerCase() == 'clothes' || productCategory?.trim().toLowerCase() == 'clothe' || productCategory?.trim().toLowerCase() == 'cloth'){
    query = 'INSERT INTO CLOTHESPRODUCTS (CLOTHES_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)';  
  } else if (productCategory?.trim().toLowerCase() == 'shoes' || productCategory?.trim().toLowerCase() == 'shoe'){
    query = 'INSERT INTO SHOESPRODUCTS (SHOES_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)';  
  } else if (productCategory?.trim().toLowerCase() == 'bags' || productCategory?.trim().toLowerCase() == 'bag'){
    query = 'INSERT INTO BAGSPRODUCTS (BAGS_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)'; 
  } else if (productCategory?.trim().toLowerCase() == 'electronic items' || productCategory?.trim().toLowerCase() == 'electronic item' || productCategory?.trim().toLowerCase() == 'electronics' || productCategory?.trim().toLowerCase() == 'electronic'){
    query = 'INSERT INTO ELECTRONICPRODUCTS (ELECTRONIC_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)';  
  } else if (productCategory?.trim().toLowerCase() == 'biscuits' || productCategory?.trim().toLowerCase() == 'biscuit'){
    query = 'INSERT INTO BISCUITSPRODUCTS (BISCUITS_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)';  
  } else if (productCategory?.trim().toLowerCase() == 'cold drinks' || productCategory?.trim().toLowerCase() == 'cold drink'|| productCategory?.trim().toLowerCase() == 'drinks'|| productCategory?.trim().toLowerCase() == 'drink'){
    query = 'INSERT INTO COLDDRINKSPRODUCTS (COLDDRINKS_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)'; 
  } else if (productCategory?.trim().toLowerCase() == 'snacks' || productCategory?.trim().toLowerCase() == 'snack'){
    query = 'INSERT INTO SNACKSPRODUCTS (SNACKS_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)';  
  } else if (productCategory?.trim().toLowerCase() == 'face wash' || productCategory?.trim().toLowerCase() == 'facewash'){
    query = 'INSERT INTO FACEWASHPRODUCTS (FACEWASH_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)'; 
  } else if (productCategory?.trim().toLowerCase() == 'kitchen accessories' || productCategory?.trim().toLowerCase() == 'kitchen items' || productCategory?.trim().toLowerCase() == 'kitchen item' || productCategory?.trim().toLowerCase() == 'kitchen'){
    query = 'INSERT INTO KITCHENPRODUCTS (KITCHEN_PRODUCTS_NAME, PRICE, IMAGE_URL) VALUES (?, ?, ?)'; 
  } else{
    alert("Invalid Category Name");
    return res.status(400).json({ error: 'Invalid Category Name' });
  }
  connection.query(query, [productName, productPrice, imageUrl], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Product added successfully', productId: result.insertId });
  });
});

app.get('/api/search', (req, res) => {
  const searchTerm = req.query.q;

  if (searchTerm) {
    const query = 'SELECT * FROM ALLPRODUCTS WHERE NAMES LIKE ?';
    db.query(query, [`%${searchTerm}%`], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  } else {
    res.json([]);
  }
});

//BACKEND HOMEPRODUCTS TABLE

app.listen(3002, () => {
  console.log('Server running on port 3002');
});








// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(cors()); // Allows React frontend to communicate with this backend
// app.use(bodyParser.json()); // Parses JSON data from the request body

// // MySQL database connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'MySqL321@', // Your MySQL root password
//   database: 'INFORMATION' // Create this database in MySQL later
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL Database!');
// });

// app.get('/getWishlist/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const query = 'SELECT DATA, PRICE FROM WISHLIST WHERE FORLOGINID = ?';

//   connection.query(query, [userId], (err, results) => {
//     if (err) return res.status(500).send('Database error');
//     if (results.length > 0) {
//       try {
//         const wishlist = results.map(row => ({
//           name: JSON.parse(row.DATA),  
//           price: row.PRICE
//         }));
//         res.status(200).send(wishlist);
//         // const wishlistLength = results.length;
//         // res.status(200).send({ wishlist, length: wishlistLength });
//       } catch (error) {
//         res.status(500).send('Data parsing error');
//       }
//     } else {
//       res.status(404).send('No wishlist found');
//     }
//   });
// });


// app.get('/getCart/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const query = 'SELECT DATA, PRICE FROM CART WHERE FORLOGINID = ?';

//   connection.query(query, [userId], (err, results) => {
//     if (err) return res.status(500).send('Database error');
//     if (results.length > 0) {
//       try {
//         const cart = results.map(row => ({
//           name: JSON.parse(row.DATA),  
//           price: row.PRICE
//         }));
//         res.status(200).send(cart);
//         // const wishlistLength = results.length;
//         // res.status(200).send({ wishlist, length: wishlistLength });
//       } catch (error) {
//         res.status(500).send('Data parsing error');
//       }
//     } else {
//       res.status(404).send('No wishlist found');
//     }
//   });
// });

// app.get('/getWishlistLength/:userId', (req, res) => {
//   console.log("Here here");
//   const userId = req.params.userId;
//   const query = 'SELECT COUNT(*) AS wishlistLength FROM WISHLIST WHERE FORLOGINID = ?';
//   // console.log("LLength : ",query.length);
//   connection.query(query, [userId], (err, results) => {
//     if (err) {
//       return res.status(500).send('Database error');
//     }
    
//     if (results.length > 0) {
//       res.status(200).send({ length: results[0].wishlistLength });
//     } else {
//       res.status(404).send('No wishlist found');
//     }
//   });
// });

// app.get('/getCartLength/:userId', (req, res) => {
//   console.log("Here here");
//   const userId = req.params.userId;
//   const query = 'SELECT COUNT(*) AS cartLength FROM CART WHERE FORLOGINID = ?';
//   connection.query(query, [userId], (err, results) => {
//     if (err) {
//       return res.status(500).send('Database error');
//     }
//     if (results.length > 0) {
//       res.status(200).send({ length: results[0].cartLength});
//     } else {
//       res.status(404).send('No wishlist found');
//     }
//   });
// });

// app.post('/api/addData', (req, res) => {
//   const { uName, uPassword, action , uEmail } = req.body;
//   if (action === 'signup') {
//     const checkQuery = 'SELECT * FROM FORLOGIN WHERE EMAIL = ? OR NAME = ?';
//     connection.query(checkQuery, [uEmail,uName], (err, results) => {
//       if (err) return res.status(500).send('Database error');
//       if (results.length > 0) {
//         if (results[0].EMAIL === uEmail) {
//           return res.status(409).send('Email already exists');
//         } else if (results[0].NAME === uName) {
//           return res.status(409).send('Username already exists');
//         }
//       } else {
//         const insertQuery = 'INSERT INTO FORLOGIN (NAME, PASSWORD , EMAIL) VALUES (?, ?, ?)';
//         connection.query(insertQuery, [uName, uPassword, uEmail], (err, results) => {
//           if (err) return res.status(500).send('Database error');
//           const userId = results.insertId; 
//           res.status(200).send({ message: 'Data inserted successfully', userId });
//         });
//       }
//     });
//   } else if (action === 'login') {
//     const loginQuery = 'SELECT * FROM FORLOGIN WHERE NAME = ? AND PASSWORD = ?';
//     connection.query(loginQuery, [uName, uPassword], (err, results) => {
//       if (err) return res.status(500).send('Database error');
//       if (results.length > 0) {
//         const userId = results[0].ID;  // <-- Get the ID of the logged-in user
//         res.status(200).send({ message: 'Login successful', userId });
//       } else {
//         res.status(409).send('Invalid credentials');
//       }
//     });
//   } 
//   else if (action === 'forgetPassword') {
//     connection.query('SELECT EMAIL, PASSWORD FROM FORLOGIN WHERE NAME = ?', [uName], (err, results) => {
//       if (err) {
//         console.error('Error fetching user details: ', err);
//         return res.status(500).json({ message: 'Server error' }); // Return an error response
//       }
//       if (results.length === 0) {
//         console.log('User not found.');
//         return res.status(404).json({ message: 'User not found' }); // Return user not found response
//       }
//       const userEmail = results[0].EMAIL;
//       const userPassword = results[0].PASSWORD;
//       console.log("Ye mila Email : ",userEmail);
//       let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'aqibk5867@gmail.com',
//           pass: 'ixvlfokljodzyloh', 
//         },
//       });
//       let mailOptions = {
//         from: 'aqibk5867@gmail.com',
//         to: userEmail,
//         subject: 'Your Forgotten Password',
//         text: `Hi ${uName},\n\nYour password is: ${userPassword}\n\nPlease keep it safe!`,
//       };
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error('Error sending email:', error);
//           return res.status(500).json({ message: 'Error sending email' }); 
//         }
//         console.log('Email sent: ' + info.response);
//         return res.status(200).json({ message: 'Password sent to your email' }); // Success response
//       });
//     });
//   }
// });

// app.post('/api/addToWishlist', (req, res) => {
//   const { userId, wishlistData, wishlistPrice } = req.body;  // Get userId, wishlistData (name), and wishlistPrice from frontend

//   const insertOrUpdateWishlistQuery = `
//     INSERT INTO WISHLIST (FORLOGINID, DATA, PRICE) 
//     VALUES (?, ?, ?) 
//     ON DUPLICATE KEY UPDATE DATA = VALUES(DATA), PRICE = VALUES(PRICE)`;

//   connection.query(insertOrUpdateWishlistQuery, [userId, JSON.stringify(wishlistData), wishlistPrice], (err, results) => {
//     if (err) return res.status(500).send('Database error');
//     res.status(200).send('Wishlist item added/updated successfully');
//   });
// });

// app.post('/api/addToCart', (req, res) => {
//   const { userId, cartData, cartPrice } = req.body;  // Get userId, wishlistData (name), and wishlistPrice from frontend

//   const insertOrUpdatecartQuery = `
//     INSERT INTO CART (FORLOGINID, DATA, PRICE) 
//     VALUES (?, ?, ?) 
//     ON DUPLICATE KEY UPDATE DATA = VALUES(DATA), PRICE = VALUES(PRICE)`;

//   connection.query(insertOrUpdatecartQuery, [userId, JSON.stringify(cartData), cartPrice], (err, results) => {
//     if (err) return res.status(500).send('Database error');
//     res.status(200).send('Cart item added/updated successfully');
//   });
// });

// app.post('/api/deleteFromWishlist', (req, res) => {
//   const { userId, itemName } = req.body;
//   const quotedItemName = `"${itemName}"`;  // Adding quotes around itemName
//   console.log("User ID:", userId);
//   console.log("Item Name:", quotedItemName);

//   const deleteWishlistQuery = `DELETE FROM WISHLIST WHERE FORLOGINID = ? AND DATA = ?`;
//   connection.query(deleteWishlistQuery, [userId, quotedItemName], (err, results) => {
//     if (err) {
//       return res.status(500).send('Database error');
//     }
//     if (results.affectedRows > 0) {
//       res.status(200).send('Wishlist item deleted successfully');
//     } else {
//       res.status(404).send('Wishlist item not found');
//     }
//   });
// });

// app.post('/api/deleteFromCart', (req, res) => {
//   const { userId, itemName } = req.body;
//   const quotedItemName = `"${itemName}"`;  // Adding quotes around itemName
//   console.log("User ID:", userId);
//   console.log("Item Name:", quotedItemName);

//   const deleteWishlistQuery = `DELETE FROM CART WHERE FORLOGINID = ? AND DATA = ?`;
//   connection.query(deleteWishlistQuery, [userId, quotedItemName], (err, results) => {
//     if (err) {
//       return res.status(500).send('Database error');
//     }
//     if (results.affectedRows > 0) {
//       res.status(200).send('Cart item deleted successfully');
//     } else {
//       res.status(404).send('Cart item not found');
//     }
//   });
// });

// app.listen(3002, () => {
//   console.log('Server running on port 3002');
// });