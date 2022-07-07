import db from "../../config/db.js";

async function findUser(user: string){
    return db.query(`
        SELECT * FROM fighters WHERE username = $1
    `, [user])
}

async function createUser(user: string) {
    return db.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, 0, 0, 0)`, [user])
  }
  
async function updateUser(user: string, wins: number, losses: number, draws: number) {
    return db.query(
      `UPDATE fighters 
      SET (wins, losses, draws) = ($1 + wins, $2 + losses, $3 + draws) 
      WHERE username = $4`,
      [wins, losses, draws, user]
    )
  }

export {
    findUser,
    createUser,
    updateUser
}