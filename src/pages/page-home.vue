<template>
	<layout-admin>
		<banner-carousel :banners="banners"/>
		<categories-carousel
 			:categories="getCategories"
			:color-base="colorBase"/>
		<component-filter-product 
			@click-filter="filterSelect"
		>
		</component-filter-product>
		<div class="page-products">
			<products-section/>
		</div>
		<section-settlement/>
		<app-banner-top 
			:data="bannerTop"
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

function created() {
	this.loadData();
}


async function loadData() {
	try {
		const { data: response } = await this.$httpProductsPublic.get('banners-public');
		this.banners = response;
	} catch (error) {
		this.showGenericError();
	}
}

function filterSelect(filter) {
	if (filter.link) {
		window.open(filter.link, '_blank');
	} else {
		const filters = this.getFilters.map((f) => {
			const newFilter = { ...f };
			newFilter.select = f.id === filter.id;
			return newFilter;
		});
		const params = { filters: filter.id };
		this.$store.dispatch('LOAD_PRODUCTS', { context: this, params });
		this.$store.dispatch('updateFilters', filters);
	}
}

function data() {
	return {
		filters: [],
		banners: [],
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
		bannerTop: {
			urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/big.png',
			image: 'descuento',
		},
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
			'getCategories',
			'getFilters',
		]),
	},
	created,
	methods: {
		loadData,
		filterSelect,
	},
};
</script>