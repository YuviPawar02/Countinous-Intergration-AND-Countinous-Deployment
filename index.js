// var express = require("express");
// var app = express();

// app.get('/',function(req,resp){
//     resp.send("hello from api");
// });

// app.listen(9000,()=>console.log("api started listning ......"));




// var express = require("express");
// var app = express();
// app.get('/',function(req,resp){
//     resp.send("hello world");
// })

// app.get('/wishes/:name',function(req,resp){
//     var name = req.params.name;
//     resp.send(`hello ${name}`);
// })

// app.listen(9000,()=>console.log("api started listening......"));





// var express = require("express");

// var app = express();

// app.get('/',function(req,resp){
//     resp.send("hello from API");
// });
// app.get('/square/:n',function(req,resp){
//     var n = Number(req.params.n);
//     resp.send(`Square of ${n} is: ${n*n}`);
// });
// app.get('/addition/:a/:b',function(req,resp){
//     var a = Number(req.params.a);
//     var b = Number(req.params.b);
//     var c = a+b;
//     resp.send(`Add of ${a} and ${b} is ${c}`);
// });

// app.listen(9000,()=>console.log("api started listening......"));





// const express = require("express");
// const app = express();

// app.use(express.json());

// let users = [
//     {id:1,name:"yuvraj",age:20},
//     {id:2,name:"Lavish",age:21}
// ];

// POST
// app.post("/users",(req,res) => {
//     const newUser = {
//         id : users.length + 1,
//         name : req.body.name,
//         age : req.body.age
//     };

//     users.push(newUser);
//     res.send(newUser);
// });

// // // GET
// // app.get("")
// app.listen(9000,()=>console.log("api started listening......"));








// app.put("/users/:id", (req, res) => {
//   const user = users.find(u => u.id == req.params.id);

//   if (!user) return res.status(404).send("User not found");

//   user.name = req.body.name;
//   user.age = req.body.age;

//   res.send(users);
// });

// app.listen(9000,()=>console.log("api started listening......"));






// assignment


// const express = require("express");
// const app = express();

// app.use(express.json());

// let students = [
//     {id:1,name:"A",mobileno:8948395839,address:"ABC",age:20},
//     {id:2,name:"B",mobileno:64357643423,address:"RGF",age:21}
// ];

// // POST
// app.post("/students",(req,res) => {
//     const student = {
//         id : student.length + 1,
//         name : req.body.name,
//         mobileno : req.body.mobileno,
//         address : req.body.address,
//         age : req.body.age
//     };

//     users.push(student);
//     res.send(student);
// });


// app.listen(9000,()=>console.log("api started listening......"));



// ASSIGNMENT



// const express = require("express");
// const app = express();

// app.use(express.json());

// let students = [
//     { id: 1, name: "A", mobileno: 8948395839, address: "ABC", age: 20 },
//     { id: 2, name: "B", mobileno: 6435764342, address: "RGF", age: 21 }
// ];

// // POST
// app.post("/students", (req, res) => {
//     const student = {
//         id: students.length + 1,
//         name: req.body.name,
//         mobileno: req.body.mobileno,
//         address: req.body.address,
//         age: req.body.age
//     };

//     students.push(student);
//     res.send(student);
// });

// // GET
// app.get("/students/:id", (req, res) => {
//     const student = students.find(s => s.id === parseInt(req.params.id));

//     if (!student) {
//         return res.status(404).send("Student not found");
//     }

//     res.send(student);
// });

// // PUT
// app.put("/students/:id", (req, res) => {
//     const student = students.find(s => s.id === parseInt(req.params.id));

//     if (!student) {
//         return res.status(404).send("Student not found");
//     }

//     student.name = req.body.name;
//     student.mobileno = req.body.mobileno;
//     student.address = req.body.address;
//     student.age = req.body.age;

//     res.send(student);
// });

// // DELETE
// app.delete("/students/:id", (req, res) => {
//     const index = students.findIndex(s => s.id === parseInt(req.params.id));

//     if (index === -1) {
//         return res.status(404).send("Student not found");
//     }

//     const deletedStudent = students.splice(index, 1);
//     res.send(deletedStudent);
// });

// app.listen(9000, () => console.log("API started listening on port 9000"));





// JWT - authorization

//  app.js (Complete Example)
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");


//  THIS LINE WAS MISSING IN YOUR FILE
const app = express();


app.use(bodyParser.json());


const PORT = 4000;
const SECRET_KEY = "mysecret123";

// Fake users (no DB)
const users = [
  { id: 1, username: "admin", password: "1234" },
  { id: 2, username: "user", password: "abcd" }
];


// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;


  const user = users.find(
    u => u.username === username && u.password === password
  );


  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }


  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  

  res.json({ token });
});


// JWT Middleware
function verifyToken(req, res, next) {
  const header = req.headers["authorization"];


  if (!header)
    return res.status(403).json({ message: "Token missing" });


  const token = header.split(" ")[1];


  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });


    req.user = decoded;
    next();
  });
}


// Protected Route
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome Dashboard",
    user: req.user
  });
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server Security running on port ${PORT}`);
});

