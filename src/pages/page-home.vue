<template>
	<layout-admin>
		<router-view></router-view>
		<banner-carousel :banners="banners"/>
		<categories-carousel 
			:categories="getCategories"
			:color-base="colorBase"/>
		<component-filter-product></component-filter-product>
		<products-section/>
	</layout-admin>
</template>

<script>
import { mapGetters } from 'vuex';

const bannerCarousel = () => import('@/components/home/banner-carousel');
const categoriesCarousel = () => import('@/components/home/categories-carousel');
const componentFilterProduct = () => import('@/components/shared/products/component-filter-product');
const productsSection = () => import('@/components/products/products-section');

function created() {
	this.loadData();
}

async function loadData() {
	try {
		const { data: response } = await this.$httpProducts.get('banners-public');
		this.banners = response;
	} catch (error) {
		this.showGenericError();
	}
}
function data() {
	return {
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
		colorBase: process.env.COLOR_BASE,
	};
}
export default {
	name: 'page-home',
	data,
	components: {
		bannerCarousel,
		categoriesCarousel,
		componentFilterProduct,
		productsSection,
	},
	computed: {
		...mapGetters([
			'getCategories',
		]),
	},
	created,
	methods: {
		loadData,
	},
};
</script>