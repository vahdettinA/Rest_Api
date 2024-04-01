const Auth=require("../module/auth.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const register = async (req,res)=>{
    try{
     const {username,email,password}=req.body
     const user = await Auth.findOne({email})
     if(user){
        return res.status(500).json({message:"Bu email hesabi zaten var"})
     }
     if(password.length<6){
        return res.status(500).json({message:"Parolaniz en az 6 karakterden olusmali"})
     }
      const passwordHash= await bcrypt.hash(password,12)
      const newUser=await Auth.create({username,email,password:passwordHash})
      const userToken= jwt.sign({id:newUser.id},process.env.SECRET_TOKEN,{expiresIn:'1h'})

      res.status(201).json({
        status:"tamam",
        newUser,
        userToken,
      })
    }catch(err){
        return res.status(500).json({message:err.message})
    }

}


const login=async(req,res)=>{

    try{
        const {email,password}=req.body;
        const user= await Auth.findOne({email});
        if(!user){
            return res.status(500).json({message:"Böyle bir kullanıcı yok"})
        }
        const comparePassword=await bcrypt.compare(password,user.password)
        if(!comparePassword){
            return res.status(500).json({message:"Parola yalnış"})
        }
       const userToken=jwt.sign({id:user.id},process.env.SECRET_TOKEN,{expiresIn:'1h'})
       res.status(200).json({
          status:"OK",
          userToken,
          user
       })
        
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports={register,login}