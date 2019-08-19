function mounted() {
	const user = this.getLocalStorage('ecommerce::ecommerce-user');
	const order = this.getLocalStorage('ecommerce-order');
	if (user) {
		this.$store.dispatch('setUser', user);
	}
	if (order) {
		this.$store.dispatch('getOrderData', order);
	}
}

export default {
	mounted,
};
