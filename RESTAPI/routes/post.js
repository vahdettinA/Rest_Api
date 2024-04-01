const express =require("express");
const {getPosts,searchPost,createPosts,getDetail,getUpdate,deletePost}=require("../controllers/post.js")

const router =express.Router();


router.get('/getPosts',getPosts)
router.post('/createPosts',createPosts)
router.get('/getDetailes/:id',getDetail)
router.patch('/getUpdate/:id',getUpdate)
router.delete('/deletePosts/:id',deletePost)
router.get('/searchPosts',searchPost)


module.exports=router
