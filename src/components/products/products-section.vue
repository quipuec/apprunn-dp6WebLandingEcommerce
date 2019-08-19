<template>
		<section class="product-section">
			<product-card
				class="product-card"
				v-for="product in getProducts"
				:key="product.id"
				:product="product"
			/>
		</section>
</template>
<script>
import { mapGetters } from 'vuex';

function data() {
	return {
		page: 0,
		search: '',
	};
}

export default {
	name: 'page-products',
	components: {
		productCard: () => import('@/components/products/product-card'),
	},
	computed: {
		...mapGetters([
			'getProducts',
			'getProductsParams',
		]),
	},
	data,
};
</script>
<style lang="scss" scoped>
	.product-section {
		align-items: center;
		display: grid;
		flex-wrap: wrap;
		grid-template-columns: repeat(auto-fit, minmax(214px, 1fr));
		margin: 42px auto;
		max-width: 1070px;
	}
</style>
