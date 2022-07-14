const mongoose = require('mongoose')

var collectionSchema = new mongoose.Schema({
    collectionName: String,
    collectionImg: String,
    collectionTime: Date,
    collectionBanner: Array,
    // collectionItems: Array
    collectionItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    versionKey: false
})
var Collection = mongoose.model('Collection', collectionSchema, 'collection');

module.exports = Collection;