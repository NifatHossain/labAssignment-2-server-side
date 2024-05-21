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
    connection.connect((error)=>{
        if(error){
            console.log(error)
        }
        var sql= 'select * from users';
        connection.query(sql,(error,result)=>{
            if(error){
                console.log(error)
            }
            // console.log(res)
            res.send(result)
        })
        
    })
}
);

// POST API end point defination
app.post('/test-post', function (req, res) {
    console.log(req.body);
    return res.json('success');
});

// DB
app.post('/adduser', function (req, res) {
    console.log("here-----");

    const user = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        password: req.body.password
    };

    console.log("user", user);

    connection.query(`INSERT INTO users (fName, lName, gender, birthDate, email, password) VALUES ('${user.fname}', '${user.lname}', '${user.gender}', '${user.dob}','${user.email}', '${user.password}');`,
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