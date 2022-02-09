// require the library
const mongoose=require('mongoose');

// creating Schema for Contacts
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
  });
  // accessing the Schema with a constant variable 'Contact'
const Contact=mongoose.model('Contact',contactSchema);

// exporting the Schema
module.exports=Contact;