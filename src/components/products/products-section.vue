<template>
	<div>
		<section class="product-section transition-product-section">
			<product-card
				class="product-card"
				v-for="product in products"
				:key="product.id"
				:product="product"
			/>
		</section>
		<div class="see-more-btn">
			<button
				v-if="getLastPage !== currentPage"
				type="button"
				:style="`border:1px solid ${globalColors.primary};color:${globalColors.primary};`"
				@click="addMoreProduct"
			>Seguir Viendo</button>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

function addMoreProduct() {
	this.$store.dispatch('MORE_PRODUCTS');
	this.$store.dispatch('LOAD_PRODUCTS', { context: this });
}

function products() {
	return this.indeterminate ? this.defaultProducts : this.getProducts;
}

function handlerFilters() {
	this.$store.dispatch('UPDATE_PRODUCT_FILTER', this.getFilters[0].id);
	this.$store.dispatch('LOAD_PRODUCTS', { context: this });
}

function data() {
	return {
		defaultProducts: [
			{}, {}, {}, {}, {},
			{}, {}, {}, {}, {},
		],
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
			'currentPage',
			'getFilters',
			'getLastPage',
			'getProducts',
			'indeterminate',
		]),
		products,
	},
	data,
	methods: {
		addMoreProduct,
		handlerFilters,
	},
	watch: {
		getFilters: handlerFilters,
	},
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

	.see-more-btn {
		align-items: center;
		display: flex;
		justify-content: center;
		margin: 0 30px;

		button {
			background-color: white;
			border-radius: 3px;
			flex: 1 1 auto;
			font-family: font(heavy);
			font-size: size(large);
			padding: 7px 30px;
			max-width: 630px;
			min-width: 255px;
		}
	}
</style>
