const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    productTitle: String,
    productPrice: String,
    productImg: Array,
    productDate: Date,
    productName: String,
    productSale: Number,
    productPrice: Number,
    productFinalPrice: Number,
    productCate: String,
    productGroupCate: String,
    productColor: String,
    productSize: Array,
    productSex: String,
    productSold: Number,
    productDes: String,
    productVote: Array,
}, {
    versionKey: false
})

var Product = mongoose.model('Product', productSchema, 'product');

module.exports = Product;