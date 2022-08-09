const express = require('express');
const connection = express();
const mysql = require('mysql');
const cors = require('cors');

connection.use(cors());
connection.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database:"employeesystem"
})

connection.get('/employees', (req,res)=>{
    db.query("SELECT*FROM employees", (err, result)=>{
        if(err){
            console.log("err")
        }else{
            res.send(result)
        }
    })
})

connection.post('/create', (req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const salary = req.body.salary;

    db.query("INSERT INTO employees (name, age, country, position, salary) VALUE(?,?,?,?,?)", 
        [name, age, country, position, salary],
        (err,result)=>{
            if(err){
                console.log("Err")
            }else{
                res.send("Value inserted")
            }
        }
    )
})

connection.put('/update', (req,res)=>{
    const id = req.body.id;
    const salary = req.body.salary
    db.query("UPDATE employees SET salary = ? Where id=?", [salary, id], (err, result)=>{
        if(err){
            console.log("Error")
        }else{
            res.send(result)
        }
    })
})

connection.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM employees Where id=?", id, (err,result)=>{
        if(err) {
            console.log("Error")
        }
        else {
            res.send(result)
        }
    })
})

connection.listen('3001', ()=>{
    console.log('Server is running on port 3001')
})