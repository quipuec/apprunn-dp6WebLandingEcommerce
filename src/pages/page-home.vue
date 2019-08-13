<template>
	<layout-admin>
		<!-- <router-view></router-view> -->
		<banner-carousel :banners="banners"/>
		<categories-carousel 
			:categories="getCategories"
			:color-base="colorBase"/>
		<component-filter-product 
		:filters="filters"></component-filter-product>
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
	this.loadFilters();
}

async function loadFilters() {
	try {
		const { data: response } = await this.$httpProductsPublic.get('filters-public');
		this.filters = response.data;
	} catch (error) {
		this.showGenericError();
	}
}

async function loadData() {
	try {
		const { data: response } = await this.$httpProductsPublic.get('banners-public');
		this.banners = response;
	} catch (error) {
		this.showGenericError();
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
		]),
	},
	created,
	methods: {
		loadFilters,
		loadData,
	},
};
</script>