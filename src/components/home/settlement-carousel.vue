<template>
	<div class="settlement-carousel">
		<div>
			<title-section 
				title="Liquidación" 
				:color="colorDark"/>
		</div>
		<div class="slider-sttlement-carousel">
			<swiper :options="swiperOption">
        <swiper-slide>
					<div>
						<product-card 
							:base-color="colorBase" 
							class="product-card"
							small/>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div>
						<product-card 
							:base-color="colorBase" 
							class="product-card"
							small/>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div>
						<product-card 
							:base-color="colorBase" 
							class="product-card"
							small/>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div>
						<product-card 
							:base-color="colorBase" 
							class="product-card"
							small/>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div>
						<product-card 
							:base-color="colorBase" 
							class="product-card"
							small/>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div>
						<product-card 
							:base-color="colorBase" 
							class="product-card"
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

function data() {
	return {
		swiperOption: {
			slidesPerView: 3,
			spaceBetween: 30,
			slidesPerGroup: 3,
			allowTouchMove: false,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1161: {
					slidesPerView: 2,
					slidesPerGroup: 1,
					allowTouchMove: true,
					centeredSlides: true,
					grabCursor: true,
				},
			},
		},
	};
}
export default {
	name: 'settlement-carousel',
	data,
	components: {
		productCard,
		titleSection,
	},
	props: {
		colorBase: String,
		colorDark: String,
	},
};
</script>
<style lang="scss" scoped>
	.product-card {
		margin: auto !important;
	}

	.slider-sttlement-carousel {
		margin-top: 62px;
	}
</style>



