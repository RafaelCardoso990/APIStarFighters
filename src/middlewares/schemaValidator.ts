import { Request, Response, NextFunction } from "express"
import { ObjectSchema } from "joi"

export default function schemaValidator(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false })
    if (validation.error) {
      return res.status(422).send(validation.error.details.map((e) => e.message))
    }

    next()
  }
}