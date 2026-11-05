import express from 'express'
import cors from 'cors'
const app=express()
app.use(cors())
app.get('/',(req,res)=>{
   
   res.send({ success:true,
    message:'Hello from the server'
   })
})
app.get('/add/:a/:b',(req,res)=>{
    const a=parseInt(req.params.a)
    const b=parseInt(req.params.b)
    if(isNaN(a)||isNaN(b)){
        res.send({
            success: false,
            message: 'invalid variables',
            data: null,
        })
    }
    else{
        res.send({
            success: true,
            message: 'Operation Successful',
            data: a+b,
        })
    }
})
app.get('/sub/:a/:b',(req,res)=>{
    const a=parseInt(req.params.a)
    const b=parseInt(req.params.b)
    if(isNaN(a)||isNaN(b)){
        res.send({
            success:false,
            message:'Inavalid',
            data:null
         })
          }
          else{
            res.send({
                success:true,
                message:'Operation Succesful',
                data:a-b
            })
          }
})
     app.get('/multiply/:a/:b',(req,res)=>{
    const a=parseInt(req.params.a)
    const b=parseInt(req.params.b)
    if(isNaN(a)||isNaN(b)){
        res.send({
            success:false,
            message:'Inavalid',
            data:null
         })
          }
          else{
            res.send({
                success:true,
                message:'Operation Succesful',
                data:a*b
            })
          }
        })
          app.get('/divide/:a/:b',(req,res)=>{
    const a=parseInt(req.params.a)
    const b=parseInt(req.params.b)
    if(isNaN(a)||isNaN(b)){
        res.send({
            success:false,
            message:'Inavalid',
            data:null
         })
          }
          else if(b==0){
           res.send({ success:false,
                message:'denominator cannot be 0',
                data:null
           })
          }
          else{
            res.send({
                success:true,
                message:'Operation Succesful',
                data:a/b
            })
          }
        })
    
          app.get('/module/:a/:b',(req,res)=>{
    const a=parseInt(req.params.a)
    const b=parseInt(req.params.b)
    if(isNaN(a)||isNaN(b)){
        res.send({
            success:false,
            message:'Inavalid',
            data:null
         })
          }
          else{
            res.send({
                success:true,
                message:'Operation Succesful',
                data:a%b
            })
          }
        })
          app.get('/square/:a',(req,res)=>{
    const a=parseInt(req.params.a)
    
    if(isNaN(a)){
        res.send({
            success:false,
            message:'Inavalid',
            data:null
         })
          }
          else{
            res.send({
                success:true,
                message:'Operation Succesful',
                data:a*a
            })
          }
        })
        app.get('/percentage/:part/:whole',(req,res)=>{
    const part=parseFloat(req.params.part)
    const whole=parseFloat(req.params.whole)

    if(isNaN(part)||isNaN(whole)){
        res.send({
            success:false,
            message:"Invalid",
            data:null
        })
    }
    else{
        res.send({
            success:true,
            message:"Operation Successful",
            data:(part/100)*whole
        })
    }
})

app.listen(3000,()=>{
    console.log("Server is running...")
})