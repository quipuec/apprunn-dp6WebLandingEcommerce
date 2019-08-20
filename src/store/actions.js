function clearUser(context) {
	context.commit('clearUser');
}

function toggleLoading(context, value) {
	context.commit('toggleLoading', value);
}

function showSnackBar(context, snackbar) {
	const visibleSnackBar = { ...snackbar };
	visibleSnackBar.isVisible = true;
	visibleSnackBar.color = visibleSnackBar.color || 'primary';
	context.commit('showSnackBar', visibleSnackBar);
}

function setToken(context, token) {
	context.commit('setToken', token);
}

function setUser(context, user) {
	context.commit('setUser', user);
}

function addProductToBuyCar(context, product) {
	const productsSelected = JSON.parse(localStorage.getItem('ecommerce::product-select')) || [];
	const index = productsSelected.findIndex(p => p.id === product.id);
	if (index > -1) {
		const currentProduct = productsSelected[index];
		const quantity = currentProduct.quantity + product.quantity;
		productsSelected[index].quantity = quantity;
		context.commit('UPDATE_PRODUCTS_SELECTED', productsSelected);
	} else {
		context.commit('UPDATE_PRODUCTS_SELECTED', productsSelected.concat(product));
	}
}

function updateProductSelect(context, product) {
	context.commit('UPDATE_PRODUCTS_SELECTED', product);
}

function updateFilters(context, filters) {
	this.commit('UPDATE_FILTERS', filters);
}

function getOrderData({ commit }, order) {
	commit('SET_FLAG_PICKUP', order.flagPickUp);
	commit('SET_RESPONSIBLE', order.responsiblePickUp);
	commit('SET_DELIVERY_PLACE', order.deliveryAddress);
	commit('SET_BILLING_DATA', order.customerBill);
	commit('SET_ORDER_ID', order.id);
	commit('SET_ORDER_TOTAL', order.total);
	commit('SET_ORDER_DETAILS', order.details);
	commit('SET_SHIPPING_COST', order.costShipping);
	commit('SET_CUSTOMER_ADDRESS', order.customerAddress);
	commit('SET_ORDER_STATUS', order.orderStateId);
}

const methods = {
	clearUser,
	getOrderData,
	setUser,
	setToken,
	showSnackBar,
	toggleLoading,
	addProductToBuyCar,
	updateProductSelect,
	updateFilters,
};

export default methods;
