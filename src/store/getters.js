import orderGetters from '@/store/getters/order';
import geoGetters from '@/store/getters/geo';

function indeterminate(state) {
	return state.appConfig.isLoading;
}

function companyLogo(state) {
	return state.user ? state.user.logo : '';
}

function user(state) {
	return state.user;
}

function userName(state) {
	return state.user ? `${state.user.name} ${state.user.lastName}` : '';
}

function token(state) {
	return state.token;
}

function snackbar(state) {
	return state.appConfig.snackbar;
}

function themeColors() {
	return JSON.parse(localStorage.getItem(`${process.env.STORAGE_USER_KEY}::theme`));
}

function pollData(state) {
	return state.pollData;
}

function getProducts(state) {
	return state.products.list;
}

function flagAddVoucher(state) {
	return state.profile.flagAddVoucher;
}

function getCategories(state) {
	return state.categories;
}

function getDirections(state) {
	return state.directions;
}

function getWarehouses(state) {
	return state.warehouses;
}

const methods = {
	companyLogo,
	getDirections,
	getProducts,
	getWarehouses,
	flagAddVoucher,
	indeterminate,
	...geoGetters,
	...orderGetters,
	pollData,
	snackbar,
	themeColors,
	token,
	user,
	userName,
	getCategories,
};

export default methods;
