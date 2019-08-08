import orderGetters from '@/store/getters/order';
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

function getCurrencySymbol() {
	const currencyDefault = JSON.parse(localStorage.getItem(`${process.env.STORAGE_USER_KEY}::currency-default`));
	return getDeeper('symbol')(currencyDefault) || '';
}

const methods = {
	companyLogo,
	getCurrencySymbol,
	getProducts,
	flagAddVoucher,
	indeterminate,
	...orderGetters,
	pollData,
	snackbar,
	themeColors,
	token,
	user,
	userName,
};

export default methods;
