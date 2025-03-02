const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Name is Required"],
    minLength:[2,"Name must be atleast 2 characters Long"]
  },
  age:{
    type:Number,
    required:[true,"Age is Required"],
    min:[0,"Age must be greater than 0"],
    max:[120,"Age must be less than 120"]
  },
  dateOfBirth:{
    type:Date,
    required: [true, 'Date of birth is required'],
  },
  password:{
    type:String,
    required:[true,"password is Required"],
    minLength:[10,"password must atleast 10 characters long"]
  },
  gender:{
    type:String,
    required: [true, 'Gender is required'],
    enum:["Male","Female","Other"]
  },
  about:{
    type:String,
    maxLength: [5000, 'About section cannot exceed 5000 characters']
  }
},{
    timestamps:true
});


module.exports=mongoose.model("User",userSchema)