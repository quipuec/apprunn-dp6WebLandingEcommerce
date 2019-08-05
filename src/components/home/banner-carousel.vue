<template>
	<div class="banner-carousel">
		<swiper :options="swiperOption">
			<swiper-slide 
				v-for="banner in banners" 
				:key="banner.id">
				<div 
					:style="`background-image: url(${banner.webImage})`"
					class="img-carousel"></div>
			</swiper-slide>
			<div class="pagination-carousel swiper-pagination" slot="pagination"></div>
    </swiper>
	</div>
</template>
<script>
function data() {
	return {
		swiperOption: {
			pagination: {
				el: '.pagination-carousel',
				clickable: true,
			},
		},
	};
}
export default {
	name: 'banner-carousel',
	data,
	props: {
		banners: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
<style lang="scss" scoped>
	.img-carousel {
		background-position: initial;
		background-repeat: no-repeat;
		background-size: cover;
		height: 616px;
    width: 100%;
		
		@media (max-width: 764px) {
			height: 478px;
		}
	}
</style>


