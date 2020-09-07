module.exports.init = async function (Vue, store) {
    const ProductCard = require('./components/ProductCard');
    const FavoriteCard = require('./components/FavoriteCard');
    ProductCard.init(Vue,store);
    FavoriteCard.init(Vue,store);
};