// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
//* add onDelete set null to allow delete request in category-routes (so foreign key constraint does not fail were product_id references category id)
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL'
})
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  // onDelete: 'SET NULL'

})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
})
// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
