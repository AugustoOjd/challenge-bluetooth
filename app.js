const express = require('express')
const sequelize = require('./src/db/dbConnection')
const {User} = require('./src/models/User.model')
const userRouter = require('./src/routes/user.routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')


const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
// app.use(session(sess))
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(session({
  secret: 'sd23ctest',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, maxAge: 60000 }
}))

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

