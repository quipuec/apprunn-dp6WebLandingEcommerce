<template>
	<layout-admin>
		<router-view></router-view>
		<banner-carousel :banners="banners"/>
		<component-filter-product :filters="filters" ></component-filter-product>
	</layout-admin>
</template>

<script>
const componentFilterProduct = () => import('@/components/shared/products/component-filter-product');
const bannerCarousel = () => import('@/components/home/banner-carousel');

function data() {
	return {
		banners: [
			{
				id: 1,
				webImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/banner-2.png',
			},
			{
				id: 2,
				webImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/banner-2.png',
			},
			{
				id: 3,
				webImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/banner-2.png',
			},
		],
		filters: [
			{
				id: 1,
				title: 'Novedades',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
				border: '#ffffff',
			},
			{
				id: 2,
				title: 'Populares',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
				border: '#ffffff',
			},
			{
				id: 3,
				title: 'Recomendados',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
				border: '#ffffff',
			},
			{
				id: 4,
				title: 'Ofertas',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
				border: '#ffffff',
			},
			{
				id: 5,
				title: 'Ofertas',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
				border: '#ffffff',
			},
			{
				id: 6,
				title: 'Ofertas',
				color: '#ffffff',
				icon: '/static/img/icons/icon-filter-product.svg',
			},
		],
	};
}
export default {
	name: 'page-home',
	data,
	components: {
		componentFilterProduct,
		bannerCarousel,
	},
};
</script>
