import Vue from 'vue';

export default {
	SET_USER_ADDRESS(state, address) {
		Vue.set(state.profile, 'address', address);
	},
	SET_FAVORITES(state, favorites) {
		Vue.set(state.profile, 'favorites', favorites);
	},
	SET_ONLINE_TRANSACTIONS(state, transactions) {
		Vue.set(state.profile, 'onlineTransactions', transactions);
	},
};
