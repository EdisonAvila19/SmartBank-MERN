import app from './app.js'
import 'dotenv/config'
import { getDB } from './db.js'

const PORT = process.env.PORT || 3000

getDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})