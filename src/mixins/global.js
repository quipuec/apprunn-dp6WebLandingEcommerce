function data() {
	return {
		params: {
			customerId: null,
			page: 1,
			limit: 20,
			search: null,
		},
		table: {
			lastPage: 1,
			rows: [],
		},
	};
}

function goTo(name, options) {
	this.$router.push({ name, ...options });
}

function getImageUrl(imageUrl) {
	return `${this.$imageUrl}/${imageUrl}`;
}

async function loadData(url) {
	const { data: records, headers } = await this.$http.get(url, { params: this.params });
	this.table.lastPage = Number(headers['x-last-page']);
	this.table.rows = records.map((record) => {
		const newRecord = { ...record };
		newRecord.isSelected = false;
		return newRecord;
	});
	return { records, headers };
}

function onSearch(value, url) {
	this.params.search = value || null;
	this.params.page = 1;
	this.loadData(url);
}

function replaceString(word, selectionStart, newWord) {
	if (word) {
		return word.slice(0, selectionStart) + newWord + word.slice(selectionStart + 0);
	}
	return newWord;
}

function showNotification(text, color = 'success', html = null) {
	this.$store.dispatch('showSnackBar', { text, color, html });
}

function showGenericError(text = 'Ups, ocurrió algún problema') {
	this.showNotification(text, 'error');
}

function showRow(columns, columnId) {
	const column = columns.find(h => h.id === columnId);
	return column.visible;
}

function token() {
	return this.$store.getters.token;
}

function stopClick() {
	return false;
}

function globalColors() {
	return {
		background: '',
		black: '',
		base: process.env.COLOR_BORDER,
		border: '',
		dark: process.env.COLOR_DARK,
		disabled: '',
		highLight: process.env.COLOR_HIGHLIGHT,
		primary: process.env.COLOR_BASE,
		secondary: process.env.COLOR_SECONDARY,
		terciary: process.env.COLOR_LINK,
		white: '',
	};
}

function getLocalStorage(key) {
	const items = JSON.parse(localStorage.getItem(key));
	return items;
}

function setLocalData(key, setData) {
	return localStorage.setItem(key, JSON.stringify(setData));
}

const mixin = {
	data,
	computed: {
		token,
		globalColors,
	},
	methods: {
		getImageUrl,
		getLocalStorage,
		goTo,
		loadData,
		onSearch,
		replaceString,
		setLocalData,
		showGenericError,
		showNotification,
		showRow,
		stopClick,
	},
};

export default mixin;
