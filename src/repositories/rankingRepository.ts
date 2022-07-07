import db from "../../config/db.js"

function getRanking() {
  return db.query(`SELECT username, wins, losses, draws FROM fighters ORDER BY wins DESC, draws DESC`)
}

const rankingRepository = {
  getRanking,
}

export default rankingRepository