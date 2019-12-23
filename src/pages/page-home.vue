<template>
	<layout-admin>
		<div class="loading-banner-container loading" v-if="getBannersHome.length === 0 || indeterminate"></div>
		<banner-carousel v-else :banners="getBannersHome"/>
		<div
			class="loading-categories-container"
			v-if="getCategories.length === 0 && indeterminate"
		>
			<div class="loading-categories loading"></div>
		</div>
		<categories-carousel
			v-else
 			:categories="getCategories"
			 :len="getCategoriesLength"
			:color-base="colorBase"/>
		<component-filter-product 
			@click-filter="filterSelect"
			v-if="filtersExist"
		>
		</component-filter-product>
		<div class="page-products">
			<products-section/>
		</div>
		<app-banner-top
			v-if="getPromotionalBanner"
			:data="getPromotionalBanner"
			:color="colorSecondary"
			big/>
	</layout-admin>
</template>

<script>
import { mapGetters } from 'vuex';

const appBannerTop = () => import('@/components/header/app-banner-top');
const bannerCarousel = () => import('@/components/home/banner-carousel');
const categoriesCarousel = () => import('@/components/home/categories-carousel');
const componentFilterProduct = () => import('@/components/shared/products/component-filter-product');
const productsSection = () => import('@/components/products/products-section');
const sectionSettlement = () => import('@/components/home/section-settlement');

function filterSelect(filter) {
	if (filter.link) {
		window.open(filter.link, '_blank');
	} else {
		const filters = this.getFilters.map((f) => {
			const newFilter = { ...f };
			newFilter.select = f.id === filter.id;
			return newFilter;
		});
		this.$store.dispatch('START_PAGINATION');
		this.$store.dispatch('UPDATE_PRODUCT_FILTER', filter.id);
		this.$store.dispatch('CLEAN_PRODUCTS_ARRAY');
		this.$store.dispatch('LOAD_PRODUCTS', { context: this });
		this.$store.dispatch('updateFilters', filters);
	}
}

function filtersExist() {
	return this.getFilters && this.getFilters.length;
}

function getCategoriesLength() {
	const len = this.getCategories.length;
	return len > 6 ? 6 : len;
}

function data() {
	return {
		filters: [],
		categories: [
			{
				id: 1,
				title: 'Resortes',
				webImage: '/static/img/category-springs-white.svg',
				urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/resorte2.png',
				hover: false,
				select: false,
			},
			{
				id: 2,
				title: 'Mayas',
				webImage: '/static/img/category-mesh-white.svg',
				urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/mayas.png',
				hover: false,
				select: false,
			},
			{
				id: 3,
				title: 'Cables',
				webImage: '/static/img/category-cables-white.svg',
				urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/cables.png',
				hover: false,
				select: false,
			},
			{
				id: 4,
				title: 'Resortes',
				webImage: '/static/img/category-springs-white.svg',
				urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/resorte2.png',
				hover: false,
				select: false,
			},
			{
				id: 5,
				title: 'Cables',
				webImage: '/static/img/category-cables-white.svg',
				urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/cables.png',
				hover: false,
				select: false,
			},
		],
		colorDark: process.env.COLOR_DARK,
		colorBase: process.env.COLOR_BASE,
		colorSecondary: process.env.COLOR_SECONDARY,
	};
}
export default {
	name: 'page-home',
	data,
	components: {
		appBannerTop,
		bannerCarousel,
		categoriesCarousel,
		componentFilterProduct,
		productsSection,
		sectionSettlement,
	},
	computed: {
		...mapGetters([
			'getBannersHome',
			'getPromotionalBanner',
			'getCategories',
			'getFilters',
			'indeterminate',
		]),
		filtersExist,
		getCategoriesLength,
	},
	methods: {
		filterSelect,
	},
};
</script>
<style lang="scss" scoped>
	.loading-categories-container {
		padding: 8rem 15%;
	}

	.loading-categories {
		height: 200px;
	}

	.loading-banner-container {
		height: 616px;
	}
</style>