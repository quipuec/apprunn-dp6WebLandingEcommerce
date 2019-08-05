import Vue from 'vue';

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
	Vue.set(state.appConfig, 'snackbar', snackbar);
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

const methods = {
	clearUser,
	setToken,
	setUser,
	showSnackBar,
	toggleLoading,
	SET_ORDER_ID,
	SET_PRODUCTS,
	SET_PRODUCT_TO_BUY,
	UPDATE_FLAG_ADD_VOUCHER,
	UPDATE_POLL_PROGRESS,
	SET_CATEGORIES,
};

export default methods;
