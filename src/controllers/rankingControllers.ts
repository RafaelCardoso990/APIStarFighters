import { Request, Response } from "express"

import rankingRepository from "../repositories/rankingRepository.js"

export async function getRanking(req: Request, res: Response) {
  try {
    const { rows } = await rankingRepository.getRanking()
    const ranking = {
      fighters: rows,
    }

    res.send(ranking)
  } catch (e) {
    res.sendStatus(500)
  }
}