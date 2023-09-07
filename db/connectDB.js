import mongoose from "mongoose";

export default function connectDB(DATABASE_URL) {


    const options={
      dbName:'ERP',
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }
  mongoose
    .connect(DATABASE_URL,options)
    .then((e) => {
      console.log("connected to database");
    })
    .catch((e) => {
      console.log("Error:", e);
    });
}
