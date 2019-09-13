import lib from '@/shared/lib';

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
	const newProduct = lib.setNewProperty('quantity', 1)(product);
	const productsSelected = JSON.parse(localStorage.getItem('ecommerce::product-select')) || [];
	const index = productsSelected.findIndex(p => p.id === newProduct.id);
	if (index > -1) {
		const currentProduct = productsSelected[index];
		const quantity = currentProduct.quantity + newProduct.quantity;
		productsSelected[index].quantity = quantity;
		context.commit('UPDATE_PRODUCTS_SELECTED', productsSelected);
	} else {
		context.commit('UPDATE_PRODUCTS_SELECTED', productsSelected.concat(newProduct));
	}
}

function updateProductSelect(context, product) {
	context.commit('UPDATE_PRODUCTS_SELECTED', product);
}

function updateFilters(context, filters) {
	this.commit('UPDATE_FILTERS', filters);
}

function getOrderData({ commit }, order) {
	const { customerBill } = order;
	if (customerBill) {
		const { address, ruc, rzSocial } = customerBill;
		commit('SET_BILLING_DATA', { address, ruc, rzSocial });
	}
	commit('SET_ORDER_INFO', { ...order });
	commit('SET_FLAG_PICKUP', order.flagPickUp);
	commit('SET_RESPONSIBLE', order.responsiblePickUp);
	commit('SET_DELIVERY_PLACE', order.deliveryAddress);
	commit('SET_ORDER_ID', order.id);
	commit('SET_ORDER_TOTAL', order.total);
	commit('SET_ORDER_DETAILS', order.details);
	commit('SET_SHIPPING_COST', order.costShipping);
	commit('SET_CUSTOMER_ADDRESS', null);
	commit('SET_ORDER_STATUS', order.orderStateId);
	commit('SET_FLAG_STATUS_ORDER', order.flagStatusOrder);
}

function SET_DEFAULT_VALUES({ commit }) {
	localStorage.removeItem('ecommerce-order');
	commit('SET_BILLING_DATA', null);
	commit('SET_ORDER_INFO', null);
	commit('SET_CUSTOMER_ADDRESS', null);
	commit('SET_FLAG_PICKUP', 1);
	commit('SET_RESPONSIBLE', null);
	commit('SET_DELIVERY_PLACE', null);
	commit('SET_ORDER_ID', null);
	commit('SET_ORDER_TOTAL', null);
	commit('SET_ORDER_DETAILS', []);
	commit('SET_SHIPPING_COST', 0);
	commit('SET_ORDER_STATUS', null);
	commit('SET_FLAG_STATUS_ORDER', null);
}

function DEFAULT_USER({ commit }) {
	const user = {
		email: '',
		logo: '/static/img/user.svg',
		profileImage: '',
		username: '',
	};
	commit('setUser', user);
}

const methods = {
	clearUser,
	DEFAULT_USER,
	getOrderData,
	setUser,
	setToken,
	showSnackBar,
	toggleLoading,
	addProductToBuyCar,
	updateProductSelect,
	updateFilters,
	SET_DEFAULT_VALUES,
};

export default methods;
