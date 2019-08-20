import orderGetters from '@/store/getters/order';
import geoGetters from '@/store/getters/geo';
import profileGetters from '@/store/getters/profile';
import lib from '@/shared/lib';

const { getDeeper } = lib;

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

function getCurrencySymbol(state) {
	const { currencyDefault } = state;
	return getDeeper('symbol')(currencyDefault) || '';
}

function getCategories(state) {
	return state.categories;
}

function totalProducts(state) {
	return state.order.products ? state.order.products.length : 0;
}

function getDirections(state) {
	return state.directions;
}

function getWarehouses(state) {
	return state.warehouses;
}

function genders(state) {
	return state.genders;
}

function getFilters(state) {
	return state.filters;
}

const methods = {
	companyLogo,
	genders,
	getDirections,
	getCurrencySymbol,
	getProducts,
	getWarehouses,
	flagAddVoucher,
	indeterminate,
	...geoGetters,
	...orderGetters,
	...profileGetters,
	pollData,
	snackbar,
	themeColors,
	token,
	user,
	userName,
	getCategories,
	totalProducts,
	getFilters,
};

export default methods;
