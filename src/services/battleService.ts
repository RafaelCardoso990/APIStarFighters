import axios from "axios";
import { findUser, createUser, updateUser } from "../repositories/battleRepository.js";

export async function BatlleResult(firstUser: string, secondUser: string) {
    console.log(firstUser)

    let counterFirstUser = 0

    const dataFirstUser = await axios.get(
        `https://api.github.com/users/${firstUser}/repos`
    )

    dataFirstUser.data.forEach(({ stargazers_count }) => (counterFirstUser += stargazers_count))
    
    let counterSecondUser = 0

    const dataSecondUser = await axios.get(
        `https://api.github.com/users/${secondUser}/repos`
    )

    dataSecondUser.data.forEach(({ stargazers_count }) => (counterSecondUser += stargazers_count))

    const draw: boolean = counterFirstUser === counterSecondUser ? true : false
    const winner: string = draw ? null : counterFirstUser > counterSecondUser ? firstUser : secondUser
    const loser: string = draw ? null : counterFirstUser > counterSecondUser ? secondUser : firstUser
  
    const log = {
      winner,
      loser,
      draw,
    }
  
    return log
}

export async function updateParticipants(
    firstUser: string,
    secondUser: string,
    log: { winner: string; loser: string; draw: boolean }
  ) {
    // check if users are in the database
    const { rows: firstParticipant } = await findUser(firstUser)
    const { rows: secondParticipant } = await findUser(secondUser)
  
    // create new rows in the database the a user doesn't exist
    if (!firstParticipant[0]) {
      await createUser(firstUser)
    }
    if (!secondParticipant[0]) {
      await createUser(secondUser)
    }
  
    // log for first and second users
    const win1 = log.draw ? 0 : log.winner === firstUser ? 1 : 0
    const lose1 = log.draw ? 0 : log.winner === firstUser ? 0 : 1
    const win2 = log.draw ? 0 : log.winner === secondUser ? 1 : 0
    const lose2 = log.draw ? 0 : log.winner === secondUser ? 0 : 1
  
    // update user data
    await updateUser(firstUser, win1, lose1, log.draw ? 1 : 0)
    await updateUser(secondUser, win2, lose2, log.draw ? 1 : 0)
  }