const express = require('express')
const sequelize = require('./src/db/dbConnection')
const {User} = require('./src/models/User.model')
const userRouter = require('./src/routes/user.routes')
const bodyParser = require('body-parser')

const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/user', userRouter)

const connectionMain = async () =>{
    try {
        await sequelize.authenticate();

        await User.sync();
        // await User.sync({ force: true });
        console.log('Connection has been established successfully.');
        
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
          })
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connectionMain()

