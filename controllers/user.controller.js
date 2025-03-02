const User=require('../models/user.model');
const bycrypt=require("bcryptjs");

const createUser = async(req,res)=>{
    try{
        let{name,age,dateOfBirth,password,gender,about}=req.body;
        const hashedPassword=await bycrypt.hash(password,10);
        
        const newUser=new User({
            name,
            age,
            dateOfBirth,
            password:hashedPassword,
            gender,
            about
        });
        await newUser.save();
        res.status(201).json({message:"user created successfully",newUser})
    }catch(error){
        res.status(400).json({error:error.message})
    }
};

const getUsers=async(req,res)=>{
    try{
        const users=await User.find().select("-password");
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getUser=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({ message: 'User not found'})
        }
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const updateUser=async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        const updates = {...req.body};
        if(updates.password){
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const updatedUser= await User.findByIdAndUpdate(req.params.id,updates,{new:true, runValidators:true,returnDocument: 'after'}).select("-password");
        res.status(200).json(updatedUser);
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const deleteUser=async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });

    }catch{
        res.status(500).json({error:error.message})
    }
}

const getGenders = async (req, res) => {
    try {
      res.status(200).json(['Male', 'Female', 'Other']);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch genders' });
    }
  };

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getGenders
  };