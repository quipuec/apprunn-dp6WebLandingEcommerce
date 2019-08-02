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
		id: null,
		products: [],
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
	},
	token: helper.getLocalToken(),
	user: {
		email: '',
		logo: 'ecommerce-logo.svg',
		profileImage: '',
		username: '',
	},
};
