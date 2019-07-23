<template>
	<layout-admin>
		<section class="product-section">
			<product-card class="product-card"/>		
			<product-card class="product-card"/>		
			<product-card class="product-card"/>		
			<product-card class="product-card"/>		
			<product-card class="product-card"/>		
		</section>
	</layout-admin>
</template>
<script>
export default {
	name: 'components',
	components: {
		productCard: () => import('@/components/products/product-card'),
	},
};
</script>
<style lang="scss" scoped>
	.product-section {
		align-items: center;
		display: grid;
		flex-wrap: wrap;
		grid-template-columns: repeat(auto-fit, minmax(256px, 1fr));
		margin: auto;
		max-width: 1280px;
	}
</style>

