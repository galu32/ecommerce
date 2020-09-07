module.exports.init = async function (Vue, store) {
    const ProductCard = require('./components/ProductCard');
    const FavoriteCard = require('./components/FavoriteCard');
    const CategoryItem = require('./components/CategoryItem');
    const MainItems = require('./components/MainItems');
    const ItemCard = require('./components/ItemCard');
    const CartModal = require('./components/CartModal');
    const CheckOutItem = require('./components/CheckOutItem');
    ProductCard.init(Vue,store);
    FavoriteCard.init(Vue,store);
    CategoryItem.init(Vue,store);
    MainItems.init(Vue,store);
    ItemCard.init(Vue,store);
    CartModal.init(Vue,store);
    CheckOutItem.init(Vue,store);
};