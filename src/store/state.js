import helper from '@/shared/helper';

export default {
	appConfig: {
		isLoading: false,
		snackbar: {
			text: '',
			isVisible: false,
			color: 'primary',
		},
	},
	order: {
		bill: null,
		delivery: null,
		responsible: null,
	},
	pollData: {
		progress: 0,
	},
	products: {
		list: [],
		params: {
			search: null,
			page: 1,
			limit: 20,
		},
		toBuy: [],
	},
	token: helper.getLocalToken(),
	user: {
		email: '',
		logo: 'ecommerce-logo.svg',
		profileImage: '',
		username: '',
	},
};
