const getters = {
	getProductToBuy(state) {
		return state.order.products;
	},
	getOrderId(state) {
		return state.order.id;
	},
};

export default getters;
