function created() {
	this.loadBanners();
}
async function loadBanners() {
	try {
		const { data: response } = await this.$httpProductsPublic.get('banners-public');
		this.$store.commit('SET_BANNERS', response);
	} catch (error) {
		this.showGenericError();
	}
}

export default {
	created,
	methods: {
		loadBanners,
	},
};
