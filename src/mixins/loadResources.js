async function created() {
	await this.loadCommerceData();
	this.loadResource();
}

async function loadCommerceData() {
	const requests = [
		this.$store.dispatch('LOAD_COMMERCE_INFO', this),
	];
	await Promise.all(requests);
}

async function loadResource() {
	const requests = [
		this.$store.dispatch('LOAD_BANNERS', this),
		this.$store.dispatch('LOAD_CATEGORIES', { context: this }),
	];
	await Promise.all(requests);
}

export default {
	created,
	methods: {
		loadCommerceData,
		loadResource,
	},
};
