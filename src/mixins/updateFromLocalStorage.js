
import helper from '@/shared/helper';

function mounted() {
	this.loadDataFromLocalStorage();
}

async function loadDataFromLocalStorage() {
	const user = this.getLocalStorage('ecommerce::ecommerce-user');
	const order = this.getLocalStorage('ecommerce-order');
	const currencyDefault = this.getLocalStorage('ecommerce::currency-default');
	const token = helper.getLocalToken();
	if (token) {
		const { data: response } = await this.$httpSales.get('customers/current');
		helper.setLocalData('ecommerce-user', response);
		this.$store.dispatch('setUser', response);
		this.prototype.$userInfo = this.$store.getters.user;
	}
	if (user) {
		this.$store.dispatch('setUser', user);
	}
	if (order) {
		this.$store.dispatch('getOrderData', order);
	}
	if (currencyDefault) {
		this.$store.commit('SET_CURRENCY_DEFAULT', currencyDefault);
	} else {
		this.$store.dispatch('SET_CURRENCY_DEFAULT', this);
	}
}

export default {
	methods: {
		loadDataFromLocalStorage,
	},
	mounted,
};
