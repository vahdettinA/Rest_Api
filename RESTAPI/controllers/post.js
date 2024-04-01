
const PostSchema =require("../module/post.js")


const createPosts=async(req,res)=>{
    try{
     const newPost=await PostSchema.create(req.body)
    return res.status(200).json({
        newPost
     })
    }catch(err){
        return res.status(500).json({message:err.message})

    }
}

const getPosts=async(req,res)=>{
    try{
     const getPost=await PostSchema.find()
    return res.status(200).json({
        getPost
     })
    }catch(err){
        return res.status(500).json({message:err.message})

    }
}


const getDetail =async(req,res)=>{
    try{
       const {id}=req.params;
        const detailPost=await PostSchema.findById(id)
       return res.status(200).json({
           detailPost
        })
       }catch(err){
           return res.status(500).json({message:err.message})
   
       }
}

const getUpdate=async(req,res)=>{
    try{
        const {id}=req.params;
        const updatePost=await PostSchema.findByIdAndUpdate(id,req.body,{new:true})
       return res.status(200).json({
           updatePost
        })
       }catch(err){
           return res.status(500).json({message:err.message})
   
       }
}


const deletePost=async(req,res)=>{
    try{
        const {id}=req.params;
        await PostSchema.findOneAndDelete(id)
       return res.status(200).json({
           message:"Silme işleminiz başarılı"
        })
       }catch(err){
           return res.status(500).json({message:err.message})
   
       }
}

const searchPost=async(req,res)=>{

    const {search,tag}=req.query;
    try{
      const title=new RegExp(search,"i")
      const posts=await PostSchema.find({$or:[{title}],tag:{$in:tag.split(",")}})
      return res.status(200).json({
       posts
     })
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}



module.exports={createPosts,getPosts,getDetail,getUpdate,deletePost,searchPost}