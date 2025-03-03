const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/user.routes")

require('dotenv').config();

const app= express();

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/user-registration")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
 
  app.get("/", (req, res) => {
    res.send("User Registration API is running...");
  });
  
  app.use("/api",userRoutes);

  app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  })

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
