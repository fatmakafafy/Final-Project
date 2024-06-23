// import express from 'express'
// import * as dotenv from 'dotenv'
// dotenv.config()
// import { dbConnection } from './database/dbConnection.js'
// import userRouter from './src/modules/user/user.router.js'
// import taskRouter from './src/modules/task/task.router.js'

// const app = express()
// const port = 3000

// app.use(express.json())
// app.use('/users',userRouter)
// app.use('/tasks',taskRouter)
// dbConnection()


// app.get('/', (req, res) => res.send('Hello World!'))
// // app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// app.listen(port, () => console.log(`http://localhost:${port}`))

import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import { dbConnection } from './database/dbConnection.js';
import userRouter from './src/modules/user/user.router.js';
import taskRouter from './src/modules/task/task.router.js';
import notificationRouter from './src/modules/notification/notification.router.js'
import { checkSensorDataAndNotify } from './src/modules/notification/notification.controller.js';
import childRouter from './src/modules/child/child.router.js';


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/notifications',notificationRouter)
app.use('/child',childRouter)
dbConnection();

app.get('/', (req, res) => res.send('Hello World!'));

// app.listen(port, () => console.log(`http://localhost:${port}`));


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
        setInterval(async () => {
        await checkSensorDataAndNotify();
    }, 86400000);
});