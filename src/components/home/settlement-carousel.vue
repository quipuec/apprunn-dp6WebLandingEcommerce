<template>
	<div class="settlement-carousel">
		<div>
			<title-section 
				title="Liquidación" 
				:color="globalColors.dark"/>
		</div>
		<div class="slider-sttlement-carousel">
			<swiper :options="swiperOption">
        <swiper-slide>
					<div>
						<product-card 
							:base-color="globalColors.primary" 
							class="product-card"
							:product="product" 
							small/>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div>
						<product-card 
							:base-color="globalColors.primary" 
							class="product-card"
							:product="product" 
							small/>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div>
						<product-card 
							:base-color="globalColors.primary" 
							class="product-card"
							:product="product" 
							small/>
					</div>
				</swiper-slide>
				<swiper-slide>
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
		product: {
			urlImage: 'https://japi-static.s3.amazonaws.com/taurus/Xiaomi-Redmi_Note-6_6.jpg',
			description: 'COMBO Xiaomi Redmi Note 6 Pro / 4GB 64GB Versión Global + Mica de vidrio templado 5D',
			warehouseProduct: {
				brand: {
					name: 'Xiomi',
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



