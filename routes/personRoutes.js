const express = require('express');
const router = express.Router();
const Person=require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');


router.post('/signup',async(req,res)=>{
    try{
     const data=req.body;//assuming req body contains the person data
     //creating a new person uing mongoose model
     const newPerson=new Person(data);
     const response=await newPerson.save();
     console.log("data saved");
     const payload = {
      id: response.id,
      username: response.username
  }
  console.log(JSON.stringify(payload));
  const token = generateToken(payload);
  console.log("Token is : ", token);

  res.status(200).json({response: response, token: token});

     
  
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'internalserver error'});
    }
  
  })

  router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

  router.get('/',jwtAuthMiddleware ,async(req,res)=>{
    try{const data=await Person.find();
      console.log("data saved");
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internalserver error'});
    }
  })

  router.get('/:workType', async (req, res) => {
    try {
    const workType = req.params.workType; // Extract the work type from the URL parameter
    // Assuming you already have a Person model and MongoDB connection set up
     if(workType=='chef' || workType=='waiter' || workType=='manager' ){
    const persons = await Person.find({ work: workType }); 
    console.log('response fetched');
    // Send the list of persons with the specified work type as  a JSON response
    res.status(200).json(persons);}
    else {
      // If workType is not one of the allowed values, send a 400 Bad Request response
      res.status(400).json({ error: 'Invalid work type' });
  
  }
    } catch (err) {
    console.log('Error fetching persons:', err);
    res.status(500).json({ error: 'Internal server error' });
    }
    })

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id //extract the id from url
        const updateDetails=req.body;// updated data of the person
        const response=await Person.findByIdAndUpdate(personId,updateDetails,{
            new:true,
            runValidators:true
        })
         if (!response) {
 return res.status(404).json({ error: 'Person not found'}) }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err)
    {console.log('Error ', err);
        res.status(500).json({ error: 'Internal server error' });
        

    }
})

router.delete('/:id',async(req,res)=>{
    try{ const personId=req.params.id //extract the id from url
           const response=await Person.findByIdAndDelete(personId);
           if (!response) {
            return res.status(404).json({ error: 'Person not found'}) }
            console.log("data deleted");
            res.status(200).json({message:'data deleted'});

    }catch(err)
    {
        console.log('Error ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


    module.exports=router;
   