// // const express = require('express');
// // const dotenv = require('dotenv');
// // const EmailService = require('./services/emailService');
// // const EmailModel = require('./models/emailLog');
// // const connection = require('./config/db');
// // const PORT = 8080;

// // dotenv.config();
// // const app = express();
// // app.use(express.json());

// // // MongoDB connection


// // // Route to send email
// // app.post('/send-email', async (req, res) => {
// //   const { recipient, subject, body } = req.body;

 

// //   try {
// //     if (!recipient || !subject || !body) {
// //       return res.status(400).json({ message: 'Recipient, subject, and body are required.' });
// //     }
// //     const result = new EmailModel({recipient, subject, body})
// //     await result.save()
// //     res.status(200).json(result);
// //   } catch (error) {
// //     console.error('Error sending email:', error);
// //     res.status(500).json({ message: `Failed to send email ${error}`});
// //   }
// // });

// // // Start the server

// // app.listen(PORT, async(req,res) => {
// //   try {
// //     await connection
// //     console.log(`Server is running on port ${PORT}`);
// //   } catch (error) {
// //     res.send(error)
// //   }
 
// // });

// const express = require("express");
// const connection = require("./config/db");
// const server = express();
// const dotenv = require("dotenv").config();
// const PORT = 3000;
// server.use(express.json());

// server.get("/",(req,res)=>{
//     res.send("Server is running")
// })
// // server.use("/user",userRouter);
// // server.use("/cart",auth,cartRouter);
// // server.use("/product",productRouter)
// server.listen(PORT,async(req,res)=>{
//     try {
//         await connection;
//         console.log(`server connecion successfull at PORT ${PORT}`)
//     } catch (error) {
//        console.log(`Server connection error${error}`)
        
//     }
// })


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const EmailService = require('./services/emailService');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route to send email
app.post('/send-email', async (req, res) => {
  const { recipient, subject, body } = req.body;

  if (!recipient || !subject || !body) {
    return res.status(400).json({ message: 'Recipient, subject, and body are required.' });
  }

  try {
    const result = await EmailService.sendEmail(recipient, subject, body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
