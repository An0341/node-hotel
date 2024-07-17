const mongoose=require('mongoose');
const mongoURL='mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL,
    {
        useNewUrlParser:true, useUnifiedTopology:true 
    }
)
const db=mongoose.connection;

db.on('connected',()=>
{
    console.log("the mongodb server is connected");
})
db.on('error',()=>{
    console.log('there is erroe in connection');
})
db.on('disconnected',()=>
{
    console.log("the connection isdiscoonected with mongodb server");
})

module.export=db;