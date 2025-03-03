const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/user.routes")

require('dotenv').config();

const app= express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-vercel-app.vercel.app'],
  credentials: true
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
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
