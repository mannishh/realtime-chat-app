import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import {connectDB} from "./db/index.js"

const port = process.env.PORT || 8000;

connectDB()
.then (() => {
  app.listen(port, () => {
    console.log("serveer is running on port: ", port)
  })
})

.catch((error) => {
  console.log("mogo db connection failed: ", error)

})