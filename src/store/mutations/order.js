import Vue from 'vue';
import h from '@/shared/helper';
import { isEmpty } from '@/shared/lib';

const orderMutation = {
	SET_FLAG_PICKUP(state, val) {
		Vue.set(state.order, 'flagPickUp', val);
	},
	SET_RESPONSIBLE(state, responsible) {
		Vue.set(state.order, 'responsible', responsible);
	},
	SET_DELIVERY_PLACE(state, address) {
		Vue.set(state.order, 'delivery', address);
		if (address && address.addressLine1) {
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
	UPDATE_PRODUCTS_TO_BUY(state, { id, quantity, unitSelected }) {
		const { products } = state.order;
		const index = products.findIndex(p => p.id === id && p.unitSelected === unitSelected);
		products[index].quantity = quantity;
		Vue.set(state.order, 'products', [...products]);
		localStorage.setItem('ecommerce::product-select', JSON.stringify([...products]));
		orderMutation.UPDATE_ORDER_DETAILS_IF_EXIST(state, products);
	},
	DELETE_PRODUCT_BUY_CAR(state, { id, unitSelected }) {
		const { products } = state.order;
		const newProducts = products.filter(p => !(p.id === id && p.unitSelected === unitSelected));
		Vue.set(state.order, 'products', [...newProducts]);
		localStorage.setItem('ecommerce::product-select', JSON.stringify([...newProducts]));
		orderMutation.UPDATE_ORDER_DETAILS_IF_EXIST(state, newProducts);
	},
	SET_SHIPPING_COST(state, price) {
		Vue.set(state.order.shippingCost, 'price', price);
	},
	SET_SHIPPING_COST_OBJECT(state, costShippingObject) {
		Vue.set(state.order, 'shippingCost', costShippingObject);
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
	SET_ORDER_STATES(state, orderStates) {
		Vue.set(state.order, 'orderStates', orderStates);
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
	SET_BANK_ACCOUNT_RELA(state, bankAccounts) {
		Vue.set(state.order, 'bankAccountsRelated', bankAccounts);
	},
	SET_BANK_ACCOUNT(state, id) {
		Vue.set(state.order.paymentMethod, 'bankAccountId', id);
	},
	UPDATE_ORDER_DETAILS_IF_EXIST(state, products) {
		if (!isEmpty(state.order.order)) {
			h.updateOrderDetailsInLocalStorage(products);
			Vue.set(state.order.order, 'details', [...products]);
		}
	},
	SET_GATEWAY_ERROR_CODE(state, errorCode) {
		Vue.set(state.order, 'gatewayErrorCode', errorCode);
	},
	SET_GATEWAY_AUTHORIZATION_RESPONSE(state, data) {
		Vue.set(state.order, 'gatewayAuthorizationResponse', data);
	},
};
export default orderMutation;
