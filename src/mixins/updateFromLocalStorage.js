function mounted() {
	const user = this.getLocalStorage('ecommerce::ecommerce-user');
	const order = this.getLocalStorage('ecommerce-order');
	const currencyDefault = this.getLocalStorage('ecommerce::currency-default');
	if (user) {
		this.$store.dispatch('setUser', user);
	}
	if (order) {
		this.$store.dispatch('getOrderData', order);
	}
	if (currencyDefault) {
		this.$store.commit('SET_CURRENCY_DEFAULT', currencyDefault);
	}
}

export default {
	mounted,
};
