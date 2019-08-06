<template>
	<div class="banner-carousel">
		<swiper :options="swiperOption">
			<swiper-slide 
				v-for="banner in banners" 
				:key="banner.id">
				<div 
					:style="`background-image: url(${banner.webImage})`"
					class="img-carousel"
					@click="goToLink(banner)">
					<a 
						v-if="banner.webLink"
						:href="banner.webLink" 
						target="_blank"
						class="banner-link">
					</a>
				</div>
			</swiper-slide>
			<div class="pagination-carousel swiper-pagination" slot="pagination"></div>
    </swiper>
	</div>
</template>
<script>

function data() {
	return {
		swiperOption: {
			loop: true,
			autoplay: {
				delay: 5500,
				disableOnInteraction: false,
			},
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
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		height: 616px;
    width: 100%;
		
		@media (max-width: 764px) {
			height: 478px;
		}
	}

	.banner-link {
		display: block;
		height: 100%;
	}
</style>


