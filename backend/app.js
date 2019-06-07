const express = require('express');
const multer = require('multer');
const sequelize = require('./util/database');
const bodyParser = require('body-parser');
const app = express();

const productRoutes = require('./routers/products')
const errorController = require('./controllers/error')
const adminRoutes = require('./routers/admin')
const authRoutes = require('./routers/auth')

const User = require('./models/user')

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/products', (req, res, next) => {
	res.state(200).json({
		message: '/products'
	})
});
app.use('/uploads', express.static('uploads'));

app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Accept-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({})
	}
	next();
});

app.use(errorController.get404)

sequelize.sync().then(result => {
	console.log(result)
	app.listen(3000);
}).catch(error => {
	console.log(error)
});


