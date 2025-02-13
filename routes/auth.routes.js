const {Router}=require('express');
const authController = require('../controllers/auth.controller');
const userAuthMiddleware=require('../middlewares/userAuth.middleware');
const router=Router();

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/logout',authController.logout);
router.get('/refresh',authController.refresh);
router.get('/users',userAuthMiddleware,authController.getUsers);
router.get('/users/:id',userAuthMiddleware,authController.getUser);
router.get('/data',userAuthMiddleware,authController.getUserData);

module.exports=router;