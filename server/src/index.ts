// import app from './app';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// dotenv.config();

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log(`Connected to MongoDB ${process.env.MONGODB_URI}`);
//   })
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   });

// app.listen(process.env.PORT);
import app from './app';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(` App is running at http://localhost:${port} in %s mode`);
  console.log(' Press CTRL-C to stop \n');
});
