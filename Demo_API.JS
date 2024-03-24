const express=require('express');
const mysql=require('mysql2');
const dotenv=require("dotenv");
dotenv.config();


const connection=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    
})
connection.connect()


const app=express();
const port=process.env.port;

app.use(express.json());



app.get('/users',(req,res)=>{

    connection.query('select * from users',(err,rows,fields)=>{
        if(err) throw err
        
        //console.log("solution is",rows);
        res.send(rows);
    })
});


app.post('/newusers', (req, res) => {
   console.log(req.body);

   let id=req.body.id;
   let first_name=req.body.first_name;
   let last_name=req.body.last_name;
   let username=req.body.username;
   let password=req.body.password;

   let query = "INSERT INTO users(first_name,last_name,username,password) VALUES ( " + `'${first_name}' , '${last_name}' , '${username}' , '${password}' ) ` ;

   console.log(query);

   // let query_to_execute=`INSERT INTO todo_management.users(first_name,last_name,username,password)VALUES(${first_name},last_name,username,password)`;


//let query_to_execute = 'INSERT INTO todo_management.users(id,first_name,last_name,username,password) VALUES,id';
connection.query(query,(err,rows,fields)=>{
    if(err) throw err

    //res.send(rows);
    let query1="select * from users where id= (SELECT MAX(id) FROM users)" ;
    connection.query(query1,(err,rowss,fields)=>{
        if (err) throw err
        res.send(rowss[0]);

    })

});
  
  });

  app.put('/updateusers',(req,res)=>{

    id=req.body.id;
    first_name=req.body.first_name;
    last_name=req.body.last_name;
    username=req.body.username;
    password=req.body.password;

  let update_query="update todo_management.users set first_name=" +`'${first_name}'`+ " , last_name=" +`'${last_name}' ,username='${username}' ,password= '${password}' where id='${id}'`;
    connection.query(update_query,(err,rows,fields)=>{
        if(err) throw err
        
        //console.log("solution is",rows);
       // res.send(rows);
        //id=req.body.id;
        let query3="select * from todo_management.users where id="+`'${id}'`;
        connection.query(query3,(err,rows1,fields)=>{
            if (err) throw err

            res.send({message:'Data updated successfully',data:rows1});
        });


       
    });
});



//   app.post('/users', (req, res) => {
//     console.log(req.body);
 
//     
    
//     let queryid = 
 
//     console.log(queryid);
 

//  connection.query(queryid,(err,rows,fields)=>{
//      if(err) throw err
 
//      res.send("queryid");
//  });
    
//   });

 
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
});