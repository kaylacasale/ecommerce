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
    // be sure to include its associated Products
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
      res.status(200).json(categories)
      console.log(categories)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {
    attributes: [
      'id',
      'category_name',
    ],
    // be sure to include its associated Products
    include: {
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'category_id',
      ]
    }
  })
    .then((category) => {
      console.log(category, `find category with id= ${req.params.id} by primary key in category-routes`);
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })

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
