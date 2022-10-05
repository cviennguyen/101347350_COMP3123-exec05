const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs')

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
app.use(express.static(`${__dirname}/public`));

router.get('/home', (req,res) => {
  res.send('This is home router');
});

/*
- Return all details from user.json file to client as JSON format
*/
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/user.json`)
)

router.get('/users',(req,res) => {
  try {
    res.status(200).json({
      status:'success',
      data: {
        users
      }
    })
  } catch(err) {
    res.status(400).json({
      status:'fail',
      message: err
    })
  }
})

router.get('/profile', (req,res) => {
  let username = req.query.username
  let password = req.query.password
  if(users.username == username && users.password == password) {
    res.status(200).json({
      status: true,
      message: "User Is valid"
    })
  } else if (users.username != username){
    res.status(400).json({
      status: false,
      message: "Username Is valid"
    })  
  } else if (users.password != password){
    res.status(400).json({
      status: false,
      message: "Password Is valid"
    })
  }
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send response as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  res.send('This is login router');
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
  let username = req.query.username
  let password = req.query.password
  if(users.username == username && users.password == password) {
    res.send(`<b>${username} successfully logout</b>`)
  } else {
    res.send("Something go wrong")
  }
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));