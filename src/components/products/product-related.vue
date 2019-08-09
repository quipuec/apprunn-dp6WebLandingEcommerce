<template>
	<div class="product-related">
		<title-section 
			title="Productos relacionados" 
			:color="globalColors.dark"/>
		<div class="container-slider-related">
			<swiper :options="swiperOption">
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

function created() {
	const numberSlider = this.relateds.length < 5 ? this.relateds.length : 5;
	this.swiperOption.slidesPerView = numberSlider;
	this.swiperOption.slidesPerGroup = numberSlider;
}

function data() {
	return {
		swiperOption: {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 10,
			slidesPerGroup: 1,
			allowTouchMove: false,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				975: {
					slidesPerView: 2,
					slidesPerGroup: 1,
					allowTouchMove: true,
					centeredSlides: true,
					grabCursor: true,
					spaceBetween: 30,
				},
			},
		},
	};
}
export default {
	name: 'product-related',
	created,
	components: {
		titleSection,
		productCard,
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


