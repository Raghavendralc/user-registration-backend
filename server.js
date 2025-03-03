const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/user.routes");

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://user-registration-raghavendralcs-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.options('*', cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get("/", (req, res) => {
  res.send("User Registration API is running...");
});

app.use("/api", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
