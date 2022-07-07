import { Request, Response } from "express"
import { BatlleResult, updateParticipants } from "../services/battleService.js"

export async function SetBattle(req: Request, res: Response) {
   const {firstUser, secondUser}: {firstUser: string, secondUser:string} = req.body
    
   try {
       const battle = await BatlleResult(firstUser, secondUser)
       await updateParticipants(firstUser, secondUser, battle)

       res.status(200).send(battle)
   } catch (error) {       
       res.status(500).send(error)
   }
}