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
	},
	SET_BILL_SELECTION(state, flag) {
		Vue.set(state.order, 'flagBill', flag);
	},
	SET_BILLING_INFO(state, billData) {
		Vue.set(state.order, 'bill', billData);
	},
	SET_ORDERS(state, orders) {
		Vue.set(state.order, 'list', orders);
	},
	SET_ORDER_STATUS(state, status) {
		Vue.set(state.order, 'status', status);
	},
};
