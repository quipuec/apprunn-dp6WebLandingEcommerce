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
	pollData: {
		progress: 0,
	},
	token: helper.getLocalToken(),
	products: {
		list: [],
		params: {
			search: null,
			page: 1,
			limit: 20,
		},
		toBuy: [],
	},
	user: {
		email: '',
		logo: 'ecommerce-logo.svg',
		profileImage: '',
		username: '',
	},
};
