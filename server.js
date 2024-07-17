const express = require('express')
const app = express();
const db=require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const MenuItem=require('./models/Menu');

const Person=require('./models/person');

app.get('/', function (req, res) {
  res.send('welcome to hotel');
})









const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);


// app.post('/items',function(req,res)
// {
//     res.send('result is saved');
// })
const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log('server is live');
}) //it is the port number of server




























// app.get('/vadapav', function (req, res) {
//   res.send('rohit sharma');
// })

// app.get('/chole', function (req, res) {
//   res.send('shikhar dhawan');
// })  

// app.get('/idli',function (req,res) 
// {    var customized_idli=
//   {
//       "name":"rawa dili",
//       is_chutney:false,
//       is_tasty:true
//   }
//   res.send(customized_idli);
// })

// const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
//  const jsonObject = JSON.parse(jsonString); // Convert JSON string to object
//  console.log(jsonObject.name); // Output: John

// const objectToConvert = { name: "Alice", age: 25 };
//  const jsonStringified = JSON.stringify(objectToConvert); // Convert object JSON string
//  console.log(jsonStringified); // Output: {"name": "Alice", "age":25}
// console.log(typeof jsonStringified);


// var notes=require('./notes.js');
// console.log(notes.age);
// console.log(notes.addnumber(notes.age,9));




// var _=require('lodash');
// var array=["number","number",1,2,2,1,"age"];
// var result=_.uniq(array);
// console.log(result);





// const add=function(a,b,abhi){
//     var result=a+b;
//     console.log(result);
//     abhi();
// }
// add(2,9,()=>console.log("hurray"));
// var fs=require('fs');
// var os=require('os');
// var user=os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt','hola' +user.username+'!\n',()=>console.log("file is created"));