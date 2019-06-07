const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
	const product = new Product(req.body.title)
	product.save();
};

exports.getProducts = (req, res, next) => {
	return product.fetchAll();
};

exports.postGetProducts = (req, res, next) => {
	const title = res.body.title;
	const imageUrl = res.body.imageUrl;
	const price = res.body.price;
	const description = res.body.description;
	Product.create({
		title: title,
		imageUrl: imageUrl,
		price: price,
		description: description
	}).then(result => {

	}).catch(error => {

	})
};