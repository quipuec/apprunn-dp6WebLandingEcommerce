import axios from 'axios';

const aclInstance = axios.create({
	baseURL: process.env.ACL_URL,
});

const productsInstance = axios.create({
	baseURL: process.env.PRODUCTS_URL,
});

const salesInstance = axios.create({
	baseURL: process.env.SALES_URL,
});

export default function (Vue) {
	/* eslint-disable no-param-reassign */
	Vue.prototype.$http = productsInstance;
	Vue.prototype.$httpAcl = aclInstance;
	Vue.prototype.$httpSales = salesInstance;
}
