<template>
	<layout-admin>
		<banner-carousel :banners="banners"/>
	</layout-admin>
</template>

<script>
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
	};
}
export default {
	name: 'page-home',
	data,
	components: {
		bannerCarousel,
	},
};
</script>
