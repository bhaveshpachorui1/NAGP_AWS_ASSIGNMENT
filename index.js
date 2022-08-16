const express = require('express');
const mysql = require('mysql2');

const app  = express();
const PORT = process.env.PORT || 3000;

app.set('views', './');
app.set('view engine','ejs');

app.get('/',async (req,res) => {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PWD
    });

    var randomId =  Math.floor(Math.random() * 10) + 1;
    connection.query(
        'select * from Meme where id='+randomId,
            (err, results,fields) => {
               if(!err){
                res.render('index',{meme: results[0]});
               }
            }
        );
});

//Starting app
app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
});