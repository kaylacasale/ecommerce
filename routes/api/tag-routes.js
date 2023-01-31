const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

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

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  //* find rag by primary key (include attributes listed and product model with its own attributes listed)
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

router.post('/', (req, res) => {
  // create a new tag
  //* in order to do update route below, specify data input being sent (tag_name)
  //* Postman route: 'http://localhost:3001/api/tags/'
  //* enter object with 'tag_name':
  //* Postman body example entry: {"tag_name": hip hop music}
  //* send to post route to add new tag to db
  //* Postman response example: {"id": 9}
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then(newTagData => {
      res.status(200).json(newTagData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name,
    // ...req.body,
    // tag_name: req.params.tag_name,
  },
    {
      where: {
        id: req.params.id
      },
    })
    .then(updateTagData => {
      if (!updateTagData) {
        res.status(404).json({ message: 'No tag found with this id! Sorry :(' })
        return;
      }
      res.json(updateTagData)
      console.log(updateTagData, 'updated tag_name array through tag-routes')

    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

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
      res.json(deleteTagData);

    }))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
});

module.exports = router;
