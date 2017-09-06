var express = require('express');
var router = express.Router();
var passport = require('passport');

var userController = require('../controllers/userController');
var provinceController = require('../controllers/provinceController');
var sizeController = require('../controllers/sizeController');
var crustController = require('../controllers/crustController');
var cheeseController = require('../controllers/cheeseController');
var toppingController = require('../controllers/toppingController');
var storeController = require('../controllers/storeController');
var orderController = require('../controllers/orderController');
var auth = require('../authenticate/auth');

router.post('/login',auth.login);
router.get('/logout',auth.logout);
router.post('/auth', auth.authUser);

router.get('/users' , userController.getUser);
router.post('/users', userController.postUser);
router.get('/users/:user_id', userController.getidUser);
router.put('/users/:user_id', userController.putUser);
router.delete('/users/:user_id', userController.deleteUser);

router.get('/provinces', provinceController.getProvince);
router.post('/provinces', provinceController.postProvince);
router.get('/provinces/:province_id', provinceController.getidProvince);
router.put('/provinces/:province_id', provinceController.putProvince);
router.delete('/provinces/:province_id', provinceController.deleteProvince);

router.get('/sizes', sizeController.getSize);
router.post('/sizes', sizeController.postSize);
router.get('/sizes/:size_id', sizeController.getidSize);
router.put('/sizes/:size_id', sizeController.putSize);
router.delete('/sizes/:size_id', sizeController.deleteSize);
router.get('/getsize/:store', sizeController.getSizeByStore);

router.get('/crusts', crustController.getCrust);
router.post('/crusts', crustController.postCrust);
router.get('/crusts/:crust_id', crustController.getidCrust);
router.put('/crusts/:crust_id', crustController.putCrust);
router.delete('/crusts/:crust_id', crustController.deleteCrust);
router.get('/getcrust/:store', crustController.getCrustByStore);

router.get('/cheeses', cheeseController.getCheese);
router.post('/cheeses', cheeseController.postCheese);
router.get('/cheeses/:cheese_id', cheeseController.getidCheese);
router.put('/cheeses/:cheese_id', cheeseController.putCheese);
router.delete('/cheeses/:cheese_id', cheeseController.deleteCheese);
router.get('/getCheese/:store', cheeseController.getCheeseByStore);

router.get('/toppings', toppingController.getTopping);
router.post('/toppings', toppingController.postTopping);
router.get('/toppings/:topping_id', toppingController.getidTopping);
router.put('/toppings/:topping_id', toppingController.putTopping);
router.delete('/toppings/:topping_id', toppingController.deleteTopping);
router.get('/gettopping/:store', toppingController.getToppingsByStore);

router.get('/stores', storeController.getStores);
router.post('/createstore', storeController.createStore);
router.get('/store/:name', storeController.getStoreByName);
router.get('/getstore/:owner', storeController.getStoreByOwner);
router.delete('/deleteStore/:store_id', storeController.deleteStore);

router.post('/createOrder', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/order/:order_id', orderController.getOrderById);
router.get('/getOrder/:user', orderController.getOrderByUser);
router.get('/getOrderByStore/:store', orderController.getOrderByStore);
router.get('/getOrderByStoreUser/:storeId/:userId', orderController.getOrderByStoreUser);
router.delete('/order/:order_id', orderController.deleteOrder);


module.exports = router;
