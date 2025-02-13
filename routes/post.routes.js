const {Router}=require('express');
const postController = require('../controllers/post.controller');
const userAuthMiddleware = require('../middlewares/userAuth.middleware');

const router=Router();

router.post('/create',userAuthMiddleware,postController.createPost);
router.get('/post-one/:id',userAuthMiddleware,postController.getPost);
router.get('/all-posts',userAuthMiddleware,postController.getPosts);
router.put('/update/:id',userAuthMiddleware,postController.updatePost);
router.delete('/delete/:id',userAuthMiddleware,postController.deletePost);
router.patch('/add-tag/:id',userAuthMiddleware,postController.addRememberToTags);
router.patch('/remove-tag/:id',userAuthMiddleware,postController.removeRememberToTags);
router.get('/filter',userAuthMiddleware,postController.getRemeberFromTags);
module.exports=router;