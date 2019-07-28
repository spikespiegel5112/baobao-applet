const Product = require('../models/product');

exports.getProductList = (req, res, next) => {
	Product.findAll().then(data => {
		res.status(200).json({
			data: data
		})
	})
};

exports.postEditProduct = (req, res, next) => {
	console.log(req.body);
	const id = req.body.id;
	const productDictionary = {
		title: req.body.title,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		description: req.body.description
	};

	Product.findByPk(id).then(data => {
		Object.keys(productDictionary).forEach(item => {
			data[item] = productDictionary[item];
		});
		data.save();
		res.status(200).json({
			data: data
		})
	}).catch(error => {
		console.log(req.body);
		res.status(400).json({
			message: 'error',
			req: JSON.stringify(req.body),
			error: error.toString(),
		});
	})
};

exports.postAddProduct = (req, res, next) => {
	console.log('postAddProduct', req.body);
	const product = {
		title: req.body.title,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		description: req.body.description,
	};

	res.status(200).json({
		message: 'success',
		body: req.body
	});

	Product.create({
		title: product.title,
		imageUrl: product.imageUrl,
		price: product.price,
		description: product.description,
	})
};

exports.deleteProduct = (req, res, next) => {
	const id = req.body.id;
	Product.findByPk(id).then(result => {
		result.destroy();
		res.status(200).json({
			message: 'delete successful',
			body: req.body
		});
	}).catch(error => {
		res.status(400).json({
			message: 'delete failed',
			error: error.toString()
		});
	})
};
