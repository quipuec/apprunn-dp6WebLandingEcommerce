function mounted() {
	const user = this.getLocalStorage('ecommerce::ecommerce-user');
	if (user) {
		this.$store.dispatch('setUser', user);
	}
}

export default {
	mounted,
};
