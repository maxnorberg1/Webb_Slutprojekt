var Product = require('../models/product');

var mongoose = require('mongoose');
const {
  exists
} = require('../models/product');
mongoose.connect('mongodb://localhost/webshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



var products = [
  new Product({
    imagePath: 'imgs/stone_hoodie_black.jpg',
    title: 'Stone Island',
    description: 'Hoodie from Stone Island.',
    price: 2499
  }),
  new Product({
    imagePath: 'imgs/axel1.jpg',
    title: 'Axel Arigato',
    description: 'Stylish White Sneakers.',
    price: 1799
  }), 
  new Product({
    imagePath: 'imgs/colmar1.jpg',
    title: 'Colmar',
    description: 'Jacket from Colmar.',
    price: 3199
  }),
  new Product({
    imagePath: 'imgs/greensweater.jpg',
    title: 'Nudie Jeans',
    description: 'Green Sweater.',
    price: 1199
  }),
  new Product({
    imagePath: 'imgs/monclersweater.jpg',
    title: 'Moncler',
    description: 'Grey Moncler Sweater.',
    price: 3999
  }),
  new Product({
    imagePath: 'imgs/whitetee.jpg',
    title: 'Stone Island',
    description: 'White Tee.',
    price: 1199
  }),
  
];
var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function (err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}