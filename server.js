const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/user.routes")



const app= express();

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://raghavendrachitragar27:Raghavlc*4@cluster0.krlrp.mongodb.net/user-registration?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.use("/api",userRoutes);

  app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  })

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
