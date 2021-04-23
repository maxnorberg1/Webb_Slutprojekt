var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopping', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var products = [
    new Product({
        imagePath: 'images/stone_hoodie_black.jpg',
        title: 'Stone Island',
        description: 'Hoodie from Stone Island.',
        price: 2499
    }),
    new Product({
        imagePath: 'images/axel1.jpg',
        title: 'Axel Arigato',
        description: 'Stylish White Sneakers.',
        price: 1799
    }),
    new Product({
        imagePath: 'images/colmar1.jpg',
        title: 'Colmar',
        description: 'Jacket from Colmar.',
        price: 3199
    }),
    new Product({
        imagePath: 'images/greensweater.jpg',
        title: 'Nudie Jeans',
        description: 'Green Sweater.',
        price: 1199
    }),
    new Product({
        imagePath: 'images/monclersweater.jpg',
        title: 'Moncler',
        description: 'Grey Moncler Sweater.',
        price: 3999
    }),
    new Product({
        imagePath: 'images/whitetee.jpg',
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