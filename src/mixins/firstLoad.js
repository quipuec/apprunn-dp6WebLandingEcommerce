import { mapActions } from 'vuex';

function created() {
	this.$loadBanners(this);
}

export default {
	created,
	methods: {
		...mapActions({
			$loadBanners: 'LOAD_BANNERS',
		}),
	},
};
