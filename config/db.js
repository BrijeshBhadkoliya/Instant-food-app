require("dotenv").config();
module.exports.connectDB = async () => {
  try {
     require('mongoose').connect(process.env.MONGO_URI || "mongodb://localhost:27017/instant-food", {
      serverSelectionTimeoutMS: 5000, // Max wait 5s for response
      connectTimeoutMS: 10000, // Max wait 10s for connection
    });
    console.log(` MongoDB Connected`);
  } catch (error) {
    console.error(` MongoDB Connection Error`);
    process.exit(1); 
  }
};


