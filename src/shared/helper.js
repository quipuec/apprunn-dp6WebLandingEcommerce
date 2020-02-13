import { format } from 'date-fns';

function exactDate(date, formatter = 'DD-MM-YYYY', splitBy = 'T') {
	if (date) {
		const dateSplit = date.split(splitBy);
		const dateComplete = dateSplit[0].split('-');
		const year = dateComplete[0];
		const month = dateComplete[1] - 1;
		const day = dateComplete[2];
		const newDate = format(new Date(year, month, day), formatter);
		return newDate;
	}
	return null;
}

function formatDate(date, formatter = 'DD-MM-YYYY') {
	const newDate = format(new Date(date), formatter);
	return newDate;
}

function generateBlob(data, contentType = 'application/pdf') {
	return new Blob([data], { type: contentType });
}

function getLocalData(key) {
	return JSON.parse(localStorage.getItem(`${process.env.STORAGE_USER_KEY}::${key}`));
}

function getLocalStorage() {
	return JSON.parse(localStorage.getItem(`${process.env.STORAGE_USER_KEY}`));
}

function getLocalToken() {
	return localStorage.getItem(`${process.env.STORAGE_USER_KEY}::token`);
}

function removeLocalData(key) {
	return localStorage.removeItem(`${process.env.STORAGE_USER_KEY}::${key}`);
}

function setLocalData(key, data) {
	return localStorage.setItem(`${process.env.STORAGE_USER_KEY}::${key}`, JSON.stringify(data));
}

function showDownloadDialog(blob, name, extension) {
	const currentDate = format(new Date(), 'YYYY-MM-DD');
	const link = document.createElement('a');
	link.download = `${name}_${currentDate}.${extension}`;
	link.href = window.URL.createObjectURL(blob);
	link.click();
}

/* eslint-disable */
function debounce(func, wait = 800, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function setPrices(product, priceListId, flag) {
	const priceList = product.priceList || {};
	const { price, discount } = priceList[priceListId] || {};
	const newDiscount = discount || 0;
	const priceDiscount = Number(((1 - (newDiscount / 100)) * price).toFixed(2));
	const objPrice = { price: discount ? price : 0, priceDiscount: priceDiscount || 0 };
	return objPrice[flag];

}

const methods = {
	debounce,
	exactDate,
	formatDate,
	generateBlob,
	getLocalData,
	getLocalStorage,
	getLocalToken,
	removeLocalData,
	setLocalData,
	setPrices,
	showDownloadDialog,
};

export default methods;
