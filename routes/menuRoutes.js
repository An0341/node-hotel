const express = require('express');
const router = express.Router();
const MenuItem=require('./../models/Menu');


router.post('/',async(req,res)=>{
    try{  const data1=req.body;
          const newItem= new MenuItem(data1);
          const respond=await newItem.save();
          console.log('darta is saved of items');
          res.status(200).json(respond);
  
    }catch(err){
          console.log('ERROR OCCURED IN ITEMS SAVING');
          res.status(500).json({error:'internal error occured'});
    }
  })

  router.get('/',async(req,res)=>{
    try{const data=await MenuItem.find();
  
      console.log("data saved");
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internalserver error'});
    }
  }
  )
  
  router.get('/:tasteI',async (req,res)=>{
    try{const tasteI=req.params.tasteI
      if(tasteI=='Sweet' || tasteI=='Sour' || tasteI=='Spicy')
      {
        const response=await MenuItem.find({taste:tasteI});
        console.log('response fetched');
        res.status(200).json(response);

      }
      else {
        // If workType is not one of the allowed values, send a 400 Bad Request response
        res.status(400).json({ error: 'Invalid taste type' }); }

    }catch(err){
      console.log(err);
      res.status(500).json({error:'internalserver error'});
    }
  })






  router.put('/:id',async(req,res)=>{
    try{
           const menuId=req.params.id;
           const updatedData=req.body;
           const response=await MenuItem.findByIdAndUpdate(menuId,updatedData,{
             new:true,
             runValidators:true

           })
           if (!response) {
            return res.status(404).json({ error: 'Person not found'}) }
            console.log("data updated");
            res.status(200).json(response);

    }catch(err){
      console.log(err);
      res.status(500).json({error:'internalserver error'});
    }
  })

  router.delete('/:id',async(req,res)=>{
    try{const menuId=req.params.id;
     
      const response=await MenuItem.findByIdAndDelete(menuId);
      if (!response) {
        return res.status(404).json({ error: 'Person not found'}) }
        console.log("data deleted");
        res.status(200).json({message:'data deleted succuesfully'});

    }catch(err){
      console.log(err);
      res.status(500).json({error:'internalserver error'});
    }
  })

  module.exports=router;