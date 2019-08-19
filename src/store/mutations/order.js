import Vue from 'vue';

export default {
	SET_FLAG_PICKUP(state, val) {
		Vue.set(state.order, 'flagPickUp', val);
	},
	SET_RESPONSIBLE(state, responsible) {
		Vue.set(state.order, 'responsible', responsible);
	},
	SET_DELIVERY_PLACE(state, address) {
		Vue.set(state.order, 'delivery', address);
		if (address && address.addressLine1 && address.id) {
			Vue.set(state.order, 'customerAddressId', address.id);
		}
	},
	SET_BILL_SELECTION(state, flag) {
		Vue.set(state.order, 'flagBill', flag);
	},
	SET_ORDERS(state, orders) {
		Vue.set(state.order, 'list', orders);
	},
	SET_ORDER_DETAILS(state, details) {
		Vue.set(state.order, 'products', [...details]);
	},
	UPDATE_PRODUCTS_TO_BUY(state, { id, quantity }) {
		const { products } = state.order;
		const index = products.findIndex(p => p.id === id);
		products[index].quantity = quantity;
		Vue.set(state.order, 'products', [...products]);
		localStorage.setItem('ecommerce::product-select', JSON.stringify([...products]));
	},
	DELETE_PRODUCT_BUY_CAR(state, id) {
		const { products } = state.order;
		const index = products.findIndex(p => p.id === id);
		products.splice(index, 1);
		Vue.set(state.order, 'products', [...products]);
		localStorage.setItem('ecommerce::product-select', JSON.stringify([...products]));
	},
	SET_SHIPPING_COST(state, amount) {
		Vue.set(state.order, 'shippingCost', amount);
	},
	SET_CUSTOMER_ADDRESS(state, address) {
		Vue.set(state.order, 'customerAddress', address);
	},
	SET_BILLING_DATA(state, bill) {
		Vue.set(state.order, 'bill', bill);
	},
	SET_ORDER_STATUS(state, orderStatus) {
		Vue.set(state.order, 'orderStatus', orderStatus);
	},
	SET_FLAG_STATUS_ORDER(state, flagStatusOrder) {
		Vue.set(state.order, 'flagStatusOrder', flagStatusOrder);
	},
	SET_WAY_PAYMENT(state, wayPayment) {
		Vue.set(state.order, 'paymentMethod', wayPayment);
	},
	SET_ORDER_INFO(state, order) {
		Vue.set(state.order, 'order', order);
	},
	EMPTY_CAR(state) {
		localStorage.removeItem('ecommerce::product-select');
		Vue.set(state.order, 'products', null);
	},
	SET_WAYS_PAYMENT(state, waysPayments) {
		Vue.set(state.order, 'waysPayments', waysPayments);
	},
};
