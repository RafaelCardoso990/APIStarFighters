import { Router } from "express"

import { getRanking } from "../controllers/rankingControllers.js"
import schemaValidator from "../middlewares/schemaValidator.js"
import { battleSchema } from "../schemas/battleShemas.js"

const rankingRouter = Router()

rankingRouter.get("/ranking", schemaValidator(battleSchema),getRanking)

export default rankingRouter