<template>
	<div class="component-filter">
		<swiper :options="swiperOption">
			<swiper-slide
			v-for="filter in filters" 
			:key="filter.id">
				<media-filter-product
					:border-right="filter.border"
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
		swiperOption: {
			slidesPerView: 4,
			slidesPerGroup: 1,
			breakpoints: {
				1200: {
					slidesPerView: 3,
				},
				950: {
					slidesPerView: 2,
				},
			},
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
	props: {
		filters: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="scss" scoped>
.component-filter-product {
	background-color: color(primary);
	display: grid;
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
	background: color(primary);
	display: flex;
	height: 67px;
	justify-content: center;
  width: 100% !important;
}
</style>

