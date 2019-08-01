<template>
	<div class="page-products">
		<products-section/>
	</div>
</template>
<script>
export default {
	name: 'page-products',
	components: {
		productsSection: () => import('@/components/products/products-section'),
	},
};
</script>
<style lang="scss" scoped>
	.page-products {
		background-color: white;
	}
</style>
