const express= require('express');
const router= express.Router();

 router.get('/',(req,res)=>{
    obj={
        text: 'String text for notes',
        num: 34345
    }
    res.json(obj);
 })

 module.exports=router; 