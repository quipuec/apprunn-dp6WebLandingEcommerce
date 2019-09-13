import axios from 'axios';

const aclInstance = axios.create({
	baseURL: process.env.ACL_URL,
});

const productsInstance = axios.create({
	baseURL: process.env.PRODUCTS_URL,
});

const productsPublicInstance = axios.create({
	baseURL: process.env.PRODUCTS_URL,
	headers: {
		Authorization: `Bearer ${process.env.TOKEN}`,
	},
});

const salesInstance = axios.create({
	baseURL: process.env.SALES_URL,
});

const uploadInstance = axios.create({
	baseURL: process.env.UPLOAD_URL,
});

export default function (Vue) {
	/* eslint-disable no-param-reassign */
	Vue.prototype.$httpProducts = productsInstance;
	Vue.prototype.$httpAcl = aclInstance;
	Vue.prototype.$httpSales = salesInstance;
	Vue.prototype.$httpProductsPublic = productsPublicInstance;
	Vue.prototype.$httpUpLoad = uploadInstance;
}
