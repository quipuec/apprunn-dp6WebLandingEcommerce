<template>
  <div>
		<banner-top 
			small 
			:data="getPromotionalDetailsBanner" 
			class="mb-5 container-banner-top"
			/>
		<div>
			<card-offer
				v-for="product in productsPublicity"
				:key="product.id"
				:data="product"
			/>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

const bannerTop = () => import('@/components/header/app-banner-top');
const cardOffer = () => import('@/components/products/card-offer');

export default {
	name: 'product-publicity',
	components: {
		bannerTop,
		cardOffer,
	},
	computed: {
		...mapGetters([
			'getPromotionalDetailsBanner',
		]),
	},
	props: {
		productsPublicity: {
			default: () => [],
			type: Array,
		},
	},
};
</script>
<style lang="scss" scoped>
	.container-banner-top {
		@media screen and (max-width: 764px) {
			display: none;
		}
	}
</style>