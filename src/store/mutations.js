import Vue from 'vue';
import orderMutations from '@/store/mutations/order';
import geoMutations from '@/store/mutations/geo';
import profileMutations from '@/store/mutations/profile';

function clearUser(state) {
	Vue.set(state, 'token', null);
	Vue.set(state, 'user', null);
}

function setToken(state, token) {
	Vue.set(state, 'token', token);
}

function setUser(state, user) {
	Vue.set(state, 'user', user);
}

function showSnackBar(state, snackbar) {
	Vue.set(state.appConfig, 'snackbar', { ...snackbar });
}

function toggleLoading(state, value) {
	Vue.set(state.appConfig, 'isLoading', value);
}

function UPDATE_POLL_PROGRESS(state, number) {
	Vue.set(state.pollData, 'progress', state.pollData.progress + number);
}

function SET_PRODUCTS(state, products) {
	Vue.set(state.products, 'list', products);
}

function SET_PRODUCT_TO_BUY(state, product) {
	const newProduct = { ...product };
	newProduct.quantity = 1;
	Vue.set(state.order, 'products', state.order.products.concat({ ...newProduct }));
}

function SET_ORDER_ID(state, id) {
	Vue.set(state.order, 'id', id);
}

function UPDATE_FLAG_ADD_VOUCHER(state, flag) {
	Vue.set(state.profile, 'flagAddVoucher', flag);
}

function SET_CATEGORIES(state, categories) {
	Vue.set(state, 'categories', categories);
}

function SET_ORDER_TOTAL(state, total) {
	Vue.set(state.order, 'total', total);
}

function UPDATE_PRODUCTS_SELECTED(state, products) {
	if (products) {
		localStorage.setItem('ecommerce::product-select', JSON.stringify(products));
		Vue.set(state.order, 'products', [...products]);
	} else {
		localStorage.removeItem('ecommerce::product-select');
		Vue.set(state.order, 'products', []);
	}
}

function SET_WAREHOUSES(state, warehouses) {
	Vue.set(state, 'warehouses', state.warehouses.concat(warehouses));
}

function SET_DIRECTIONS(state, directions) {
	const addressDefault = { id: 0, addressLine1: 'Nueva dirección' };
	Vue.set(state, 'directions', [].concat(addressDefault, directions));
}

function UPDATE_FILTERS(state, filters) {
	Vue.set(state, 'filters', filters);
}

function SET_CURRENCY_DEFAULT(state, currency) {
	Vue.set(state, 'currencyDefault', currency);
}

const methods = {
	clearUser,
	...geoMutations,
	...orderMutations,
	...profileMutations,
	setToken,
	setUser,
	showSnackBar,
	toggleLoading,
	SET_CURRENCY_DEFAULT,
	SET_DIRECTIONS,
	SET_ORDER_ID,
	SET_PRODUCTS,
	SET_PRODUCT_TO_BUY,
	SET_WAREHOUSES,
	UPDATE_FLAG_ADD_VOUCHER,
	UPDATE_POLL_PROGRESS,
	SET_CATEGORIES,
	SET_ORDER_TOTAL,
	UPDATE_PRODUCTS_SELECTED,
	UPDATE_FILTERS,
};

export default methods;
