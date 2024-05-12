import express from 'express'
import { protectRoute } from '../middlewares/protectRoute.js';
import { createPost,deletePost,commentPost,likeUnlikePost, getAllPost ,getLikedPosts,getFollowingPosts,getUserPosts} from '../controllers/post.controller.js';
const  router= express.Router();

router.post("/create",protectRoute,createPost);
router.post('/like/:id',protectRoute,likeUnlikePost);
router.post('/comment/:id',protectRoute,commentPost);
router.delete("/:id",protectRoute,deletePost);
router.get("/likes/:id",protectRoute,getLikedPosts);

router.get("/foryou",protectRoute,getAllPost);
router.get('/following',protectRoute,getFollowingPosts);

router.get('/user/:username',protectRoute,getUserPosts);


export default router;