<template>
	<div class="banner-carousel">
		<div class="container-banner-carousel">
			<swiper :options="swiperOption">
				<swiper-slide 
					v-for="banner in banners" 
					:key="banner.id">
					<div 
						:style="getBackground(banner)"
						class="img-carousel">
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
		<company-data class="banner-data"/>
	</div>
</template>
<script>
const companyData = () => import('@/components/shared/company/container-company-data');

function getBackground(value) {
	return `background-image: url(${value.webImage})`;
}

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
	components: {
		companyData,
	},
	methods: {
		getBackground,
	},
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

	.banner-carousel {
		position: relative;
	}

	.banner-data {
		bottom: -43px;
		left: 50%;
		position: absolute;
		transform: translateX(-50%);
		z-index: 1;

		@media (max-width: 860px) {
			bottom: -26px;
		}
	}
	
	.banner-link {
		display: block;
		height: 100%;
	}
</style>


