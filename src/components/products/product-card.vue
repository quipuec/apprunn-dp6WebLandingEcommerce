<template>
	<div class="product-container" @click="buyProduct">
		<section class="product-header">
			<div :style="`background-color: ${baseColor}`" class="product-discount">-20%</div>
			<div class="product-favorite">
				<heart-component @click="productFavo" :value="product.flagFavorite"/>
			</div>
		</section>
		<section class="product-content">
			<div>
				<img class="product-img" :src="product.urlImage" alt="imagen del product">
			</div>
			<div class="product-description-wrapper">
				<p class="product-description">{{product.description}}</p>
				<small class="product-brand">{{product.warehouseProduct.brand.name}}</small>
				<h3 class="product-price-discount">{{product.priceDiscount || 0}}</h3>
				<small class="product-price">{{product.price || 0}}</small>
				<small class="other-buy">+ 1000 compraron esto</small>
				<v-rating
					small
					class="product-rating"
					v-model="product.rating"></v-rating>
			</div>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

function productFavo() {
	if (this.token) {
		this.$store.dispatch('SET_FAVORITE_FLAG', { context: this, product: this.product });
		this.$store.dispatch('LOAD_PRODUCTS', { context: this, params: this.getProductsParams });
	} else {
		const text = 'Debe iniciar sesión para seleccionar producto como favorito';
		this.$store.dispatch('showSnackBar', { text, color: 'error' });
	}
}

function buyProduct() {
	this.$store.commit('SET_PRODUCT_TO_BUY', this.product);
}

export default {
	name: 'product-card',
	components: {
		heartComponent: () => import('@/components/shared/icons/heart-component'),
	},
	computed: {
		...mapGetters([
			'getProductsParams',
		]),
	},
	methods: {
		buyProduct,
		productFavo,
	},
	props: {
		baseColor: String,
		product: {
			default: () => {},
			type: Object,
		},
	},
};
</script>
<style lang="scss" scoped>
	.product-container {
		background-color: color(white);
		border: 3px solid color(border);
		font-family: font(medium);
		height: auto;
		padding: 10px;

		@media (min-width: 500px) {
			height: 330px;
			margin: 3px;
		}
	}

	.product-header {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}

	.product-discount {
		border-radius: 5px;
		color: color(white);
		font-family: font(medium);
		font-size: size(large);
		padding: 8px 15px;
	}

	.product-content {
		align-items: center;
		display: flex;
		justify-content: center;
		margin: 0 5px;
		padding: 0 15px;
		text-align: center;

		div {
			margin: 0 15px;
		}

		@media (min-width: 500px) {
			flex-direction: column;
		}
	}

	.product-description-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.product-img {
		height: 130px;
		object-fit: contain;
		width: 125px;
	}

	.product-description {
		color: color(dark);
		font-size: size(small);
		height: 35px;
		margin: 0;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		text-transform: capitalize;
	}

	.product-brand {
		color: color(base);
		font-size: size(xsmall);
	}

	.product-price-discount {
		color: color(secondary);
		font-family: font(bold);
		font-size: size(xlarge);
	}

	.product-price,
	.other-buy {
		color: color(base);
		font-size: size(xsmall);
	}

	.other-buy {
		font-family: font(regular);
		display: none;

		@media (min-width: 500px) {
			display: block;
			flex-direction: column;
		}
	}

	.product-price {
		text-decoration: line-through;
	}

	.product-rating {
		margin: 0 !important;

		.v-icon {
			padding: 0.3rem !important;
		}
	}
</style>

