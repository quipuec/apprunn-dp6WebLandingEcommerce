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
};

export default getters;
