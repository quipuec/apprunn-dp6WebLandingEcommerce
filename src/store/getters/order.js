import lib from '@/shared/lib';

const { setNewProperty, decimals } = lib;
const twoDecimals = decimals(2);

const getters = {
	getProductToBuy(state) {
		const products = state.order.products.map(setNewProperty(
			'total', ({ priceDiscount, quantity }) => twoDecimals(quantity * priceDiscount)));
		return products;
	},
	getOrderId(state) {
		return state.order.id;
	},
	getTotalToBuy(state) {
		return state.order.products.reduce(
			(acc, { priceDiscount, quantity }) => twoDecimals(priceDiscount * quantity) + acc, 0);
	},
	getTotalQuantityProducts(state) {
		return state.order.products.length;
	},
	getFlagPickUp(state) {
		return state.order.flagPickUp;
	},
	getDeliveryAddress(state) {
		return state.order.delivery;
	},
};

export default getters;
