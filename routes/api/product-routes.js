const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
//* Postman GET request URL: 'http://localhost:3001/api/products'
//* Postman GET response (one example object): 
// [
//   {  //* Product attributes
//       "id": 1,
//       "product_name": "Plain T-Shirt",
//       "price": 14.99,
//       "stock": 14,
//       "category_id": 1,
//       "tags": [
//           { //* Tag attributes (x3)
//               "id": 6,
//               "tag_name": "white",
//               "product_tag": { //* ProductTag attributes
//                   "id": 1,
//                   "product_id": 1,
//                   "tag_id": 6
//               }
//           },
//           {
//               "id": 7,
//               "tag_name": "gold",
//               "product_tag": { //* ProductTag attributes
//                   "id": 2,
//                   "product_id": 1,
//                   "tag_id": 7
//               }
//           },
//           {
//               "id": 8,
//               "tag_name": "pop culture",
//               "product_tag": { //* ProductTag attributes
//                   "id": 3,
//                   "product_id": 1,
//                   "tag_id": 8
//               }
//           }
//       ],
//       "category": { //* Category attributes
//           "id": 1,
//           "category_name": "Shirts"
//       }
//   },
//.....] //* example Product object returned
//* GET request to find all products (inclduing tag and category models)
router.get('/', (req, res) => {
  // find all products
  Product.findAll({
    // be sure to include its associated Category and Tag data
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id',
    ],
    include: [
      {
        model: Tag,
        attributes: [
          'id',
          'tag_name',
        ],
      },
      {
        model: Category,
        attributes: [
          'id',
          'category_name',
        ],
      },
    ],
  })
    .then(productData => {
      res.json(productData)
      console.log(productData, 'findAll product data in product routes')
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })

});

// get one product
//* Postman GET request URL (example): 'http://localhost:3001/api/products/2'
//* Postman GET response (example for id=2): 
// {
//   "id": 2,
//   "product_name": "Running Sneakers",
//   "price": 90,
//   "stock": 25,
//   "category_id": 5,
//   "category": {
//       "id": 5,
//       "category_name": "Shoes"
//   },
//   "tags": [
//       {
//           "id": 6,
//           "tag_name": "white",
//           "product_tag": {
//               "id": 4,
//               "product_id": 2,
//               "tag_id": 6
//           }
//       }
//   ]
// }
//* SQL backend: 
// SELECT `product`.`id`, `product`.`product_name`, `product`.`price`, `product`.`stock`, `product`.`category_id`, `category`.`id` AS `category.id`, `category`.`category_name` AS `category.category_name`, `tags`.`id` AS `tags.id`, `tags`.`tag_name` AS `tags.tag_name`, `tags->product_tag`.`id` AS `tags.product_tag.id`, `tags->product_tag`.`product_id` AS `tags.product_tag.product_id`, `tags->product_tag`.`tag_id` AS `tags.product_tag.tag_id` FROM `product` AS `product` LEFT OUTER JOIN `category` AS `category` ON `product`.`category_id` = `category`.`id` LEFT OUTER JOIN ( `product_tag` AS `tags->product_tag` INNER JOIN `tag` AS `tags` ON `tags`.`id` = `tags->product_tag`.`tag_id`) ON `product`.`id` = `tags->product_tag`.`product_id` WHERE `product`.`id` = '2';
//* console.log response (example): 
// find product data by primary key in product-routes where id = 2
//* GET request to find one product by primary key (id)
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  Product.findByPk(req.params.id, {
    // be sure to include its associated Category and Tag data
    // where: {
    //   id: req.params.id,
    // },
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id'
    ],
    include: [
      {
        model: Category,
        attributes: [
          'id',
          'category_name'
        ]
      },
      {
        model: Tag,
        attributes: [
          'id',
          'tag_name'
        ]
      }
    ]
  })
    .then(productData => {
      if (!productData) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
      res.json(productData);
      console.log(productData, `find product data by primary key in product-routes where id = ${req.params.id}`)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

// create new product
// Product.create({
//   product_name: req.body.product_name,
//   price: req.body.price,
//   stock: req.body.stock,
//   category_id: req.body.category_id,
//   tagIds: req.body.tag_id
// })
/* req.body should look like this...
  {
    product_name: "Basketball",
    price: 200.00,
    stock: 3,
    tagIds: [1, 2, 3, 4]
  }
*/

//* Postman POST request URL: 'http://localhost:3001/api/products'
// {
//   product_name: "Toothbrush",
//   price: 200.00,
//   stock: 5,
//   tagIds: [1, 2, 3, 4]
//* enter object in JSON format via Postman
// {
//   "product_name": "Toothbrush",
//   "price": 200.00,
//   "stock": 5,
//   "tagIds": 1
// }
//* Postman response: 
// {
//   "id": 6,
//   "product_name": "Toothbrush",
//   "price": 200,
//   "stock": 5
// }
// }//* use async function with await to relieve promises
//* SQL backend: 
// INSERT INTO `product` (`id`,`product_name`,`price`,`stock`) VALUES (DEFAULT,?,?,?);
// product {
//   dataValues: { id: 6, product_name: 'Toothbrush', price: 200, stock: 5 }
//* console.log response (example): 
// new product called Toothbrush with a price of 200, stock equal to 5
//* POST request to add new product with attributes: product_name, price, stock, and tagIds
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      tagIds: req.body.tag_id,
    })
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
      res.status(200).json(productTagIds)

    }
    res.status(200).json(newProduct)
    console.log(newProduct, `new product called ${req.body.product_name} with a price of ${req.body.price}, stock equal to ${req.body.stock}`)

  } catch (err) {
    res.status(400).json(err);
  }
})



//* Postman URL example: 'http://localhost:3001/api/products/4' 
//* Postman JSON Body entry:
// {
//   "product_name": "Toothbrush",
//   "price": 200.00,
//   "stock": 5,
//   "tagIds": 1
// }
//* TO CHECK: do GET request to same id
//* GET URL: 'http://localhost:3001/api/products/4'
//* updated object should include values above
//* update product - PUT route
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });

    })
    .then((productTags) => {
      // get list of current tag_ids
      //* ProductTag model is a through table with 'product_id' and 'tag_id'
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

//* Postman DELETE request URL (example): 'http://localhost:3001/api/products/4'
//* Postman DELETE response: '1'
//* console response: 'DELETE FROM `product` WHERE `id` = '4'
//* console.log response:'1 product deleted from product db with id=4'
router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(productData => {
      if (!productData) {
        res.status(404).json({ message: 'No product found with this id!' })
        return;
      }
      res.json(productData)
      console.log(`${productData} product deleted from product db with id=${req.params.id}`)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

module.exports = router;
