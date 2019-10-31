function created() {
	this.loadResources();
}
async function loadResources() {
	const requests = [
		this.$store.dispatch('LOAD_BANNERS', this),
		this.$store.dispatch('LOAD_COMMERCE_INFO', this),
	];
	await Promise.all(requests);
}

export default {
	created,
	methods: {
		loadResources,
	},
};
