import express from "express";
import cors from "cors";
import mongoose from "mongoose"; 
import bodyParser from "body-parser";
import {userRouter} from "./routes/users.js";
import {recipeRouter} from "./routes/recipes.js";

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(express.json());

app.use(cors());
app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

mongoose.connect("mongodb+srv://joshithmurthy:joshithmurthy123@recepies.az4ogbn.mongodb.net/?retryWrites=true&w=majority" ,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
);


app.listen(3001, () => console.log("Server started"));