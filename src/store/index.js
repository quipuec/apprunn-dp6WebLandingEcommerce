import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import helper from '../shared/helper';

Vue.use(Vuex);

const store = new Vuex.Store(
	{
		state: {
			appConfig: {
				isLoading: false,
				snackbar: {
					text: '',
					isVisible: false,
					color: 'primary',
				},
			},
			pollData: {
				progress: 0,
			},
			profile: {
				flagAddVoucher: false,
			},
			token: helper.getLocalToken(),
			user: {
				email: '',
				logo: 'ecommerce-logo.svg',
				profileImage: '',
				username: '',
			},
		},
		actions,
		getters,
		mutations,
	},
);

export default store;
