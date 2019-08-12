import lib from '@/shared/lib';

const twoDecimals = lib.decimals(2);

const getters = {
	getProductToBuy(state) {
		const products = state.order.products.map(lib.setNewProperty(
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
	invalidOrder(state) {
		const { responsible, delivery } = state.order;
		const invalidResponsible = lib.isEmpty(responsible);
		const invalidDelivery = lib.isEmpty(delivery) || !delivery.id;
		return lib.atLeastOneTrue(invalidResponsible, invalidDelivery);
	},
};

export default getters;
