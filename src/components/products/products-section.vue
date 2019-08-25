<template>
		<section class="product-section transition-product-section">
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

function created() {
	const filterParams = {
		filters: this.getFilters[0].id,
	};
	this.$store.dispatch('LOAD_PRODUCTS', { context: this, params: filterParams });
}

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
			'getFilters',
			'getProducts',
		]),
	},
	created,
	data,
};
</script>
<style lang="scss" scoped>
	.product-section {
		align-items: center;
		display: grid;
		flex-wrap: wrap;
		grid-template-columns: repeat(auto-fill, minmax(214px, 1fr));
		margin: 42px auto;
		max-width: 1070px;
	}
</style>
