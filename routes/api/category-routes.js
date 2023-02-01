const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//* Postman GET request URL: 'http://localhost:3001/api/categories'
//* Postman response: array of objects with ids 1-5
//* example object in response array:
// {
//   "id": 1,
//   "category_name": "Shirts",
//   "products": [
//       {
//           "id": 1,
//           "product_name": "Plain T-Shirt",
//           "price": 15,
//           "category_id": 1
//       }
//   ]
// },
//...
//* GET route to find all categories (including product model attributes listed below)
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
      'id',
      'category_name',
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'category_id'
        ]
      }
    ]
  })
    .then((categories) => {
      res.json(categories)
      console.log(categories)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
