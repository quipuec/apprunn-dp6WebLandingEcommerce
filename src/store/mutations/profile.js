import Vue from 'vue';

export default {
	SET_USER_ADDRESS(state, address) {
		Vue.set(state.profile, 'address', address);
	},
};
