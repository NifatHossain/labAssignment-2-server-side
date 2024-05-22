let mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nifatassignment2'
});
connection.connect(
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('success');
        }
    }
);


// GET API end point defination

app.get('/allusers', function (req, res) {
    
        var sql= 'select * from users';
        connection.query(sql,(error,result)=>{
            if(error){
                console.log(error)
            }
            // console.log(res)
            res.send(result)
        })
        
})

app.get('/currentuser', function (req, res) {
    
        var sql= 'select * from currentuser';
        connection.query(sql,(error,result)=>{
            if(error){
                console.log(error)
            }
            // console.log(res)
            res.send(result)
        })
        
})


app.get('/allusers/:email', function (req, res) {
    const email= req.params.email;
    // connection.connect((error)=>{
    //     if(error){
    //         console.log(error)
    //     }
    var sql= `select * from users where email='${email}'`;
    connection.query(sql,(error,result)=>{
        if(error){
            console.log(error)
        }
        // console.log(res)
        res.send(result)
    })
        
    // })
});

//delete from  users table
app.delete('/deleteuser/:id',(req,res)=>{
    const id=req.params.id;
    const sql= `delete from users where id='${id}'`
    connection.query(sql,(error,result)=>{
        if(error){
            console.log(error)
        }
        // console.log(res)
        res.send(result)
    })
})
//delete from current user table
app.delete('/deletecurrentuser',(req,res)=>{
    const id=req.params.id;
    var sql= `delete from currentuser`;
        connection.query(sql,(error,result)=>{
            if(error){
                console.log(error)
            }
            // console.log(result)
            res.send(result)
        })
})


// DB
app.post('/addcurrentuser', function (req, res) {
    console.log("here-----");

    const user = {
        email: req.body.email
    };

    console.log("user", user);

    var sql= `delete from currentuser`;
        connection.query(sql,(error,result)=>{
            if(error){
                console.log(error)
            }
            // console.log(result)
            res.send(result)
        })

    connection.query(`INSERT INTO currentuser(email) VALUES ('${user.email}');`,
        function (err, result) {
            if (err) {
                console.log("err", err);
                res.json({
                    error: err.sqlMessage,
                })
            } else {
                console.log("result", result);
                // res.json({
                //     result: result,

                // })
            }
        }
    );
})

app.post('/updatedata/:id',(req,res)=>{
    const paramId= req.params.id;
    const user = {
        fname: req.body.fname,
        lname: req.body.lname,
        dob: req.body.dob,
        gender: req.body.gender,
        password: req.body.password,
        image: req.body.image
    };
    console.log(user)
    const sql= `update users set fName="${user.fname}", lName="${user.lname}", birthDate="${user.dob}", gender="${user.gender}", password="${user.password}", image="${user.image}" where id=${paramId}`
    connection.query(sql,(error,result)=>{
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

app.post('/adduser', function (req, res) {
    console.log("here-----");

    const user = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        password: req.body.password,
        image: req.body.image
    };

    console.log("user", user);

    connection.query(`INSERT INTO users (fName, lName, gender, birthDate, email, password,image) VALUES ('${user.fname}', '${user.lname}', '${user.gender}', '${user.dob}','${user.email}', '${user.password}', '${user.image}');`,
        function (err, result) {
            if (err) {
                console.log("err", err);
                res.json({
                    error: err.sqlMessage,
                })
            } else {
                console.log("result", result);
                res.json({
                    result: result,

                })
            }
        }
    );
})

app.listen(3000);