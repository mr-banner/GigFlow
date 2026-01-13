import dotenv from 'dotenv';
import connectDB from './db/index.js';
import  app  from './app.js';
import { ApiError } from "./utils/apiError.js";

dotenv.config({
    path:'./.env'
})

const PORT = process.env.PORT || 5000;


app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error)=>{
    console.log("Failed to start server:", error);
    process.exit(1);
})



