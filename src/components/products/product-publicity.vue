<template>
  <div>
		<banner-top 
			small 
			:data="bannerTop" 
			class="mb-5 container-banner-top"
			/>
		<div>
			<card-offer :data="product"/>
			<card-offer :data="product"/>
		</div>
	</div>
</template>
<script>
const bannerTop = () => import('@/components/header/app-banner-top');
const cardOffer = () => import('@/components/products/card-offer');

function data() {
	return {
		bannerTop: {
			urlImage: '/static/img/publicity.png',
		},
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