import mongoose from "mongoose";
import app from "./app";

const database = process.env.DATABASE as string;
const port = process.env.PORT;

mongoose
  .connect(database)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  });
