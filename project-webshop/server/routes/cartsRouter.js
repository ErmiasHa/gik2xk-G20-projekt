const router = require('express').Router();
const db = require('../models');
const cartService = require('../services/cartService.js');


router.post('/', (req, res) => {
  const cart = req.body;
  console.log(cart);
  cartService.create(cart).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.get('/', (req, res) => {
  db.cart.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/addProduct', (req, res) => {
  const productId = req.body.productId;
  const cartId = req.body.cartId;
  cartService.addProduct(cartId, productId).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/decreaseAmount/:id', (req, res) => {
  const rowId = req.params.id;
  cartService.reduceAmount(rowId).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/increaseAmount/:id', (req, res) => {
  const rowId = req.params.id;
  cartService.increaseAmount(rowId).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/updateCartRow', (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const amount = req.body.amount;
  cartService.updateCartRow(userId, productId, amount).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  cartService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.put('/:id', (req, res) => {
  const cart = req.body;
  const id = req.params.id;
  cartService.update(cart, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  cartService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  cartService.getUserCart(userId).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.get('/:id/getCartRows', (req, res) => {
  const id = req.params.id;
  cartService.getCartRows(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.delete('/destroyCartRow/:id', (req, res) => {
  const id = req.params.id;
  cartService.destroyCartRow(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
module.exports = router;
