import Express from "express"
import cors from "cors"
import userRouter from "./src/routers/usersRouters.js";
import rankingRouter from "./src/routers/rankingRouter.js";

const app = Express();

app.use(cors())
app.use(Express.json())
app.use(userRouter)
app.use(rankingRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});