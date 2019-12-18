import Vue from 'vue';
import Vuex from 'vuex';
import loadingModule from '@/store/modules/loading/loadingModule';
import actions from './actions';
import asyncActions from './asyncActions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

const store = new Vuex.Store(
	{
		modules: {
			loading: { namespaced: true, ...loadingModule },
		},
		state,
		actions: { ...actions, ...asyncActions },
		getters,
		mutations,
	},
);

export default store;
