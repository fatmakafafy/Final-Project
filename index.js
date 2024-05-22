import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import { dbConnection } from './database/dbConnection.js'
import userRouter from './src/modules/user/user.router.js'
import blogRouter from './src/modules/blog/blog.router.js'

const app = express()
const port = 3000

app.use(express.json())
app.use('/users',userRouter)
app.use('/blogs',blogRouter)
dbConnection()


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))