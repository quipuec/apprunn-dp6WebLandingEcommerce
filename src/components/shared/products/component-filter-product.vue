<template>
	<div
		:class="[
			'component-filter',
			{ 'loading loading-filter': indeterminate },
		]"
		:style="`background:${indeterminate ? 'transparent' : globalColors.primary}`">
		<div
			v-if="!indeterminate"
			class="swiper-filter">
			<swiper :options="swiperOption">
			<swiper-slide
			v-for="filter in getFilters"
			:key="filter.id">
				<media-filter-product
					:border-right="filter.border"
					:filter="filter"
					@click="filterSelect"
				></media-filter-product>
			</swiper-slide>
			<div class="swiper-button-prev" slot="button-prev">
				<ArrowLeft
					color="white"
					class="arrow"
				/>
			</div>
      		<div class="swiper-button-next" slot="button-next">
				<ArrowRight
					:secondary-color="globalColors.primary"
					color="#FFF"
				  	class="arrow"
				/>
			</div>
		</swiper>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import mediaFilterProduct from '@/components/shared/products/media-filter-product';
import ArrowLeft from '@/components/svg/ArrowLeft';
import ArrowRight from '@/components/svg/ArrowRight';

function filterSelect(filter) {
	this.$emit('click-filter', filter);
}

function data() {
	return {
		swiperOption: {
			slidesPerView: 4,
			slidesPerGroup: 1,
			centerInsufficientSlides: true,
			breakpoints: {
				1250: {
					slidesPerView: 3,
				},
				950: {
					slidesPerView: 2,
				},
				450: {
					slidesPerView: 1,
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
		ArrowLeft,
		ArrowRight,
		mediaFilterProduct,
	},
	computed: {
		...mapGetters([
			'getFilters',
			'indeterminate',
		]),
	},
	methods: {
		filterSelect,
	},
};
</script>

<style lang="scss" scoped>
.component-filter {
	align-items: center;
	display: flex;
	height: 67px;
	justify-content: center;
  	width: 100% !important;
}

.swiper-filter {
	margin: auto;
	width: 85%;

	@media (max-width: 950px) {
		width: 90%;
	}
}

.loading-filter {
	filter: brightness(0.9);
}

.arrow {
	height: 100%;
	width: 100%;
}
</style>

