<template>
	<div class="component-filter">
		<swiper :options="swiperOption">
			<swiper-slide
			v-for="filter in filters" 
			:key="filter.id">
				<media-filter-product
				border-right="#ffffff"
				:image="filter.icon"
				:title="filter.title"
				:color="filter.color"
				></media-filter-product>
			</swiper-slide>
			<div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
		</swiper>
	</div>
</template>

<script>
const mediaFilterProduct = () => import('@/components/shared/products/media-filter-product');

function data() {
	return {
		filters: [
			{
				title: 'Novedades',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
			},
			{
				title: 'Populares',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
			},
			{
				title: 'Recomendados',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
			},
			{
				title: 'Ofertas',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
			},
			{
				title: 'Ofertas',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
			},
			{
				title: 'Ofertas',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
			},
		],
		swiperOption: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			loop: true,
			centeredSlides: true,
			// loopFillGroupWithBlank: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		},
	};
}

export default {
	data,
	name: 'component-filter-product',
	components: {
		mediaFilterProduct,
	},
};
</script>

<style lang="scss" scoped>
.component-filter-product {
	background-color: color(primary);
	display: grid;
	// grid-template-columns: auto auto auto auto;
	height: 67px;
	padding: 8px 130px;
	width: 100%;

	@media (max-width: 950px) {
		height: 102px;
		grid-template-columns: auto auto;
		padding: 8px 80px;
		width: 100%;
	}

	@media (max-width: 450px) {
		padding: 8px 15px;
	}
}

.component-filter {
	align-items: center;
	height: 67px;
	display: flex;
	justify-content: center;
	background: red;
  width: 100% !important;
}
</style>

