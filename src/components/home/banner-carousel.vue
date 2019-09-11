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
			<div class="searcher-wrapper">
				<Searcher class="searcher" />
			</div>
		</div>
		<company-data class="banner-data"/>
	</div>
</template>
<script>

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
		companyData: () => import('@/components/shared/company/container-company-data'),
		Searcher: () => import('@/components/home/searcher'),
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

	.container-banner-carousel {
		position: relative;
	}

	.searcher-wrapper {
		align-items: center;
		display: flex;
		height: 100%;
		justify-content: flex-start;
		padding-left: 60px;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 2;

		@media (max-width: 600px) {
			justify-content: center;
			padding-left: 0;
		}
	}

	.searcher {
		height: 414px;
		width: 353px;
	}
</style>


