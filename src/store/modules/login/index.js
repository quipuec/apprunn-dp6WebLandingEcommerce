/* eslint-disable no-param-reassign */
const loginModule = {
	actions: {
		setFacebookCredentials({ commit }, { provider, externalId }) {
			commit('SET_PROVIDER', provider);
			commit('SET_EXTERNAL_ID', externalId);
		},
	},
	mutations: {
		SET_EXTERNAL_ID(state, externalId) {
			state.externalId = externalId;
		},
		SET_PROVIDER(state, provider) {
			state.provider = provider;
		},
	},
	state: {
		provider: 0,
		externalId: null,
	},
};

export default loginModule;
