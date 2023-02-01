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

//* Postman request URL (example): 'http://localhost:3001/api/categories/4'
//* Postman response: 
// {
//   "id": 4,
//   "category_name": "Hats",
//   "products": [
//       {
//           "id": 3,
//           "product_name": "Branded Baseball Hat",
//           "price": 23,
//           "category_id": 4
//       }
//   ]
// }
//* console.log (example): find category with id= 4 by primary key in category-routes

//* GET route to find a category by primary key
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

//* SQL syntax for inserting new cateogory upon POST request: 
//Executing (default): INSERT INTO `category` (`id`,`category_name`) VALUES (DEFAULT,?);
// category {
//   dataValues: { id: 6, category_name: 'Hoodies' },

//* Postman POST request URL (example): 'http://localhost:3001/api/categories'
//* Postman JSON request body (example): 
// {
//   "category_name": "Hoodies"
//   }
//* Postman POST request response:
// {
//   "id": 6,
//   "category_name": "Hoodies"
// }
//* POST route to add new category to database (only parameter available for input is 'category_name' since id is autoincrement from prior category ids)
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    ...req.body,
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      res.status(200).json(newCategory);
      console.log(newCategory, `new category called ${req.body.category_name} added to db!`)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
