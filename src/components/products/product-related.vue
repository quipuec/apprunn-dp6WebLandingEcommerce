<template>
	<div class="product-related">
		<title-section 
			title="Productos relacionados" 
			:color="globalColors.dark"/>
		<div class="container-slider-related">
			<swiper :options="getOptions">
				<swiper-slide 
					v-for="product in relateds" 
					:key="product.id">
					<div>
						<product-card 
							:base-color="globalColors.primary" 
							class="product-card"
							:product="product"
							small/>
					</div>
				</swiper-slide>
				<div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
			</swiper>
		</div>
	</div>
</template>
<script>
const productCard = () => import('@/components/products/product-card');
const titleSection = () => import('@/components/home/title-section');


function getOptions() {
	if (this.relateds.length >= 5) {
		return this.swiperOption;
	}

	if (this.relateds.length >= 4) {
		return this.swiperOptionOne;
	}
	return this.swiperOptionTwo;
}

function data() {
	return {
		swiperOption: {
			slidesPerView: 5,
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				975: {
					slidesPerView: 4,
					slidesPerGroup: 1,
					allowTouchMove: true,
					spaceBetween: 10,
				},
				652: {
					slidesPerView: 3,
				},
				466: {
					slidesPerView: 2,
					centeredSlides: true,
					grabCursor: true,
				},
			},
		},
		swiperOptionOne: {
			slidesPerView: 4,
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				975: {
					slidesPerView: 3,
					slidesPerGroup: 1,
					allowTouchMove: true,
					spaceBetween: 10,
				},
				652: {
					slidesPerView: 2,
					centeredSlides: true,
					grabCursor: true,
				},
			},
		},
		swiperOptionTwo: {
			slidesPerView: 3,
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				975: {
					slidesPerView: 3,
					slidesPerGroup: 1,
					allowTouchMove: true,
					spaceBetween: 10,
				},
			},
		},
	};
}
export default {
	name: 'product-related',
	components: {
		titleSection,
		productCard,
	},
	computed: {
		getOptions,
	},
	data,
	props: {
		relateds: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
<style lang="scss" scoped>
	.product-card {
		margin: auto !important;
	}

	.product-related {
		background: color(background);
		padding: 20px 3% 56px;
	}

	.container-slider-related {
		margin-top: 22px;
	}
</style>


