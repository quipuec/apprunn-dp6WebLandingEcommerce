import Vue from 'vue';

export default {
	SET_FLAG_PICKUP(state, val) {
		Vue.set(state.order, 'flagPickUp', val);
	},
};
