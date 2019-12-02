
export default {
	appConfig: {
		isLoading: false,
		snackbar: {
			text: '',
			isVisible: false,
			color: 'primary',
		},
	},
	banners: [],
	bannerTypes: {
		Category: 1,
		Product: 2,
		Home: 3,
		Top: 4,
	},
	commerce: {},
	currencyDefault: null,
	directions: [
		{ id: 0, addressLine1: 'Nueva dirección', name: 'Nueva dirección' },
	],
	genders: [
		{ id: 1, title: 'Femenino' },
		{ id: 2, title: 'Masculino' },
	],
	geo: {
		departments: [],
		districts: [],
		provinces: [],
	},
	order: {
		bill: null,
		customerAddressId: 0,
		customerAddress: null,
		delivery: null,
		details: null,
		flagBill: false,
		flagPickUp: 1,
		flagStatusOrder: null,
		id: null,
		list: [],
		order: null,
		orderStatus: null,
		paymentMethod: {
			bankAccountId: null,
			wayPayment: null,
		},
		products: [],
		responsible: null,
		shippingCost: 0,
		status: [],
		total: null,
		waysPayments: null,
	},
	pollData: {
		progress: 0,
	},
	profile: {
		address: [],
		favorites: [],
		flagAddVoucher: false,
		userData: null,
	},
	products: {
		lastPage: 0,
		list: [],
		params: {
			filters: 0,
			limit: 20,
			page: 1,
		},
	},
	token: null,
	user: {
		email: '',
		logo: '/static/img/user.svg',
		profileImage: '',
		username: '',
	},
	categories: [],
	productsSelected: null,
	totalProducts: 0,
	warehouses: [
		{ id: 0, name: 'Seleccione una tienda' },
	],
	filters: null,
};
