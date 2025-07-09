const app = require('./app');
const mongoose = require('mongoose');
const connectDB = require('./Config/db');
const dotenv = require('dotenv');
dotenv.config();
// Connect to the database
mongoose.set('strictQuery', false); // Disable strict query mode
connectDB();

const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));

