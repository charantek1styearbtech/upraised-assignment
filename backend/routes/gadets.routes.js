const express=require('express');
const router=express.Router();


router.get('/',(req,res)=>{
    res.send('Done');
});
router.post('/',(req,res)=>{
    res.send('Done');
})
router.patch('/',(req,res)=>{
    res.send('Done');
})
router.delete('/',(req,res)=>{
    res.send('Done');
})
module.exports=router;