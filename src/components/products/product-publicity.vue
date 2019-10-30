<template>
  <div>
		<banner-top 
			small 
			:data="getPromotionalDetailsBanner" 
			class="mb-5 container-banner-top"
			/>
		<div>
			<card-offer :data="product"/>
			<card-offer :data="product"/>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

const bannerTop = () => import('@/components/header/app-banner-top');
const cardOffer = () => import('@/components/products/card-offer');

function data() {
	return {
		product: {
			urlImage: 'https://japi-static.s3.amazonaws.com/taurus/mola-compressa%CC%83o-copy-2.jpg',
			name: 'Resortes',
			priceDiscount: 20,
		},
	};
}

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
	data,
};
</script>
<style lang="scss" scoped>
	.container-banner-top {
		@media screen and (max-width: 764px) {
			display: none;
		}
	}
</style>