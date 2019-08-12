import Vue from 'vue';

export default {
	SET_DEPARTMENTS(state, arr) {
		Vue.set(state.geo, 'departments', arr);
	},
	SET_DISTRICTS(state, arr) {
		Vue.set(state.geo, 'districts', arr);
	},
	SET_PROVINCES(state, arr) {
		Vue.set(state.geo, 'provinces', arr);
	},
};
