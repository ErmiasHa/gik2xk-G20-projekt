const router = require('express').Router();
const productService = require('../services/productService');


router.get('/', (req, res) => {
  productService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.post('/', (req, res) => {
  const product = req.body;
  productService.create(product).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.get('/:id', (req, res) => {
  const id = req.params.id;

  productService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const product = req.body;

  productService.update(product, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  productService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.post('/:id/addRating', (req, res) => {
  const rating = req.body.rating;
  const id = req.params.id;
  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
