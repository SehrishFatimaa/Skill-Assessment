const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./connect/mongoCon');
const data = require('./model/data')

connectDB();
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.post('/login', async (req,res)=>{

    const query = { 
        'user': req.body.user,
        'email': req.body.email,
        'pass': req.body.password };

    const foundOne = await data.findOne(query);

    if (foundOne) {
        res.json({
            msg:`login successfull`,
            data:req.body
        });
    } 
    else if(foundOne===null) {
      res.send('account with this email does not exist');
    }
});


app.post('/signup', async (req,res)=>{

    const query = { 'email': req.body.email };

    const foundOne = await data.findOne(query);

    if (foundOne) {
        res.send(`account with this email already exists`);
    } 
    else if(foundOne===null) {
        await data.create({
            'user': req.body.user,
            'email': req.body.email,
            'pass': req.body.password
         })
      res.json({
        msg:'signup successfull',
        data:{
            user:req.body.user,
            email:req.body.email,
            pass: req.body.password
        }
    });
    }
        
});

app.post('/ChangeName', async (req,res)=>{

    const query = { 
        'user': req.body.user,
        'email': req.body.email,
        'pass': req.body.password };

    const foundOne = await data.findOne(query);

    if (foundOne) {
        await data.updateOne(
            query,
            { $set: { "user" : req.body.newUser } }
        )
        res.json({
            msg:'rename successfull',
            data:req.body.newUser
        });
    } 
    else if(foundOne===null) {
        res.send('account with this email does not exist');
    }
        
});

app.post('/ChangePass', async (req,res)=>{
    console.log(req.body);
    const query = { 
        'user': req.body.newUser,
        'email': req.body.email,
        'pass': req.body.password };

    const foundOne = await data.findOne(query);

    if (foundOne) {
        await data.updateOne(
            query,
            { $set: { "pass" : req.body.newPassword } }
        )
        res.send('password change successfull');
    } 
    else if(foundOne===null) {
        
      res.send('account with this email does not exist');
    }
        
});

mongoose.connection.once('open', ()=>{
    console.log('connected to mongodb')
    app.listen(3500, ()=> console.log('server running at 3500'))
})