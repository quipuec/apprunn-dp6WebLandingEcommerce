const loadingModule = {
	actions: {
		SET_LOADING_FLAG({ commit }, flag) {
			commit('UPDATE_LOADING_FLAG', flag);
		},
	},
	getters: {
		isLoading(state) {
			return state.isLoading;
		},
	},
	mutations: {
		UPDATE_LOADING_FLAG(state, flag) {
			/* eslint-disable no-param-reassign */
			state.isLoading = flag;
		},
	},
	state: {
		isLoading: false,
	},
};

export default loadingModule;
