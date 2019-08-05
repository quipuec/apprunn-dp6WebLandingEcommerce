<template>
	<layout-admin>
		<banner-carousel :banners="banners"/>
		<div class="page-products">
			<products-section/>
		</div>
	</layout-admin>
</template>

<script>

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
	};
}
export default {
	name: 'page-home',
	data,
	components: {
		bannerCarousel: () => import('@/components/home/banner-carousel'),
		productsSection: () => import('@/components/products/products-section'),
	},
};
</script>
