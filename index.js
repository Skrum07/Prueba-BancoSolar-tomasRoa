import express from "express";
import userRoutes from "./routes/userRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;



//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/", userRoutes);
app.listen(PORT, () => console.log(`Listening on port: http://localhost:${PORT}`));