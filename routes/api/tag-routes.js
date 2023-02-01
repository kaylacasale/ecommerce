const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//* Postman GET URL: 'http://localhost:3001/api/tags'
//* response: array of objects showing tags and products with same tag_id
//[
// {
//     "id": 1,
//     "tag_name": "rock music",
//     "products": [
//         {
//             "id": 3,
//             "product_name": "Branded Baseball Hat",
//             "price": 22.99,
//             "stock": 12,
//             "category_id": 4,
//             "product_tag": {
//                 "id": 5,
//                 "product_id": 3,
//                 "tag_id": 1
//             }
//         },
//         {
//             "id": 4,
//             "product_name": "Top 40 Music Compilation Vinyl Record",
//             "price": 12.99,
//             "stock": 50,
//             "category_id": 3,
//             "product_tag": {
//                 "id": 9,
//                 "product_id": 4,
//                 "tag_id": 1
//             }
//         }
//     ]
// },
// ].... //* ^ example of 1 tag object
//* GET route to find all tags (including products associated)
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      'id',
      'tag_name',
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id',
        ]
      }
    ]
  })
    .then(tagData => {
      console.log(tagData)
      res.status(200).json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  // find all tags
  // be sure to include its associated Product data
});

//* Postman GET request URL (example): 'http://localhost:3001/api/tags/2'
//* response: a tag object (with a product, can have many)
// {
//   "id": 2,
//   "tag_name": "pop music",
//   "products": [
//       {
//           "id": 4,
//           "product_name": "Top 40 Music Compilation Vinyl Record",
//           "price": 12.99,
//           "stock": 50,
//           "category_id": 3,
//           "product_tag": {
//               "id": 10,
//               "product_id": 4,
//               "tag_id": 2
//           }
//       }
//   ]
// }
//* GET route to find one tag (and associated products with same tag_id) by primary key (id)
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  //* find tag by primary key (include attributes listed and product model with its own attributes listed)
  Tag.findByPk(req.params.id, {
    attributes: [
      'id',
      'tag_name',
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id',
        ]

      }
    ]

  })
    .then(tagData => {
      console.log(tagData);
      res.status(200).json(tagData);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    })
});

//* in order to do update route below, specify data input being sent (tag_name)
//* Postman route: 'http://localhost:3001/api/tags/'
//* enter object with 'tag_name':
//* Postman body example entry: {"tag_name": hip hop music}
//   {
//     "tag_name": "classical music"
// }
//* response with new object added to tags array of objects (given new id):
//   {
//     "id": 9,
//     "tag_name": "classical music"
// }
//* console.log response: 
//  new tag called country music added to the db!
// 'country music' = template literal that displays the name of new tag in console upon successful post request
//* send to post route to add new tag to db
//* Postman response example: {"id": 9}
//* POST request to add new tag (input new tag_name) to the db
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then(newTagData => {
      res.status(200).json(newTagData)
      console.log(newTagData, `new tag called ${req.body.tag_name} added to the db!`)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    })
});

//* Postman PUT request URL (example): 'http://localhost:3001/api/tags/2'
//* body entry (example): 
// {
//   "tag_name": "dance music"
// }
//* Postman response: 
// [
//   1
// ]
//* SQL backend: 
// UPDATE `tag` SET `tag_name`=? WHERE `id` = ?
//* console.log response: 
// [ 1 ] updated tag_name  through tag-routes
//* PUT request to update tag data (tag_name) in tag-routes
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    //   tag_name: req.body.tag_name,
    //   // ...req.body,
    //   // tag_name: req.params.tag_name,
    // },
    //   {
    where: {
      id: req.params.id
    },
  })
    .then((updateTagData) => {
      if (!updateTagData) {
        res.status(404).json({ message: 'No tag found with this id! Sorry :(' })
        return;
      }
      res.json(updateTagData)
      console.log(updateTagData, `updated tag_name  through tag-routes`)

    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

//* 3 steps to verify deletion:
//* 1) GET request to find tag by id: 'http://localhost:3001/api/tags/2'
// {
//   "id": 2,
//   "tag_name": "pop music",
//   "products": [
//       {
//           "id": 4,
//           "product_name": "Top 40 Music Compilation Vinyl Record",
//           "price": 12.99,
//           "stock": 50,
//           "category_id": 3,
//           "product_tag": {
//               "id": 10,
//               "product_id": 4,
//               "tag_id": 2
//           }
//       }
//   ]
// }
//* 2) DELETE request to delete tag object by id (mentioned in delete request url)
//* Postman response: '1'
//* SQL backend: 
//  DELETE FROM `tag` WHERE `id` = '2'
//* console.log response: 
// 1 tag_name deleted from tags with id= 2
//* 3) GET request with same id to verify no existing object after deletion: 'http://localhost:3001/api/tags/2'
//* verification response: 'null'

//* Postman DELETE request url (example): 'http://localhost:3001/api/tags/3'
//* will delete tag_name with id=3 and return '1'
//* DELETE FROM `tag` WHERE `id` = '5'

//* DELETE request to delete tag object by id
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteTagData => {
      if (!deleteTagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
      //* DELETE FROM `tag` WHERE `id` = '8'
      //* 1 tag_name deleted from tags with id= 8
      res.json(deleteTagData)
      console.log(`${deleteTagData} tag_name deleted from tags with id= ${req.params.id}`);

    }))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
});

module.exports = router;
