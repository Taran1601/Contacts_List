// require express for setting up the express server
const express=require('express');
// set up the path
const path=require('path');

// set up the port number
const port=8000;

// importing the DataBase
const db=require('./config/mongoose');

// importng the Schema for contacts
const Contact = require('./models/contacts');

// using express
const app=express();

// set up the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// to use encrypted data
app.use(express.urlencoded());

// using static files
app.use(express.static('assets'));


app.get('/',function(req,res){
    return res.render('home',{
        title:"Add Contact"
    });
});

app.get('/add_contact',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
    return res.render('add_contact',{
        title:"Contacts List",
        contact_list:contacts
     });
});
});

//for creating a contact
app.post('/add_contact',function(req,res){
    Contact.create({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email
    },function(err,newContact){
        if(err){
            console.log(`Error in adding a contact`);
            return;
        }
        console.log(`****: ${newContact}`);
       return res.redirect('/add_contact');
    });
 });

// for deleting a contact
app.get('/delete_contact',function(req,res){
    //get the id from query in the url
    let id=req.query.id;
    // find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id,function(err){
            if(err){
                console.log('Error in deleting an object from database');
            }
 
            return res.redirect('back');
    });
 });
 
// for updating a contact
app.get('/update_contact',function(req,res){
    let id=req.query.id;
    console.log(id);
    Contact.findById(id,function(err,updatedContact){
             if(err){
                 console.log('error in updating the contact');
             }
             else{
                 return res.render('update_contact',{
                     Contact:updatedContact
                    });
             }
    });
});
app.post('/update',function(req,res){
    let id=req.query.id;
      console.log(id);
      const newData ={
          name:req.body.name,
          phone:req.body.phone,
          email:req.body.email
      }
      Contact.findByIdAndUpdate(id,newData,function(err){
         if(err){
             res.redirect('update_contact/'+ id);
         }
         else{
             res.redirect('../add_contact');
         }
      });
});

// make the app to listen on the assigned port number
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});